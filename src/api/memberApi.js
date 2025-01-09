import axios from "axios"
import {API_SERVER_PORT} from "./todoApi"

const host = `${API_SERVER_PORT}/api/member`

// 370p
export const loginPost = async (loginParam) =>{

    /**
     *  x-www-form-urlencoded : 데이터를 싸응로 표시 (map 형식처럼) + 
     *  특수문자 URL  인코딩
     *  ex) & 기호-> %26, 기호 -> %3D
     *  태그<form></form> 사용해서 데이터를 보낼때 
     *  기본적으로 x-www-form-urlencoded 타입이다
     *  
     *  전송 방식 설명
     *  x-www-form-urlencoded   
     * - 키-값 쌍으로 인코딩된 데이터 전송.
     * - 주로 간단한 폼 데이터 전송에 사용.
     * 
     *  multipart/form-data   
     * - 파일 업로드와 같은 복잡한 데이터 전송에 사용.
     * - 본문이 경계(boundary)로 구분된 여러 파트로 나뉩니다.
     * 
     * application/json   
     * - 데이터를 JSON 형식으로 전송. 복잡한 데이터 구조를 전송할 때 선호됨.
     */
    const header = {headers : {"Content-type" : 'x-www-form-urlencoded'}}
    const form = new FormData();
    form.append('username', loginParam.email)
    form.append('password', loginParam.pw)

    const res = await axios.post(`${host}/login`, form,header)
    return res.data
}