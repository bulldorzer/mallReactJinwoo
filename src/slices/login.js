import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil"



//값을 받을 초기값 객체 - state에 올릴 값에 맞게 구성
const initState = {email: '', nickname:''}

// 쿠키 가져오가
const loadMemberCookies = () =>{
    const memberInfo = getCookie("member")

    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }

    console.log("member 쿠키 값 확인 : ", memberInfo)
    return memberInfo
}
/**
 * createAsyncThunk(이름,함수)
 * 비동기 방식으로 값 가져올 함수
 */
export const loginPostAsync = createAsyncThunk('loginPostAsync',async(param)=>{
    const response = await loginPost(param) // 로그인 정보
    return response;
})

// 슬라이스 생성
const login = createSlice({ // 객체형식으로 값을 받음
    name : 'login',
    initialState : loadMemberCookies == initState,
    reducers : {
        login : () =>{},
        logout : (state)=>{
            removeCookie("member")
            state.email=''
            state.nickname=''
        }
    },
    extraReducers : (builder) =>{
        builder                                 //state : 현재값 , action: state에 대한 동작들 payload - 업데이트된 값을 가지고 있음
            .addCase(loginPostAsync.fulfilled, (state,action)=>{
                    const payload = action.payload;
                    state.email = payload.email;

                    console.log("action payload값들: ",payload)
                    if (!payload.error) { // payload가 에러(=null)이면 새로 읽어온 값으로 쿠키값 다시 설정
                        setCookie("member", JSON.stringify(payload),1)
                    }
            }).addCase(loginPostAsync.pending,(state,action)=>{
                console.log("pending...")
            }).addCase(loginPostAsync.rejected,(state,action)=>{
                console.log("rejected...")
            })
    }
})

// 내보내기
export const {logout} = login.actions;
export default login.reducer;