import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil"

/**
 * 이메일 받는 객체
 */
const initState = {
    email:''
}

// 쿠키 내용 점검
const loadMemberCookie = () => {
    const memberInfo = getCookie("member")

    // 닉네임 처리
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }

    return memberInfo
}

/**
 * @param : 아이디 비번 -> 서버 응답결과 리턴
 * 비동기로 처리
 */
export const loginPostAsync = createAsyncThunk('loginPostAsync',(param)=>{
    return loginPost(param)
})

/**
 * 슬라이스
 * 액션과, 리듀스를 한번에 작성 가능
 * state : 현재 화면의 상태값
 * action : 디스패치된 액션 객체, payload라는 속성에 login(매개변수)값이 포함되어서 옴
 * action.payload :  매개변수 값 추출하여 data에 저장
 * return : state에 변경된 값 반영
 *  1) 호출
 *  dispatch(login(loginParam)) -> dispatch(login({email: "user@example.com"}))
 * 
 *  2) action 객체가 아래와 같이 생성되어 전달됨
 *  {
 *          type : "LoginSlice/login",
 *          payload : {email: "user@example.com"}
 *  }
 * 
 *  Fetch : 응답 데이터 Promis 객체 - 상태, 데이터, 같이옴
 *  상태 3가지 : 처리중 : pending 성공 : fulfilled, 실패 : rejected
 */
const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState : loadMemberCookie() || initState,
    reducers : { // export시 action 이름으로 호출하여 사용하게됨
        login : (state, action) =>{ // state: 현재화면의 상태값 action : 들어온 데이터 처리
            console.log("login...")
            // const data = action.payload // action에 저장된 변경된 값을 추출
            // return({email : data.email})
            state = action.payload.email; // 위 코드를 줄임 로그인처리
        },
        logout : (state, action) =>{
            console.log("logout...")
            // return({...initState})
            removeCookie("member")
            state.email=''; // 초기값 설정
        }
    },
    extraReducers : (builder) =>{ // loginPostAsync실행후 state 변화에 따른 추가 로직을 정의하는 레고 블록 조립기
        //state : 현재값 , action: state에 대한 동작들 payload - 업데이트된 값을 가지고 있음
        builder
        // 상태에 따라 추가 실행할 구문 
        .addCase(loginPostAsync.fulfilled,(state,action)=>{
            console.log("fulfilled") // 성공 - 서버 응답이 왔을때
            const payload = action.payload; // 로그인처리

            console.log(action.payload)
            if (!payload.error) { // payload가 에러(=null)이면 새로 읽어온 값으로 쿠키값 다시 설정
                setCookie("member",JSON.stringify(payload), 1) // 1일 기한
            }
            return payload
        })
        .addCase(loginPostAsync.pending,(state,action)=>{
            console.log("pending") // 처리중
        })
        .addCase(loginPostAsync.rejected,(state,action)=>{
            console.log("rejected") // 실패
            state.email='';
        })
    }
})

// LoginSlice이름의 슬라이서에서
// reducers의 login,logout의 action을 추출해냄
export const {login,logout} = loginSlice.actions
export default loginSlice.reducer;