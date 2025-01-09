import { useRef, useState } from "react"
import { postAdd } from "../../api/productsApi"
import FetchingModal from "../common/FetchingModal"
import ResultModal from "../common/ResultModal"
import useCustomHook from "../../hook/useCustomHook"

// 초기값 객체
const initState = {
    pname : '',
    pdesc : '',
    price : 0,
    files : []
}

const AddComponent = () =>{
    const uploadRef = useRef() // getElementById()
    const acceptFiles = ".png,.jpg,.jpeg,.pdf";

    const [product, setProduct] = useState({...initState})
    const [fetching,setFetching] = useState(false)
    const [result,setResult] = useState(false)

    const {moveToList} = useCustomHook()

    const handleChangeProduct = (e) => {
        const {name, value} = e.target
        setProduct(prevItem=>({...prevItem, [name] : value})

        )
        
    }

    // 비동기 함수로서 함수 명에 async와 기능 수행되는 함수에 await를 써야함
    const  handleClickAdd = async (e) =>{
        setFetching(true)
        
        //신규추가 이미지 목록 - form데이터에 담음
        const files = uploadRef.current.files // useRef 작성된 요소의 files 목록 배열로 제출


        const formData = new FormData(); 
        // 첨부된 파일에서 값을 하나씩 뽑아서 files라는 key값으로 첨부됨
        
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

        
        formData.forEach((v,k)=>console.log(k,v))

        await postAdd(formData).then(data =>{
            setFetching(false)
            setResult(data.result)

        });// product로 받음 앞에 순서 끝나고 처리
    }
    const closeModal = () => {
        setResult(null);
        moveToList({page:1})
    }
    return(
        <>
            {fetching && <FetchingModal/>}
            {result && <ResultModal
                            title={'Product Add Result'}
                            content={`${result}번 등록완료`}
                            cbfn={closeModal}/>}
            <ul>
                <li>
                    <span>Product Name</span>
                    <span>
                        <input
                            name="pname"
                            type="text"
                            value={product.pname}
                            onChange={handleChangeProduct}
                        />
                    </span>
                </li>
                <li>
                    <span>Description</span>
                    <span>
                        <textarea
                            name="pdesc"
                            value={product.pdesc}
                            rows="4"
                            onChange={handleChangeProduct}
                        >{product.pdesc}</textarea>
                    </span>
                </li>
                <li>
                    <span>Price</span>
                    <span>
                        <input
                            name="price"
                            type="number"
                            value={product.price}
                            onChange={handleChangeProduct}
                        />
                    </span>
                </li>
                <li>
                    <span>File</span>
                    <span>
                        <input
                            ref={uploadRef}
                            name="files"
                            type="file"
                            multiple={true}
                            accept={acceptFiles}
                        />
                    </span>
                </li>
            </ul>
            <div className="btnGroup">
                <button type="button" className="btn" >목록</button>
                <button type="button" className="btn" onClick={handleClickAdd}>등록</button>
            </div>
        </>
    )
}

export default AddComponent;