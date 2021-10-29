import React, {Component} from "react";
import define from "../store/define";

class CalInputPanel extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		console.log(this.props.curNumber, nextProps.curNumber);
		return this.props.curNumber !== nextProps.curNumber && nextProps.curNumber !== undefined;
	}

	getInputPanelClsName = (val) => {
		let valSize = val.replace(/[,|\-|.]/g, "").length,
			addClsName = "";

		if (valSize > define.DEFINEOPTION.numOver) {
			if (valSize > define.DEFINEOPTION.numLimit) {
				addClsName = define.CLSPANELMAXSIZE;
			} else {
				addClsName = define.CLSPANELOVERSIZE;
			}
		}

		return addClsName;
	}

	render () {
		console.log(`============== CalcInputPanel Render`);
		const {curNumber} = this.props,
			panelNum = curNumber || "0";

		return (
			<tr>
				<td colSpan="4" className="panel_input">
					<span className={this.getInputPanelClsName(panelNum)}>{panelNum}</span>
				</td>
			</tr>
		);
	}
}

export default CalInputPanel;