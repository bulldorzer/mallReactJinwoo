import { useEffect, useRef, useState } from "react"
import { getOne, deleteOne, putOne } from "../../api/productsApi"
import { API_SERVER_PORT } from "../../api/todoApi";

import useCustomMove from "../../hook/useCustomMove"
import ResultModal from "../common/ResultModal"
import LiItem from "../common/LiItem"

const host = API_SERVER_PORT;

const initState = {
    pno : 0,
    pname : '',
    price : '',
    pdesc : '',
    delFlag : true,
    uploadFileNames : []
}

/*
    const ModifyComponent = (prop) =>{
    const {pno} = prop
*/
const ModifyComponent = ({pno}) =>{
    // 현재데이터
    const [product, setProduct] = useState({...initState}) // 스프레드로 객체 복제 
    const [result, setResult] = useState(null) // 처리결과
    const {moveToList,moveToRead} = useCustomMove(); // 페이지 이동 HOOK
    const uploadRef =useRef(); // 업로드 input 요소 선택
    
    /*
        1. 처음 실행할 때 한번만 무조건 실행
            - useEffect(()⇒{}.[])
        2. 해당값이 변경될때 마다, useEffect를 실행한다
            - useEffect(()⇒{}.[state1,state2])
        3. 리액트의 전반적인 흐름
            - state        effect         callback
            - 변경함 → 랜더링O, 동작O         함수 재생성O
            - 변경안됨 → 랜더링X, 동작X         함수 재생성X
       
    */
    useEffect(()=>{
        getOne(pno).then(data=>{
            setProduct(data)
            console.log(data)
        })

        /*
            컴포넌트 생성(마운트) 될때, 의존성배열(state, 파라미터)의 값이 바뀔때 --> 실행
            clean up 함수 - return()=>{} 구문이 있다면 컴포넌트 소멸(언마운트)될 때, 값이 바뀌어서 useEffect가 실행되기 직전에 (기존에 실행한 작업 청소) 실행됨
        */
        const timer = setInterval(() => {
            console.log(`${pno} 0.3초마다 실행, 무한반복`)
        }, 300);
        
        return  ()=>{
            clearInterval(timer)
        }
        
    },[pno])

    // () => 실행할 문장 // 리턴생략
    // () => 리턴될값; // 리턴생략
    // () => ({}) - // 리턴값이 객체 형태인 경우
    const handleChangeProduct = (e) =>{
        const {name, value} = e.target
        setProduct((prevProduct)=>({
            ...prevProduct, [name] : name =="complete" ? value === "true" : value
        }))
        // [name] : key값을 동기적 설정
        // name속성이 complete이면 value === "true"의 결과 값(true/false)를 저장
        // == : 값이 같은지 비교, === : 값과 자료형까지 비교
        // 책 174p 상단에 있음
    }
    const handleClickModify = () =>{
        //신규추가 이미지 목록 - form데이터에 담음
        const files = uploadRef.current.files // useRef 작성된 요소의 files 목록 배열로 제출
        const formData = new FormData();
        
        /** 
         * 첨부된 파일에서 값을 하나씩 뽑아서 배열로 추출
        */
        for (let i = 0; i < files.length; i++) { 
            formData.append("files",files[i]);
            
        }
        // for (let file of files) {
        //     formData.append("file",file);
        // }
        
        // 첨부파일 정보 읽어서 저장
        // files.forEach( file => formData.append("files",file) )

        //other data 기존데이터
        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)
        formData.append("delFlag", product.delFlag)

        // 기존 이미지 목록을 담음
        for (const file of product.uploadFileNames) {// 기존파일
            formData.append("uploadFileNames",file)
        }
        
        putOne(pno,formData).then(data=>{
            console.log("modify result : "+data)
            setResult('modify')
        })
    }
    const deleteOldImages = (imageName) =>{
        const resultFileNames = product.uploadFileNames.filter(fileName => fileName != imageName)
        console.log(resultFileNames)
        setProduct(prevProduct=>(
            {...prevProduct,uploadFileNames : resultFileNames
        }))

    }

    // p295 책내용
    const handleClickDelete = () =>{
        
        deleteOne(pno).then(data =>{
            setResult('deleted')
        })
    }

    const closeModal = () =>{ // 닫리 누르면 페이지 이동
        result === 'modify' ? moveToRead(pno) : 
            result === 'deleted' ? moveToList({page:1}) : moveToList();
        
    }

    const fields = [
    
        {label : 'Name', name : 'pname', value : product.pname, onChange : handleChangeProduct},
        {label : 'Description', name : 'pdesc', value : product.pdesc },
        {label : 'Price', name : 'price', value : product.price, onChange : handleChangeProduct},
    ]
    

    return(
        <>
        {result && <ResultModal title={'처리결과'} content={result} cbfn={closeModal}/>}
        <ul className="modify item">
           
            {
                fields.map(field=>(
                    <LiItem key={field.name} {...field}/>
                ))
            }
            <li>
                <span>첨부 이미지</span>
                <span>
                    <input ref={uploadRef} type="file" multiple={true}/>
                </span>
            </li>
            <li>
                {
                    product.uploadFileNames.map((imgFile,i)=>(
                        <span key={i}>
                            <img src={`${host}/api/products/view/s_${imgFile}`}/>
                            <button className="btn" onClick={()=>deleteOldImages(imgFile)}>삭제</button>
                        </span>
                    ))
                }
            </li>
        </ul>
        <div className="btnGroup">
            <button type="button" className="btn" onClick={moveToList}>목록</button>
            <button type="button" className="btn" onClick={handleClickDelete}>삭제</button>
            <button type="button" className="btn" onClick={handleClickModify}>수정</button>
        </div>
        </>
    )
}




export default ModifyComponent;