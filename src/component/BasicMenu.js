import { Link } from "react-router-dom";

const BasicMenu = ()=>{

    return(
        <nav className="gnb">
            <Link to={"/"}>home</Link>
            <Link to={"/about"}>about</Link>
            <Link to={"/todo"}>todo</Link>
        </nav>
    )
}

export default BasicMenu;