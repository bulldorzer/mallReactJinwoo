import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

    return {loginState,isLogin,doLogin,doLogout,moveToPath,moveToLogin,moveToLoginReturn}
    
    

    
    

}

export default useCustomLogin;