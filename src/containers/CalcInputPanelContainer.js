import React, {Component} from "react";
import {connect} from "react-redux";
import CalcInputPanel from "../components/CalcInputPanel";

class CalcInputPanelContainer extends Component {
	render () {
		const {curNumber} = this.props;
		return (
			<CalcInputPanel curNumber={curNumber} />
		);
	}
}

export default connect(
	(state) => ({curNumber : state.calcReducer.curNumber})
)(CalcInputPanelContainer);