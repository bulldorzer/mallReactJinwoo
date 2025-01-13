import { useState, useEffect } from "react";
import { postAdd } from "../../api/boardApi";
import { useSelector } from "react-redux";
import useCustomMove from "../../hook/useCustomMove"
import LiItem from "../common/LiItem"




const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);
const initState = {
    title : '',
    writer : '',
    postDate : formattedDate,

}

const AddComponent = () =>{

    const [board,setBoard] = useState({...initState})
    const [showResult,setShowResult] = useState(null)

    const {moveToList} = useCustomMove()
    const writer = useSelector( state => state.loginSlice.nickname)

    useEffect (()=>{
        setBoard((prevPost) => ({
            ...prevPost,
            writer : writer,
            postDate: new Date().toISOString().split("T")[0],
        }));
    },[])

    const handleChangeBoard = (e) =>{

        const {name, value} = e.target;
        setBoard((preBoard)=>({...preBoard,[name] : value}))
    }

    const  handleClickAdd = (e) =>{
        postAdd(board).then(result =>{ // 통신 성공시 {'RESULT' = 'SUCCESS'}
            console.log(result);
            setBoard({...initState})
            setShowResult(result.RESULT) // = true 모달 보임 결과값 표시
            moveToList()
        }).catch(e=>{
            console.error(e)
        })
        setShowResult(board)
    }

    const closeModal = () =>{
        setShowResult(null)
    }

    const fields = [
        {label : '작성자', name : 'writer'},
        {label : '제목', name : 'title'},
        {label : '작성일', name : 'postDate', type : 'date'},
    ]


    return(
        <>
            <ul>
                {
                    fields.map(({label,type,name})=>{
                        return(
                            <LiItem
                            key={name}
                            label = {label} 
                            name = {name}
                            type={type}
                            value={board[name]}
                            onChange={handleChangeBoard}
                            />
                        )
                    })
                }
            </ul>
            <div className="btnGroup">
            <button type="button" className="btn" onClick={()=>{moveToList()}}>목록</button>
            <button type="button" className="btn" onClick={handleClickAdd}>등록</button>
        </div>
        </>
    )
}
export default AddComponent;