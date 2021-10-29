const util = () => {
	return {
		/**
		 * 전달된 문자의 첫문자를 대문자로 변경하여 반환하는 함수
		 * @param  {String} str 		- 대상 문자
		 * @return {String}     		- 변환된 문자
		 */
		getUCFirst (str) {
			if (typeof str !== "string") {
				return "";
			}

			return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
		},
		isEmptyObject (obj) {
			return !!(obj && Object.keys(obj).length === 0 && obj.constructor === Object);
		},
		/**
		 * 접속한 브라우저가 모바일 여부 반환 함수
		 * @return {Boolean} 		- 모바일 여부 반환
		 */
		isMobile () {
			return /(mobile|android|ipad|iphone)/i.test(window.navigator.userAgent);
		}
	};
}

export default util();