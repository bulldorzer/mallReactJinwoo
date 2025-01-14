import { useParams } from "react-router-dom"
import ModifyComponent from "../../component/board/ModifyComponent"
import { useEffect, useState } from "react";
import useCustomLogin from "../../hook/useCustomLogin";
import ResultModal from "../../component/common/ResultModal";

const ModifyPage = () =>{

    // 서버와 교신 결과 값
    const [result,setResult] = useState(false)
    // 로그인 훅에서 사용할 로그인 확인 및 로그인 창으로 이동
    const {isLogin, moveToLogin} = useCustomLogin()

    //URL에서 추출하는 파라미터
    const {bno} = useParams();

    useEffect(()=>{
        if (!isLogin) setResult(true)
    }, [isLogin])
    return(
        <>
        {
            result && <ResultModal title={'로그인 필요'} content={'로그인 페이지로 이동합니다'} cbfn={moveToLogin}/>
        }
            <h3>ModifyPage...{bno} </h3>
            <ModifyComponent bno={bno}/>
        </>
    )

}
export default ModifyPage