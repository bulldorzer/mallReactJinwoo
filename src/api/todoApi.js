import jwtAxios from "../util/jwtUtil"

export const API_SERVER_PORT = "http://localhost:8080"

const prefix = `${API_SERVER_PORT}/api/todo`

// 상세보기 페이지
export const getOne = async (tno) =>{
    // get 방식으로 비동기 통신
    const res = await jwtAxios.get(`${prefix}/${tno}`)
    return res.data
}

// 목록(List) 페이지 데이터
export const getList = async (pageParam) =>{
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page,size}})
    // 쿼리스트링 생성 : params: {page,size} -> /list?page=1&size=10
    return res.data
}

// 책 162p - 추가 기능
export const postAdd = async (todo) =>{
    //post 통신
    const res = await jwtAxios.post(`${prefix}/` , todo)
    return res.data
}

// 수정 책 177p - ModifyComponent 수정
export const putOne = async (todo) =>{ //객체정보 전부다 넘어옴
    const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo )
    return res.data
}

// 책 170,177p 삭제,수정 - ModifyComponent 수정
export const deleteOne = async (tno) =>{
    const res = await jwtAxios.delete(`${prefix}/
        ${tno}` )
    return res.data
}
