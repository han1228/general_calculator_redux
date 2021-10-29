## general_calculator - React + Redux

React 연습 과제를 위해 Vanilla 로 먼저 계산기를 제작하고 그 기반으로 React + Redux 로 구성해보는 연습 프로젝트

### React + Redux

1. 기반
    * [Create React App] 사용 (https://github.com/facebook/create-react-app).

2. 설치
    * `npm i`

3. 실행
    * `npm start`

4. 설명
    * Root.js : Root (Provider)

    * store/index.js : 스토어 생성
    * store/define.js : 상수 (옵션 정의)
    * store/util.js : 유틸
    * store/modules/index.js : 리듀서 컴바인
    * store/modules/calcReducer.js : 계산 리듀서
    * store/modules/calcModule.js : 계산 모듈

    * containers/CalcMsgPanelContainer.js : 계산기 상단 메세지 컨테이너
    * containers/CalcInputPanelContainer.js : 계산기 연산 결과 컨테이너
    * containers/CalcBtnPanelContainer.js : 계산기 버튼 컨테이너

    * components/App.js : 컴포넌트 최상위

    * Components/CalcTemplate.js : 템플릿 컴포넌트
    * Components/CalcMsgPanel.js : 계산기 상단 메세지(연산 상태) 패널
    * Components/CalcInputPanel.js : 계산기 연산 결과 패널
    * Components/CalcBtnPanel.js : 계산기 버튼 패널, 이벤트 바인딩 및 액션 생성

