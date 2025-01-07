import { useRef, useState } from "react"
// 초기값 객체
const initState = {
    pname : '',
    pdesc : '',
    price : 0,
    files : []
}

const AddComponent = () =>{
    const uploadRef = useRef() // getElementById()
    const [product, setProduct] = useState({...initState})

    const handleChangeProduct = (e) => {
        const {name, value} = e.target
        setProduct(prevItem=>({...prevItem, [name] : value})

        )
        
    }

    const  handleClickAdd = (e) =>{
        const files = uploadRef.current.files
        const formData = new FormData();
        console.log(formData)
    }

    return(
        <>
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
                            type=""
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