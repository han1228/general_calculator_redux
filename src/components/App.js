import React, {Component} from "react";
import CalcTemplate from "./CalcTemplate";
import CalcMsgPanelContainer from "../containers/CalcMsgPanelContainer";
import CalcInputPanelContainer from "../containers/CalcInputPanelContainer";
import CalcBtnPanelContainer from "../containers/CalcBtnPanelContainer";

class App extends Component {
	componentDidMount () {
		this.setCalcWrapTopPosition();
		window.addEventListener("resize", (e) => this.doResize(e), false);
	}

	eleCalcWrap = null

	state = {
		wrapInlineStyle : {display : "block"}
	}

	/**
	 * resize 이벤트 콜백 함수.
	 * @param  {Object} e 		- 이벤트 정보
	 */
	doResize = (e) => {
		this.setCalcWrapTopPosition();
	}

	/**
	 * 계산기 영역의 세로 위치를 중앙에 위치시키는 함수.
	 */
	setCalcWrapTopPosition = () => {
		const eleCalcWrap = this.eleCalcWrap,
			winHeight = window.innerHeight,
			wrapHeight = eleCalcWrap.offsetHeight,
			topDiff = winHeight - wrapHeight;
		
		if (topDiff > 0) {
			let topPos = (winHeight / 2) - (wrapHeight / 2);
			this.setWrapStyleState(topPos + "px");
		}
	}

	setWrapStyleState = (val) => {
		let {wrapInlineStyle} = this.state;

		if (wrapInlineStyle.top !== val) {
			let newWrapStyle = Object.assign({}, wrapInlineStyle, {top : val});
			this.setState({
				wrapInlineStyle : newWrapStyle
			});
		}
	}

	render () {
		console.log(`============== App Render`);
		const {wrapInlineStyle} = this.state;

		return (
			<div className="calc_wrap" style={wrapInlineStyle} ref={ref => {this.eleCalcWrap = ref}}>
				<div className="sub_title">General Calculator - React + Redux</div>
				<CalcTemplate>
					<CalcMsgPanelContainer />
					<CalcInputPanelContainer />
					<CalcBtnPanelContainer />
				</CalcTemplate>
			</div>
		);
	}
}

export default App;