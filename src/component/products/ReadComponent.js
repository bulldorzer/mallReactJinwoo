import { useEffect, useState } from "react"
import { getOne } from "../../api/productsApi"
import { API_SERVER_PORT } from "../../api/todoApi";
import useCustomMove from "../../hook/useCustomHook"
import LiItem from "../common/LiItem"

const host = API_SERVER_PORT;

// 초기값 객체
const initState = {
    pno : 0,
    pname : '',
    price : '',
    pdesc : '',
    delFlag : true,
    uploadFileNames : []
}
const ReadComponent = ({pno}) =>{
    const [product,setProduct] = useState(initState)
    // useCustomMove 컴포넌트 안에 있는 함수들 호출 

    useEffect(()=>{
        getOne(pno).then(data=>{
            console.log(data)
            setProduct(()=>data ? data : initState)
        })
    },[pno])
    
    const {moveToList,moveToModify} = useCustomMove();
    
    const fields = [
        {label : 'Name',name : 'pname'},
        {label : 'Price',name : 'price'},
        {label : 'Description',name : 'pdesc'},
        
    ]

    return(
        <>
        <ul className="read item">
            {
                fields.map(({label,name})=>{
                    let data = product[name]
                    if (name == "complete") {
                        data = product['complete'] ? 'Complete' : 'Not Yet'
                    }
                    return(
                    <LiItem 
                        key={name} 
                        label={label} 
                        name={name}
                        value={data}
                        readOnly={true}/>
                    )
                })
            }
            <li>
                {
                    product.uploadFileNames.map((imgFile,i)=>(
                        <span key={i}>
                            <img src={`${host}/api/products/view/s_${imgFile}`}/>
                        </span>
                    ))
                }
            </li>
        </ul>
        <div className="btnGroup">
            <button type="button" className="btn" onClick={()=>{moveToList()}}>목록</button>
            <button type="button" className="btn" onClick={()=>{moveToModify(pno)}}>수정</button>
        </div>
        </>
    )
}

// {return (<li>...</li>)  } 생략되어있음 
/*
const makeDiv = (title, value) =>(
    <li>
        <span className="labelWrap">{title}</span>
        <span className="dataWrap">{value}</span>
    </li>
)
*/

// read - 데이터 읽기, 수정 X
/*
const LiItem = ({title,value}) =>{
    if (title == 'Complete') {
        value = value ? 'Complete' : 'Not Yet'
    }
    return(
        <li>
            <span className="labelWrap">{title}</span>
            <span className="dataWrap">{value}</span>
        </li>
    )

}
*/

export default ReadComponent;