import { Link } from "react-router-dom";

const UtilMenu = ()=>{

    return(
        <div className="utilMenu">
            <Link to={"#"}>로그인</Link>
            <Link to={"#"}>회원가입</Link>
            <Link to={"#"}>장바구니</Link>
        </div>
    )
}

export default UtilMenu;