import React, {Component} from "react";
import {connect} from "react-redux";
import CalcMsgPanel from "../components/CalcMsgPanel";

class CalcMsgPanelContainer extends Component {
	render () {
		const {curFormula} = this.props;
		return (
			<CalcMsgPanel curFormula={curFormula} />
		);
	}
}

export default connect(
	(state) => ({curFormula : state.calcReducer.curFormula})
)(CalcMsgPanelContainer);