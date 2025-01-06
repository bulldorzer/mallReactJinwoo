import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param,defaultValue) =>{
    return (param) ? parseInt(param) : defaultValue;
}
const useCustomHook = () =>{


    const navigate = useNavigate() // 다른페이지로 동적 이동
    
    const [refresh,setRefresh] = useState(false)

    const [queryParams] = useSearchParams() // 쿼리스트링 추철
    // console.log("queryParams",queryParams);
    // console.log("queryParams",[queryParams]);
    const page = getNum(queryParams.get('page'),1); // 쿼리스트링 값 뽑아낼때 get메소드로 뽑아냄
    // console.log("page",page);
    const size = getNum(queryParams.get('size'),10);
    // console.log("size",size);

    const queryDefault = createSearchParams({page, size}).toString(); // ?page=1&size=10
    // const queryDefault = createSearchParams({page:page, size: size})//배열형태로 가저옴
    // .toString(); // 스트링으로 가져옴 아래내용을 위로 축약한것

    // 리스트 화면 이동
    // pageParam 값이 있다면 새로운 쿼리스트링 만들어서 이동
    const moveToList = (pageParam)=>{ 
        let queryStr = ''
        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);
            queryStr = createSearchParams({page : pageNum, size : sizeNum}).toString()
        }else{
            // 없으면 쿼리스트링 초기화
            queryStr = queryDefault
        }
        navigate( { pathname : `/todo/list`, search : queryStr} )

        setRefresh(!refresh);
        
    }

    // 수정 화면 이동
    const moveToModify = ((num)=>{
        navigate( {
            pathname : `../modify/${num}`,
            search : queryDefault
        } )
    })

    // 상세 페이지 이동
    const moveToRead = (num) =>{
        // console.log(queryDefault);
        navigate( {
            pathname : `../read/${num}`,
            search : queryDefault
        } )
    }

    return {moveToList,moveToModify,moveToRead,page,size,refresh}

    

}

export default useCustomHook;