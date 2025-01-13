import BasicLayout from "../../layout/BasicLayout";
import useCustomLogin from "../../hook/useCustomLogin";
import ResultModal from "../../component/common/ResultModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyPage = () =>{

    const [result,setResult] = useState(false)
    const {isLogin,moveToLogin} = useCustomLogin()

    // state안에 있는 email, nicname 추출
    const email = useSelector((state)=>state.loginSlice.email)
    const nickname = useSelector((state)=>state.loginSlice.nickname)

    useEffect(()=>{
        if (!isLogin) {
            setResult(true)
        }
    },[isLogin])
    
    return(
        <BasicLayout>
            {result && <ResultModal title={'로그인 해주세요'} content={'로그인페이지로 이동합니다'} cbfn={moveToLogin}/>}
            <div className="login">
                <h2>MyPage</h2>
                <p>{nickname}님 환영합니다</p>
                <p>{email}로 로그인 하였습니다!</p>
            </div>
        </BasicLayout>
    )
}

export default MyPage;