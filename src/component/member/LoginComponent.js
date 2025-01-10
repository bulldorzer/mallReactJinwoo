import LiItem from "../common/LiItem";
import { login,loginPostAsync } from "../../slices/loginSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResultModal from "../common/ResultModal";


/**
 * 이메일 패스워드 받는 객체
 */
const initState = {
    email : '', pw : ''
}

const LoginComponent = () => {

    const [loginParam,setLoginParam] = useState({...initState});
    const [result,setResult] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * 
     * @param {*} e 
     */
    const handleClickLogin = (e) => {
        // dispatch(login(loginParam))
        dispatch(loginPostAsync(loginParam)) // 비동기호출
        .unwrap()
        .then(data =>{
            console.log("after unwrap...")
            console.log(data)
            if (data.error) {
                alert("이메일과 패스워드를 다시 확인하세요")
                setLoginParam(initState)
                navigate({pathname : '/member/login'}
                )
            } else {
                // alert("로그인 성공")
                setResult(true);
            }
        })
        
    }

    /**
     * input 바뀌면 실시간으로 업데이트 반영
     * @param {event} e 
     */
    const handleChange = e => {
        const {name, value} = e.target
        setLoginParam(prevData =>({...prevData,[name]:value}))
    }

    const fields = [
        {label : "Email", name : "email", value : loginParam.email},
        {label : "Password", name : "pw", value : loginParam.pw , type:"password"}
    ]

    return (
        <>
            { result && <ResultModal title={'로그인 성공'} content={''} 
            cbfn={()=>{navigate({pathname : '/'})}}/>}
            <ul>
                {fields.map(({label,name,value,type})=>((
                    <LiItem 
                        key={name}
                        name={name}
                        label={label}
                        value={value}
                        type={type}
                        onChange={handleChange}
                        />
                )))}
            </ul>
            <div className="btnGroup" style={{textAlign : 'left'}}>
                <button type="button" className="btn" onClick={handleClickLogin}>로그인</button>
            </div>
        </>
    )

}

export default LoginComponent;