import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import define from "../store/define";
import * as calcActions from "../store/modules/calcReducer";
import CalcBtnPanel from "../components/CalcBtnPanel";

class CalcBtnPanelContainer extends Component {
	handleCalcEvent = (evtVal) => {
		const {CalcActions} = this.props;

		if (Number.isInteger(evtVal)) {
			CalcActions.addNum(evtVal);
		} else if (typeof evtVal === "string") {
			if (evtVal === define.KEYMAP.Backspace) {
				CalcActions.delNum(evtVal);
			} else if (evtVal === define.KEYMAP.Escape) {
				CalcActions.clear(evtVal);
			} else {
				CalcActions.operator(evtVal);
			}
		}
	}

	render () {
		return (
			<CalcBtnPanel handleCalcEvent={this.handleCalcEvent} />
		);
	}
}

export default connect(
	() => ({}),
	(dispatch) => ({
		CalcActions : bindActionCreators(calcActions, dispatch)
	})
)(CalcBtnPanelContainer);