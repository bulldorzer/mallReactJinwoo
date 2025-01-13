import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './slices/loginSlice'
// import login  from "./slices/login";


/**
 * 스토어 : APP내에 공유되는 상태 데이터 저장
 * 데이터 처리를 담당 : reducer 함수
 */
export default configureStore({ // 스토어 생성
    reducer : {
        "loginSlice" : loginSlice
        // "login" : login
    }
})