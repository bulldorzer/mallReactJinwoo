import jwtAxios from "../util/jwtUtil";

export const API_SERVER_PORT = "http://localhost:8080"

const prefix = `${API_SERVER_PORT}/api/board`

// 상세보기 페이지
export const getOne = async (bno) =>{
    // get 방식으로 비동기 통신
    const res = await jwtAxios.get(`${prefix}/list/${bno}?incrementView=true`)
    return res.data
}

// 목록(List) 페이지 데이터
export const getList = async (pageParam) =>{
    const {page, size} = pageParam
    console.log('pageParam',pageParam)
    const res = await jwtAxios.get(`${prefix}/list`, {params: {page,size}})
    // 쿼리스트링 생성 : params: {page,size} -> /list?page=1&size=10
    console.log(res.data)
    return res.data
}

// 책 162p - 추가 기능
export const postAdd = async (board) =>{
    //post 통신
    const res = await jwtAxios.post(`${prefix}/` , board)
    console.log(res.data)
    return res.data
}

// 수정 책 177p - ModifyComponent 수정
export const putOne = async (board) =>{ //객체정보 전부다 넘어옴
    const res = await jwtAxios.put(`${prefix}/${board.bno}`, board )
    return res.data
}

// 책 170,177p 삭제,수정 - ModifyComponent 수정
export const deleteOne = async (bno) =>{
    const res = await jwtAxios.delete(`${prefix}/
        ${bno}` )
    return res.data
}