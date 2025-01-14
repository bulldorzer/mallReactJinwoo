import { useEffect,useState } from "react"
import { getOneModify, deleteOne, putOne } from "../../api/boardApi"
import useCustomMove from "../../hook/useCustomMove"
import LiItem from "../common/LiItem"
import ResultModal from "../../component/common/ResultModal";


const initState = {
    bno: 0,
    title: "",
    writer: "",
    viewCount: 0,
    postDate: ""
}


const ModifyComponent = ({bno}) =>{

    const [board,setBoard] = useState({...initState})
    const [result,setResult] = useState(null)

    const {moveToList, moveToRead} = useCustomMove()
   
    /**
     * 수정하려는 글 데이터 가져오기
     */
    useEffect(()=>{
            getOneModify(bno).then( data =>{
                console.log(data)
                setBoard(() => data ? data : initState)  
            }).catch(err => {
                console.log("getOneModify Err: ",err)
                setBoard(initState)
            })
    },[bno])

    /**
     * 필드 입력값 데이터에 초기화
     * @param {Event} e 
     */
    // 입력창에 
    const handleChangePost = (e) => {
        const { name, value } = e.target;
        setBoard((prevData) => ({...prevData, [name] : value }))
    }

    // 수정버튼 누를시 서버와 교신후 결과모달창값 세팅
    const handleClickModify = () => {
        putOne(board).then((data)=>{
            console.log("modify result : ",data)
            setResult("modify")
        }).catch((err)=>{
            console.log("Err Modify :",err)
            setResult(null)
        })
    }

    // 삭제버튼 누를시 서버와 교신후 결과모달창값 세팅
    const handleClickDelete = () =>{
        deleteOne(bno).then((data)=>{
            console.log("delete result",data)
            setResult("Delete")
        }).catch((err)=>{
            console.log("Delete err: ",err)
            setResult(null)
        })
    }

    /**
     * 팝업 닫기 및 이동
     */
    const closeModal = () =>{
        setResult(null) // 상태 초기화
        result == "modify" ? moveToRead(bno) : moveToList();
    }
    

    const fields = [
        {label : 'Title', name : 'title', type: 'text', value : board.title, onChange : handleChangePost },
        {label : 'Writer', name : 'writer', type: 'text', value: board.writer, readOnly : true},
        {label : 'View Count', name : 'viewCount', type:'text', value: board.viewCount, readOnly : true},
        {label : 'Post Date', name : 'postDate', type: 'date', value: board.postDate, readOnly : true }
    ]
    return (
        <>
            {result && <ResultModal title={"처리 결과"} content={result} 
            cbfn={closeModal}/> }
            <ul className="modify item">
                {
                   fields.map((field)=>
                    (
                        <LiItem key={field.name} {...field} />
                    )
                   )
                    
                }
                <li>
                    <span className="labelWrap">내용</span>
                    <span className="dataWrap">
                        <textarea name="content" value={board.content} onChange={handleChangePost}></textarea>
                    </span>
                </li>
            </ul>
            
            <div className="btnGroup">
                <button type="button" className="btn" onClick={()=>{moveToRead(bno)}}>취소</button>
                <button type="button" className="btn" onClick={handleClickModify}>수정</button>
                <button type="button" className="btn" onClick={handleClickDelete}>삭제</button>
            </div>
        </>
    )
}

export default ModifyComponent;