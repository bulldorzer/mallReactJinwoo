import { useEffect,useState } from "react"
import { getList } from "../../api/boardApi"
import useCustomMove from "../../hook/useCustomMove"
import UseCustomLogin from "../../hook/useCustomLogin"
import PageComponent from "../common/PageComponent"



const initState = {
    dtoList : [], // 서버데이터가 여기에 들어옴
    pageNumList : [1,2,3,4,5],
    pageRequestDto : null,
    prev : false,
    next : false,
    totalCount : 1,
    prevPage : 0,
    nextPage : 0,
    totalPage : 1,
    current : 1
}


const BoardComponent = () =>{

    const {page,size,refresh,moveToList,moveToRead,moveToBoadAdd} = useCustomMove()
    // const {page,size,moveToList : goToList} = useCustomMove() 함수이름 바꾸는 기법
    const [serverData,setServerData] = useState(initState);

    const {exceptionHandle} = UseCustomLogin();
   
    useEffect(()=>{
            getList({page,size}).then( data=>{
                // console.log(data)
              setServerData(data)  
            }).catch(err=>exceptionHandle)
        },[page,size,refresh])

    return (
        <>
            <ul className="list">
                <li className="header">
                    <span className="tno">NO.</span>
                    <span className="title">제목</span>
                    <span className="writer">작성자</span>
                    <span className="visitCount">조회수</span>
                    <span className="dueDate">작성일</span>
                </li>
                {
                    serverData.dtoList.map((board) =>( // 배열로 데이터가 들어오고 board로 배열의 데이터중 하나의 데이터를 가져옴
                        
                        <li key={board.bno} onClick={()=>moveToRead(board.bno)} >
                            <span className="bno">{board.bno}</span>
                            <span className="title">{board.title}</span>
                            <span className="writer">{board.writer}</span>
                            <span className="visitCount">{board.visitCount || 0}</span>
                            <span className="dueDate">{board.postDate}</span>
                        </li>
                    ))
                    
                }
            </ul>
            <PageComponent ServerData={serverData} movePage={moveToList}></PageComponent>
            <div className="btnGroup">
                
                <button type="button" className="btn" onClick={moveToBoadAdd}>등록</button>
            </div>
        </>
    )
}

export default BoardComponent;