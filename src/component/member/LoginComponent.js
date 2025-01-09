import LiItem from "../common/LiItem";
import { login } from "../../slices/loginSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * 이메일 패스워드 받는 객체
 */
const initState = {
    email : '', pw : ''
}

const LoginComponent = () => {

    const [loginParam,setLoginParam] = useState({...initState});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * 
     * @param {*} e 
     */
    const handleClickLogin = (e) => {
        dispatch(login(loginParam))
        navigate({pathname : '/'})
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