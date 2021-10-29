import {createAction, handleActions} from "redux-actions";
import calcModule from "./calcModule";
import define from "../define";
import util from "../util";

const CMDADDNUM = define.CMDADDNUM,
	CMDDELNUM = define.CMDDELNUM,
	CMDCLEAR = define.CMDCLEAR,
	CMDOPERATOR = define.CMDOPERATOR;

export const addNum = createAction(CMDADDNUM, val => val);
export const delNum = createAction(CMDDELNUM);
export const clear = createAction(CMDCLEAR);
export const operator = createAction(CMDOPERATOR, val => val);

const initialState = {
	curNumber : "",
	curFormula : "",
};

calcModule.initialize();

const calcModuleExcutor = (cmd, val, state) => {
	const cmdFunc = calcModule[cmd];
	let resultVal = {};

	if (cmdFunc) {
		resultVal = cmdFunc.call(calcModule, val);
	}

	if (util.isEmptyObject(resultVal)) {
		resultVal = state;
	}
console.log(resultVal);
	return resultVal;
};

export default handleActions({
	[CMDADDNUM] : (state, action) => {
		return calcModuleExcutor(CMDADDNUM, action.payload, state);
	},
	[CMDDELNUM] : (state, action) => {
		return calcModuleExcutor(CMDDELNUM, action.payload, state);
	},
	[CMDCLEAR] : (state, action) => {
		return calcModuleExcutor(CMDCLEAR, action.payload, state);
	},
	[CMDOPERATOR] : (state, action) => {
		return calcModuleExcutor(CMDOPERATOR, action.payload, state);
	}
}, initialState);