import React, {Component, Fragment} from "react";
import define from "../store/define";
import util from "../store/util";

class CalcBtnPanel extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		if (this.isMountRender && this.state.onElements === nextState.onElements) {
			return false;
		}

		return true;
	}

	componentDidMount () {
		this.isMountRender = true;
		this.registerElements();

		document.addEventListener("keydown", (e) => this.doKeyDown(e), false);
		document.addEventListener("keyup", (e) => this.doKeyUp(e), false);
		document.addEventListener(util.isMobile() ? "touchend" : "click", (e) => this.doMouseClick(e), false);
	}

	elements = {}
	isMountRender = false

	state = {
		onElements : []
	}

	registerElements = () => {
		let arrBtns = [],
			btnCmds = document.getElementsByClassName(define.CLSCMD),
			btnOperrators = document.getElementsByClassName(define.CLSOPERATOR),
			btnNums = document.getElementsByClassName(define.CLSNUM),
			ele, btn, keyVal;

		arrBtns = arrBtns.concat(...btnCmds, ...btnOperrators, ...btnNums);

		for (ele of arrBtns) {
			btn = ele.firstElementChild;
			keyVal = define.KEYMAP[btn.getAttribute("name")];

			if (keyVal !== undefined) {
				this.elements[keyVal] = btn;
			}
		}
	}

	/**
	 * Click (touchend) 이벤트 콜백 함수.
	 * @param  {Object} e 		- 이벤트 정보
	 */
	doMouseClick = (e) => {
		const target = e.target,
			key = target ? target.getAttribute("name") : "",
			keyVal = define.KEYMAP[key];

		if (keyVal !== undefined) {
			console.log(`doMouseClick : ${keyVal}`);
			this.execCalc(keyVal);
			e.preventDefault();
		}
	}
	/**
	 * keydown 이벤트 콜백 함수.
	 * @param  {Object} e 		- 이벤트 정보
	 */
	doKeyDown = (e) => {
		let key = e.key,
			keyVal = define.KEYMAP[key];

		if (keyVal === undefined) {
			keyVal = define.KEYMAP[e.char];
		}

		if (keyVal !== undefined) {
			console.log(`doKeyDown - command : ${keyVal}`);
			const {onElements} = this.state,
				ele = this.getElements(String(keyVal)),
				cmd = ele.getAttribute("name");

			if (!onElements.includes(cmd)) {
				this.setState({
					onElements : onElements.concat(cmd)
				});
			}

			this.execCalc(keyVal);
			e.preventDefault();
		}
	}
	/**
	 * keyup 이벤트 콜백 함수.
	 * @param  {Object} e 		- 이벤트 정보
	 */
	doKeyUp = (e) => {
		const {onElements} = this.state;
		if (onElements.length) {
			console.log(`doKeyUp - on length : ${onElements.length}`);

			this.setState({
				onElements : []
			});
			
			e.preventDefault();
		}
	}

	/**
	 * 버튼에 해당하는 기능 실행을 지시하는 (Event Action) 함수.
	 * @param  {(Number|String)} keyVal 		- Event Action Command Name
	 */
	execCalc = (keyVal) => {
		const {handleCalcEvent} = this.props;
		handleCalcEvent(keyVal);
	}

	/**
	 * 전달된 element name 에 해당하는 DOM Element (버튼) 을 반환하는 함수.
	 * @param  {String}  name    			- Element name
	 * @return {(Element|NULL)}          	- 지정된 Element
	 */
	getElements = (name) => {
		return this.elements[name] || null;
	}

	render () {
		console.log(`============== CalcBtnPanel Render`);
		const {onElements} = this.state;
		let btnRows = [],
			i = 0;

		for (let itemGroup of define.BTNMAP) {
			let btnCells = [],
				rowKey = `row-${i++}`,
				j = 0;

			for (let item in itemGroup) {
				btnCells.push(
					<td key={`${rowKey}-cell${j}`} className={itemGroup[item][1]}>
						<span 
							key={`${rowKey}-span${j}`} 
							name={item} 
							className={onElements.includes(item) ? define.CLSON : ""}
						>{itemGroup[item][0]}</span>
					</td>
				);

				j++;
			}

			btnRows.push(<tr key={rowKey}>{btnCells}</tr>);
		}

		return (
			<Fragment>
				{btnRows}
			</Fragment>
		);
	}
}

export default CalcBtnPanel;