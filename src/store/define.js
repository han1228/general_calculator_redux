const CalcDefine = () => {
	const TYPEVIEW = "view",
	TYPEMODULE = "module",
	KINDCALC = "calc",
	CMDADDNUM = "addNum",
	CMDDELNUM = "delNum",
	CMDOPERATOR = "operator",
	CMDCLEAR = "clear",
	VALERROR = "Error",
	CLSCALCWRAP = "calc_wrap",
	CLSPANELMSG = "panel_msg",
	CLSPANELINPUT = "panel_input",
	CLSCMD = "calc_cmd",
	CLSOPERATOR = "calc_operator",
	CLSNUM = "calc_num",
	CLSON = "on",
	CLSPANELOVERSIZE = "over_size",
	CLSPANELMAXSIZE = "max_size",
	// 액션 정보 정의
	DEFINEMODULE = {
		calc : {
			cmd : [CMDADDNUM, CMDDELNUM, CMDOPERATOR, CMDCLEAR],
			view : "calcView",
			module : "calcModule"
		}
	},
	// 키 맵 정의
	KEYMAP = {
		"0" : 0,
		"1" : 1,
		"2" : 2,
		"3" : 3,
		"4" : 4,
		"5" : 5,
		"6" : 6,
		"7" : 7,
		"8" : 8,
		"9" : 9,
		"Esc" : "Escape",
		"Escape" : "Escape",
		"Backspace" : "Backspace",
		"PlusMinus" : "PlusMinus",
		"Enter" : "Equal",
		"=" : "Equal",
		"-" : "Minus",
		"+" : "Plus",
		"/" : "Division",
		"*" : "Multiply",
		"%" : "Percentage",
		"." : "Dot"
	},
	// 버튼 UI 액션 맵 정의
	BTNMAP = [
		{
			"Escape" : ["AC" , "calc_cmd"],
			"Backspace" : ["←" , "calc_cmd"],
			"%" : ["%" , "calc_cmd"],
			"/" : ["÷" , "calc_operator"]
		},
		{
			"7" : ["7" , "calc_cmd"],
			"8" : ["8" , "calc_cmd"],
			"9" : ["9" , "calc_cmd"],
			"*" : ["×" , "calc_operator"]
		},
		{
			"4" : ["4" , "calc_cmd"],
			"5" : ["5" , "calc_cmd"],
			"6" : ["6" , "calc_cmd"],
			"-" : ["─" , "calc_operator"]
		},
		{
			"1" : ["1" , "calc_cmd"],
			"2" : ["2" , "calc_cmd"],
			"3" : ["3" , "calc_cmd"],
			"+" : ["+" , "calc_operator"]
		},
		{
			"PlusMinus" : ["±" , "calc_cmd"],
			"0" : ["0" , "calc_cmd"],
			"." : ["·" , "calc_cmd"],
			"=" : ["=" , "calc_operator"]
		}
	],
	DEFINEOPTION = {
		"numLimit" : 15,			// 계산기 출력 최대 자리수
		"numOver" : 9,				// 계산기 출력 기본 자리수
		"locale" : "ko-KR"			// 계산기 출력 숫자 언어
	};

	return {
		TYPEVIEW, TYPEMODULE,
		KINDCALC,
		CMDADDNUM, CMDDELNUM, CMDOPERATOR, CMDCLEAR,
		VALERROR,
		CLSCALCWRAP, CLSPANELMSG, CLSPANELINPUT, CLSCMD, CLSOPERATOR, CLSNUM, CLSON, CLSPANELOVERSIZE, CLSPANELMAXSIZE,
		DEFINEMODULE, KEYMAP, BTNMAP, DEFINEOPTION
	};
};

export default CalcDefine();