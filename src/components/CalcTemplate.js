import React from "react";

const CalcTemplate = ({children}) => {
	console.log(`============== CalcTemplate Render`);
	return (
		<table cellPadding="0" cellSpacing="0">
			<tbody>
				{children}
			</tbody>
		</table>
	);
};

export default CalcTemplate;