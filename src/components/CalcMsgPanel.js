import React, {Component} from "react";

class CalcMsgPanel extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		console.log(this.props.curFormula, nextProps.curFormula);
		return this.props.curFormula !== nextProps.curFormula && nextProps.curFormula !== undefined;
	}

	render () {
		console.log(`============== CalcMsgPanel Render`);
		const {curFormula} = this.props;

		return (
			<tr>
				<td colSpan="4" className="panel_msg">
					<span>
						{curFormula || (<br />)}
					</span>
				</td>
			</tr>
		);
	}
}

export default CalcMsgPanel;