import { useEffect, useRef, useState } from "react"
import { getOne, deleteOne, putOne } from "../../api/productsApi"
import { API_SERVER_PORT } from "../../api/todoApi";

import useCustomMove from "../../hook/useCustomHook"
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



const ModifyComponent = ({pno}) =>{
    const [product, setProduct] = useState({...initState}) // 스프레드로 객체 복제
    const [result, setResult] = useState(null)
    const {moveToList,moveToRead} = useCustomMove();
    const uploadRef =useRef();
    

    useEffect(()=>{
        getOne(pno).then(data=>{
            setProduct(data)
        })
        console.log(product)
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
        putOne(product).then(data=>{
            setResult('Modify')
        })
    }
    const handleClickDelete = () =>{
        deleteOne(pno).then(data =>{
            setResult('Deleted')
        })
    }

    const closeModal = () =>{
        result == 'Deleted' ? moveToList() : moveToRead(pno)
        
    }

    const fields = [
    
        {label : 'Name', name : 'pname', value : product.pname, onChange : handleChangeProduct},
        {label : 'Price', name : 'price', value : product.price, onChange : handleChangeProduct},
        {label : 'Description', name : 'pdesc', value : product.pdesc, readOnly : true}
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
                            <button className="btn">삭제</button>
                        </span>
                    ))
                }
            </li>
        </ul>
        <div className="btnGroup">
            <button type="button" className="btn" onClick={handleClickDelete}>삭제</button>
            <button type="button" className="btn" onClick={handleClickModify}>수정</button>
        </div>
        </>
    )
}




export default ModifyComponent;