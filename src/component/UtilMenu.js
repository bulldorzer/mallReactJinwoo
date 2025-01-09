import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/loginSlice";

const UtilMenu = ()=>{

    const loginState = useSelector(state => state.loginSlice)

    const dispatch = useDispatch()
    const navigate =useNavigate()
    const handleClickLogout = (e) =>{
        e.preventDefault()
        dispatch(logout())
        navigate("/")
    }
    return(
        <div className="utilMenu">
        {
            loginState.email ?
            <>
                <Link to={"#"} onClick={handleClickLogout}>로그아웃</Link>
                <Link to={"/mypage"}>마이페이지</Link>
            </>
            : <>
            <Link to={"/member"}>로그인</Link>
            <Link to={"/signup"}>마이페이지</Link>
            </>
        }
        <Link to={"/cart"}>장바구니</Link>
        </div>
    )
}

export default UtilMenu;