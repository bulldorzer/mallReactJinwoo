import BasicLayout from "../../layout/BasicLayout";
import useCustomLogin from "../../hook/useCustomLogin";
import ResultModal from "../../component/common/ResultModal";
import { useEffect, useState } from "react";

const CartPage = () =>{

    const [result,setResult] = useState(false)
    const {isLogin,moveToLogin} = useCustomLogin()

    useEffect(()=>{
        if (!isLogin) {
            setResult(true)
        }
    },[isLogin])
    
    return(
        <BasicLayout>
            {result && <ResultModal title={'로그인 해주세요'} content={'로그인페이지로 이동합니다'} cbfn={moveToLogin}/>}
            <div className="login">
                <h2>CartPage</h2>
            </div>
        </BasicLayout>
    )
}

export default CartPage;