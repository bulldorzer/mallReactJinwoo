<<<<<<< HEAD
import { useEffect,useState } from "react"
import { getOne } from "../../api/boardApi"
import useCustomMove from "../../hook/useCustomMove"
import UseCustomLogin from "../../hook/useCustomLogin"
import PageComponent from "../common/PageComponent"
=======
import { useEffect, useState } from "react";
import { getOne } from "../../api/boardApi";
import useCustomMove from "../../hook/useCustomMove";
>>>>>>> fa190431953a709595b0e5ef86e612572f76395f
import LiItem from "../common/LiItem"


const initState = {
    bno: 0,
<<<<<<< HEAD
    title: '',
    writer: '',
    viewCount: 0,
    postDate: ''
}

// 게시판 리스트로부터 추출된 useParam을 가지고옴
const ReadComponent = ({bno}) =>{

    const [board,setBoard] = useState(initState)

   
    // 화면 실행전 글번호를 통해 해당 글 상세내역을 가져옴
    useEffect(()=>{
            getOne(bno).then( data =>{
                console.log(data)
                setBoard(() => data ? data : initState)  
            }).catch(err => {
                console.log("getOne Err: ",err)
                setBoard(initState)
            })
    },[bno])

    // 글목록이동, 글수정 이동 기능 추출
=======
    title : "",
    writer : "",
    visitCount: 0,
    postDate:""
}

const ReadComponent = ({bno}) =>{

    const [post,setPost] = useState(initState)

    useEffect(()=>{
        getOne(bno).then(data=>{
            setPost(()=>data?data:initState)
        }).catch((err)=>{
            console.log("ReadBoard Err: ",err)
            setPost(initState)
        })
    },[bno])

>>>>>>> fa190431953a709595b0e5ef86e612572f76395f
    const {moveToList, moveToModify} = useCustomMove();

    const fields = [
        {label : 'Title', name : 'title' },
        {label : 'Writer', name : 'writer'},
        {label : 'View Count', name : 'viewCount'},
        {label : 'Post Date', name : 'postDate'}
    ]
<<<<<<< HEAD
    return (
        <>
            <ul className="read item">
                {
                   fields.map(({label, name})=>{
                        let data = board[name] || "";

                        return(
                            <LiItem 
                                key={name}
=======
    
    return(
        <>
            <ul className="read item">
                {
                    fields.map(({label, name})=> {
                        
                        let data = post[name] || "";

                        return (
                            <LiItem 
                                key={name}  
>>>>>>> fa190431953a709595b0e5ef86e612572f76395f
                                label={label}
                                name={name}
                                value={data}
                                readOnly={true}
                            />
<<<<<<< HEAD
                        )
                   })
                    
=======
                    )}) 
>>>>>>> fa190431953a709595b0e5ef86e612572f76395f
                }
                <li className="readOnly">
                    <span className="labelWrap">내용</span>
                    <span className="dataWrap">
<<<<<<< HEAD
                        <textarea name="content" value={board.content} readOnly={true}></textarea>
                    </span>
                </li>
            </ul>
            
            <div className="btnGroup">
                {/* 속성 입력시 항상 주의할것 매개변수 있는 함수를 화살표 함수로 쓰지 않을 경우 바로 실행 되기 떄문에 상세보기 없이 바로 수정화면으로 이동할수도 있음
                매개변수가 없을시엔 함수명만 작성해도 괞찮음 */}
                <button type="button" className="btn" onClick={moveToList}>목록</button>
                <button type="button" className="btn" onClick={()=>moveToModify(bno)}>수정</button>
            </div>
        </>
    )
}

=======
                        <textarea name="content" value={post.content} readOnly={true}></textarea>
                    </span>
                </li>
            </ul>
            <div className="btnGroup">
            <button type="button" className="btn" onClick={()=>{moveToList()}}>목록</button>
            <button type="button" className="btn" onClick={()=>{moveToModify(tno)}}>수정</button>
        </div>
        </>
    )
}
>>>>>>> fa190431953a709595b0e5ef86e612572f76395f
export default ReadComponent;