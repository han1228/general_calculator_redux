import define from "../define";

let calcModule = (function () {
	let calcStorage = {
		"curNumber" : [],
		"curFormula" : [],
		"lastOperation" : [],
		"lastResult" : 0,
		"history" : new Map()
	},
	humanKeyMap = {};

	function _getCurrentNumber () {
		return Number(calcStorage.curNumber.join("") || 0);
	}

	function _getCurFormula () {
		return calcStorage.curFormula.join(" ");
	}

	function _getLastOperation () {
		return calcStorage.lastOperation.join(" ");
	}

	function _setNumberClear () {
		calcStorage.curNumber = [];
	}

	function _setFormulaClear () {
		calcStorage.curFormula = [];
	}

	function _setLastHistoryClear () {
		calcStorage.lastOperation = [];
		calcStorage.lastResult = 0;
	}

	function _addNumber (val, isClear = false) {
		if (isClear) {
			_setNumberClear();
		}

		calcStorage.curNumber.push(val);
	}

	function _addFormula (val, isClear = false) {
		if (isClear) {
			_setFormulaClear();
		}
		
		calcStorage.curFormula.push(val);
	}
	function _addLastResult (val) {
		calcStorage.lastResult = val;
	}
	
	function _deleteNumber () {
		calcStorage.curNumber.pop();
	}
	
	function _deleteFormula () {
		calcStorage.curFormula.pop();
	}

	function _replaceNumber (arrVal) {
		calcStorage.curNumber = arrVal;
	}

	function _replaceLastOperation (arrVal) {
		calcStorage.lastOperation = arrVal;
	}
	
	function _setHistory (strFormula, resultVal) {
		let {history} = calcStorage,
			historyKey = history.size + 1,
			historyVal = `${strFormula} ${humanKeyMap.Equal} ${resultVal}`;

		history.set(historyKey, historyVal);
	}

	return {
		/**
		 * 모듈 초기화
		 */
		initialize () {
			this.setReverseKeyMap();
			console.log("===== calcModule initialize =====");
		},

		/** ==================== Route Binding Function Start ==================== */

		/**
		 * 계산기 Number 추가 함수
		 * @param {Number} val    		- Number
		 * @return {Object}
		 */
		addNum (val) {
			let {curNumber, lastResult} = calcStorage,
				len = curNumber.length,
				resultVal = null;

			if (len === 0 && val === 0 && lastResult === 0) {
				return;
			}

			if (!isNaN(val) && len < define.DEFINEOPTION.numLimit) {
				// 현재 Number 가 0 인데 다른 값이 들어오면 기존값인 0 은 제거한다.
				if (len === 1 && this.getArrayLastItem(curNumber) === 0) {
					_deleteNumber();
				}

				_addNumber(Number(val));
				
				if (lastResult !== 0) {
					_addLastResult(0);
				}

				resultVal = this.getCurNumber(true);
			}

			return this.makeResultObj(resultVal);
		},
		/**
		 * 계산기 Number 삭제 함수
		 * @param  {String=} val    		- 삭제 Command (Backspace)
		 * @return {Object}
		 */
		delNum (val) {
			let {curNumber} = calcStorage,
				resultVal = null;

			if (curNumber.length > 0) {
				_deleteNumber();
				resultVal = this.getCurNumber(true);
			}

			return this.makeResultObj(resultVal);
		},
		/**
		 * 계산기 연산 함수
		 * @param  {String} val    		- operator Command
		 * @return {Object}
		 */
		operator (val) {
			let {curNumber, curFormula, lastOperation, lastResult} = calcStorage,
				len = curNumber.length,
				numberVal, formulaVal;

			// operator 종류에 따른 연산을 수행한다.
			switch (val) {
				case "Equal" :
					if (this.isOperator(this.getArrayLastItem(curFormula)) || lastOperation.length) {
						numberVal = this.convertLocaleStringNumber(this.setEqual());
						formulaVal = _getCurFormula();
					}
					break;
				case "Minus" :
				case "Plus" :
				case "Division" :
				case "Multiply" :
					numberVal = this.convertLocaleStringNumber(this.setArithmeticOperation(val));
					formulaVal = _getCurFormula();
					console.log("operator", val, numberVal, formulaVal);
					break;
				case "Percentage" :
				case "PlusMinus" :
					if (len || lastResult) {
						numberVal = this.convertLocaleStringNumber(this.setAutoOperation(val));
					}
					break;
				case "Dot" :
					if (!len || !this.isDot(this.getArrayLastItem(curNumber))) {
						this.setDot();
						numberVal = this.getCurNumber(true);
					}
					break;
				default :
			}
			
			// 연산된 결과를 반환한다.
			return this.makeResultObj(numberVal, formulaVal);
		},
		/**
		 * 계산기 종료 (Clear) 함수
		 * @param  {String=} val    		- Clear Command (Escape)
		 * @return {Object}
		 */
		clear (val) {
			this.setAllClear(true);

			return this.makeResultObj(this.getCurNumber(true), _getCurFormula());
		},

		/** ==================== Route Binding Function End ==================== */

		/** ==================== Operation Excute Function Start ==================== */

		/**
		 * 최종 연산 처리 함수
		 * @return {Number} 		- 연산 결과 반환
		 */
		setEqual () {
			let {curNumber, curFormula, lastOperation, lastResult} = calcStorage,
				addFormula = "",
				isChangeOperation = false,
				strFormula, equalVal, numberVal;

			// 현재 연산 상태에 따라 연산 대상 값을 추출한다.
			if (curNumber.length) {
				// 숫자가 등록된 상태
				numberVal = this.getCurNumber();

				if (!curFormula.length && lastOperation.length) {
					addFormula = _getLastOperation();
				} else {
					isChangeOperation = true;
				}
			} else if (curFormula.length) {
				// 숫자는 등록되지 않았지만 기존 연산 정보 (curFormula) 가 있는 상태
				numberVal = lastResult || 0;
				isChangeOperation = true;
			} else {
				// 숫자 등록, 연산 정보가 없는 상태
				numberVal = lastResult || 0;
				addFormula = _getLastOperation();
			}

			// 변경된 Number 에 의해서 연산이 되는경우 마지막 연산 정보를 변경해 준다.
			if (isChangeOperation) {
				_replaceLastOperation([this.getArrayLastItem(curFormula), numberVal]);
			}

			// 최종 연산 값을 Formula 에 등록하고, 연산 수행 후 저장한다.
			_addFormula(numberVal);
			strFormula = _getCurFormula() + (addFormula ? " " + addFormula : "");
			equalVal = this.getStrOperationResult(strFormula);

			if (equalVal !== define.VALERROR) {
				_addLastResult(equalVal);
			}
			
			// history 에 등록하고 연산 Model (curNumber, curFormula) 은 초기화 한다.
			_setHistory(strFormula, equalVal);
			this.setAllClear();
			
			return equalVal;
		},
		/**
		 * 연산자 등록 (중간 연산) 처리 함수
		 * @param {Number} optVal 		- 중간 연산 결과 반환
		 */
		setArithmeticOperation (optVal) {
			let {curNumber, curFormula, lastResult} = calcStorage,
				numberLen = curNumber.length,
				formulaLen = curFormula.length,
				newLastOperation = [],
				resultVal = null,
				numberVal;

			if (!numberLen && formulaLen) {
				// 연산자가 선택된 상태에서 다시 연산자 입력이면, 연산자를 교체하기 위해 기존 연산자를 삭제한다.
				if (this.isOperator(this.getArrayLastItem(curFormula))) {
					_deleteFormula();
					newLastOperation.push(this.getArrayLastItem(calcStorage.curFormula));
				}
			} else {
				// 일반적인 경우엔 등록된 숫자와 연산자를 Formula 에 등록한다.
				numberVal = numberLen ? this.getCurNumber() : lastResult;
				_addFormula(numberVal);
				newLastOperation.push(numberVal);
				console.log(`setArithmeticOperation : ${numberVal}`);

				// 신규 등록하는 연산자를 제외한 연산 결과를 구하고, lastResult 에 저장한다.
				resultVal = this.getStrOperationResult(_getCurFormula());
				if (resultVal !== define.VALERROR) {
					_addLastResult(resultVal);
				}

				// 등록된 숫자가 있으면 초기화 한다.
				if (numberLen) {
					_setNumberClear();
				}
			}

			_addFormula(humanKeyMap[optVal]);
			console.log(`setArithmeticOperation2 : ${humanKeyMap[optVal]}, ${_getCurFormula()}`);

			// 정상적인 사칙연산 등록이라면, 마지막 연산정보로 등록한다.
			if (newLastOperation.length) {
				newLastOperation.unshift(humanKeyMap[optVal]);
				_replaceLastOperation(newLastOperation);
			}

			return resultVal;
		},
		/**
		 * 자동 연산자 처리 함수
		 * @param {String} optVal 		- operator Command
		 */
		setAutoOperation (optVal) {
			let {curNumber, lastResult} = calcStorage,
				optNum = (optVal === "Percentage") ? 0.01 : -1,
				numberVal;

			if (curNumber.length) {
				// 등록된 숫자가 있으면 자동 연산을 수행하고, Model 정보도 갱신한다.
				numberVal = String(this.getCurNumber() * optNum);
				_replaceNumber([...numberVal]);
				numberVal = this.getCurNumber();
			} else {
				// 등록된 숫자가 없으면 최종 연산값으로 자동 연산을 수행하고 최종 연산값을 갱신한다.
				numberVal = lastResult * optNum;
				_addLastResult(numberVal);
			}

			return numberVal;
		},
		/**
		 * 소수점 처리 함수
		 */
		setDot () {
			let {curNumber} = calcStorage;

			// 등록된 숫자가 없으면 기본값인 0을 자동 등록하고 소수점 처리를 진행한다.
			if (!curNumber.length) {
				_addNumber(0);
			}

			_addNumber(humanKeyMap.Dot);
		},
		/**
		 * Model 정보 초기화 함수
		 * @param {Boolean} isWithLastHistory 		- 마지막 연산 정보 초기화 여부
		 */
		setAllClear (isWithLastHistory = false) {
			_setNumberClear();
			_setFormulaClear();

			if (isWithLastHistory) {
				_setLastHistoryClear();
			}
		},
		/**
		 * 등록된 연산 정보의 연산 결과 반환 함수
		 * @param  {String} strFormula 		- 연산 정보
		 * @return {Number}       			- 연산 결과 값
		 */
		getStrOperationResult (strFormula) {
			let operator = "",
				arrFormula = strFormula.split(" "),
				resultVal, strVal;

			const __handleCalculate = {
				"*" : (operand1, operand2) => operand1 * operand2,
				"/" : (operand1, operand2) => operand1 / operand2,
				"+" : (operand1, operand2) => operand1 + operand2,
				"-" : (operand1, operand2) => operand1 - operand2
			};

			// 등록된 순서대로 연산하기 위해서 공백을 기준으로 하나씩 연산을 수행한다.
			if (arrFormula.length > 1) {
				for (strVal of arrFormula) {
					if (isNaN(strVal) && this.isOperator(strVal)) {
						operator = strVal;
					} else {
						try {
							resultVal = operator 
										? __handleCalculate[operator](resultVal, Number(strVal))
										: Number(strVal);
						} catch (excep) {
							resultVal = this.define.VALERROR;
							break;
						}
					}
				}
			} else {
				resultVal = Number(strFormula);
			}

			return resultVal;
		},

		/** ==================== Operation Excute Function End ==================== */

		/**
		 * 현재 등록된 Number 반환 함수
		 * @param  {Boolean} isRender 		- Rendering 용 Number 반환 여부
		 * @return {(Number|String)}    	- Number Value
		 */
		getCurNumber (isRender = false) {
			let curNum = _getCurrentNumber(),
				lastNum;

			if (isRender) {
				lastNum = this.getArrayLastItem(calcStorage.curNumber);
				curNum = this.convertLocaleStringNumber(curNum);
				curNum += (lastNum === humanKeyMap.Dot) ? lastNum : "";
			}

			return curNum;
		},
		/**
		 * 숫자를 Locale String (with comma) 으로 변환하여 반환 함수
		 * @param  {Number} num 		- Number
		 * @return {String}     		- Locale String Number
		 */
		convertLocaleStringNumber (num) {
			let convertNum = num,
				arrNum, strIntNum, strDecimalNum;

			if (!isNaN(convertNum) && convertNum !== null) {
				arrNum = String(convertNum).split(".");
				strIntNum = Number(arrNum[0]).toLocaleString(define.DEFINEOPTION.locale);
				strDecimalNum = arrNum[1] ? `.${arrNum[1]}` : "";
				convertNum = strIntNum + strDecimalNum;
			}

			return convertNum;
		},
		/**
		 * 배열의 마지막 Item 을 반환하는 함수
		 * @param  {Array} arr 		- Array
		 * @return {*}     			- Last Item Value 
		 */
		getArrayLastItem (arr) {
			let lastItem = null;

			if (Array.isArray(arr)) {
				lastItem = arr[arr.length - 1];

				if (lastItem === undefined) {
					lastItem = null;
				}
			}

			return lastItem;
		},
		/**
		 * 전달 값이 Dot 인지 여부 반환 함수
		 * @param  {String}  val 		- Value
		 * @return {Boolean}     		- Dot 여부
		 */
		isDot (val) {
			return val === humanKeyMap.Dot;
		},
		/**
		 * 전달 값이 연산자 (+,-,*,/) 인지 여부 반환 함수
		 * @param  {String}  val 		- Value
		 * @return {Boolean}     		- 연산자 여부
		 */
		isOperator (val) {
			return !!(typeof val === "string" && !this.isDot(val));
		},
		/**
		 * Define KEYMAP 정보의 key/value 값을 뒤집어서 저장하는 함수
		 */
		setReverseKeyMap () {
			let keymap = define.KEYMAP;

			for (let key in keymap) {
				if (typeof keymap[key] === "string") {
					humanKeyMap[keymap[key]] = key;
				}
			}
		},
		/**
		 * 연산 출력 결과를 Object 형식으로 만들어 반환하는 함수
		 * @param  {String=} num     		- 계산기 Number 연산 출력 결과
		 * @param  {String=} formula 		- 계산기 Formula 연산 출력 결과
		 * @return {Object}         		- 결과 Object
		 */
		makeResultObj (num, formula) {
			let resultVal = {};

			if (num != null) {
				resultVal.curNumber = num;
			}

			if (formula != null) {
				resultVal.curFormula = formula;
			}

			return resultVal;
		}
	};
})();

export default calcModule;