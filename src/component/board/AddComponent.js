import { useState, useEffect } from "react";
import { postAdd } from "../../api/boardApi";
import { useSelector } from "react-redux";
import useCustomMove from "../../hook/useCustomMove"
import LiItem from "../common/LiItem"
import ResultModal from "../common/ResultModal";




const today = new Date(); // 현재 날짜 데이터
const formattedDate = today.toISOString().slice(0, 10);

/**
 * 초기화 객체
 */
const initState = {
    title : '',
    writer : '',
    postDate : formattedDate,

}

const AddComponent = () =>{

    const [board,setBoard] = useState({...initState})
    const [showResult,setShowResult] = useState(null)

    // 훅에서 사용할 목록이동 기능
    const {moveToList} = useCustomMove()
    const writer = useSelector( state => state.loginSlice.nickname)

    // 화면이 열릴시 최신데이터와 작성자 등록날짜 초기화
    useEffect (()=>{
        setBoard((prevPost) => ({
            ...prevPost,
            writer : writer,
            postDate: new Date().toISOString().split("T")[0],
        }));
    },[])

    /**
     * 필드값 바뀔시 저장 데이터 초기화
     * @param {event} e 
     */
    const handleChangeBoard = (e) =>{

        const {name, value} = e.target;
        setBoard((preBoard)=>({...preBoard,[name] : value}))
    }

    /**
     * 등록버튼 누를시 수행할 이벤트 제어
     * @param {event} e 
     */
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

    /**
     * LiItem 컴포넌트를 위한 데이터 처리
     */
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
                <li>
                    <span className="labelWrap">내용</span>
                    <span className="dataWrap">
                        <textarea name="content" value={board.content} onChange={handleChangeBoard}></textarea>
                    </span>
                </li>
            </ul>
            <div className="btnGroup">
            <button type="button" className="btn" onClick={()=>{moveToList()}}>목록</button>
            <button type="button" className="btn" onClick={handleClickAdd}>등록</button>
        </div>
        </>
    )
}
export default AddComponent;