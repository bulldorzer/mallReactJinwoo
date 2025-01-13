import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/loginSlice";
import useCustomLogin from "../hook/useCustomLogin";

const UtilMenu = ()=>{

    const loginState = useSelector(state => state.loginSlice)// 현재화면의 상태값을 가져옴

    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    const {doLogout, moveToPath} = useCustomLogin()

    const handleClickLogout = (e) =>{
        e.preventDefault() // 이벤트 기본동작을 막음
        doLogout()
        moveToPath('/')
    }
    return(
        <div className="utilMenu">
        {
            loginState.email ?// 현재 화면에 로그인된 id가 있냐?
            <>
                {/* 있으면 보여줄 카테고리 */}
                <Link to={"#"} onClick={handleClickLogout}>로그아웃</Link>
                <Link to={"/member/mypage"}>마이페이지</Link>
            </>
            : <>
            {/* 없으면 보여줄 카테고리 */}
            <Link to={"/member"}>로그인</Link>
            <Link to={"/signup"}>마이페이지</Link>
            </>
        }
        <Link to={"/member/cart"}>장바구니</Link>
        </div>
    )
}

export default UtilMenu;