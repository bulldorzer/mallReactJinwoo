import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

/**
 * 이메일 받는 객체
 */
const initState = {
    email:''
}

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
 */
const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState : initState,
    reducers : { // export시 action 이름으로 호출하여 사용하게됨
        login : (state, action) =>{ // state: 데이터가 들어옴 action : 들어온 데이터 처리
            console.log("login...")
            const data = action.payload // state값을 추출
            return({email : data.email})
        },
        logout : (state, action) =>{
            console.log("logout...")
            return({...initState})
        },
        extraReducers : (builder) =>{
            builder
            .addCase(loginPostAsync.fulfilled,(state,action)=>{
                console.log("fulfilled")
            })
            .addCase(loginPostAsync.pending,(state,action)=>{
                console.log("pending")
            })
            .addCase(loginPostAsync.rejected,(state,action)=>{
                console.log("rejected")
            })
        }
    }
})

// LoginSlice이름의 슬라이서에서
// reducers의 login,logout의 action을 추출해냄
export const {login,logout} = loginSlice.actions
export default loginSlice.reducer;