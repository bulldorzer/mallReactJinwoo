import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BasicMenu = ()=>{

    const loginState = useSelector(state => state.loginSlice)
    return(
        <nav className="gnb">
            <Link to={"/"}>home</Link>
            <Link to={"/about"}>about</Link>
            {/* {
                // 로그인 이메일 값이 있을때 표시하겠다.
                loginState.email && <>
                <Link to={"/todo"}>todo</Link>
                <Link to={"/products"}>products</Link>
                <Link to={"/board"}>board</Link>
                </>
            } */}
            <Link to={"/todo"}>todo</Link>
            <Link to={"/products"}>products</Link>
            <Link to={"/board"}>board</Link>
        </nav>
    )
}

export default BasicMenu;