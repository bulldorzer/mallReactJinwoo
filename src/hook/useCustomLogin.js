import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate, Navigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";


const useCustomLogin = () =>{


    const navigate = useNavigate() // 다른페이지로 동적 이동
    const dispatch = useDispatch()
    const loginState = useSelector(state => state.loginSlice) // 로그인상태
    const isLogin = loginState.email ? true : false // 로그인여부

    const doLogin = async (loginParam) =>{ // 로그인함수
        const action = await dispatch(loginPostAsync(loginParam)) // 비동기 호출
        return action.payload
    }

    const doLogout = () =>{ // 로그아웃 함수
        dispatch(logout())
    }

    /**
     * 페이지이동
     * @param {*} path 
     */
    const moveToPath = ((path)=>{ 
        navigate( 
            {pathname : path},
            {replace : true}
        )
    })

    /**
     * 로그인 페이지이동
     */
    const moveToLogin = (()=>{ 
        navigate( 
            {pathname : `/member/login`},
            {replace : true}
        )
    })

    /**
     * 로그인 페이지로 이동 컴포넌트
     * @returns 
     */
    const moveToLoginReturn = (()=>{ 
        return <navigate replace to='/member/login'/>
    })

    const exceptionHandle = (e) =>{
        console.log("Exception...")

        const errorMsg = e.response.data.error
        const errorStr = createSearchParams({error: errorMsg}).toString()

        if (errorMsg === 'REQUIRE_LOGIN') {
            alert("로그인 해야만 합니다.")
            navigate({pathname:'/member/login', search: errorStr})
            return
        }
        if (e.response.data.error === 'ERROR_ACCESSDENIED') {
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.")
            navigate({pathname:'/member/login', search: errorStr})
            return
        }
    }

    return {loginState,isLogin,doLogin,doLogout,moveToPath,moveToLogin,moveToLoginReturn, exceptionHandle}
    
    

    
    

}

export default useCustomLogin;