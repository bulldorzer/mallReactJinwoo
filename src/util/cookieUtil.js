import { Cookies } from "react-cookie";

// 쿠키 객체 생성
const cookies = new Cookies()

// 쿠키 내용 설정
// name : 쿠키 이름 / value : 쿠키값 / days : 쿠키 만료 - 일수
export const setCookie = (name, value, days) =>{
    
    const expires = new Date()
    // UTC표준 시간 기반으로 날짜, 시간 추출하여 days를 더함 -> expires에 저장(업데이트)
    expires.setUTCDate(expires.getUTCDate()+days) // 보관기한 현재부터 몇일간 유효 : 만료일자 설정
    return cookies.set(name, value, {path : '/', expires : expires})
    // return cookies.set(name, value, {path : '/', expires })
}

// 쿠키 가져오기
export const getCookie = (name) =>{
    return cookies.get(name)
}

// 쿠키 삭제하기
export const removeCookie = (name, path="/") =>{
    cookies.remove(name,{path})
}
