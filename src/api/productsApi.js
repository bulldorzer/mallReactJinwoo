import jwtAxios from "../util/jwtUtil";
import { API_SERVER_PORT } from "./todoApi";

const host = `${API_SERVER_PORT}/api/products`

export const getOne = async (pno) =>{
    const res = await jwtAxios.get(`${host}/${pno}`)
    return res.data
}

export const getList = async(pageParam) =>{
    try{
        const {page,size} = pageParam
        const res = await jwtAxios.get(`${host}/list`,{params : {page:page,size:size}})
        return res.data;
    }catch (error){
        console.log(error);
    }
}

/** 글추가 api */
export const postAdd = async(product) =>{
    // const header = { headers: {"Content-Type" : "multipart/form-data" } } 
    const header = { headers: { "Content-Type": "multipart/form-data" } }; 
    // 파일업로드

    // axios.post(url,body,header)
    const res = await jwtAxios.post(`${host}/`, product, header)
    return res.data
}


// 수정 책 177p - ModifyComponent 수정
/** 수정 api */
export const putOne = async (pno,product) =>{ //객체정보 전부다 넘어옴
    const res = await jwtAxios.put(`${host}/${pno}`, product )
    return res.data
}

// 책 170,177p 삭제,수정 - ModifyComponent 수정
export const deleteOne = async (pno) =>{
    const res = await jwtAxios.delete(`${host}/${pno}` )
    return res.data
}