import { useEffect, useState } from "react"
// import {getOne} from '../../api/todoApi'
import useCustomMove from "../../hook/useCustomMove"
import PageComponent from "../common/PageComponent"
import { getList } from "../../api/todoApi"
import UseCustomLogin from "../../hook/useCustomLogin"

// 초기값 객체
const initData = {
    tno : 0,
    title : 'Test',
    writer : 'Test',
    dueDate : '2025-01-02',
    complete : false
}
const initData2 = {
    tno : 1,
    title : 'Test',
    writer : 'Test',
    dueDate : '2025-01-06',
    complete : false
}
// 초기값 객체
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
const ListComponent = ({tno}) =>{
    const {page,size,refresh,moveToList,moveToRead} = useCustomMove()
    // const {page,size,moveToList : goToList} = useCustomMove() 함수이름 바꾸는 기법
    const [serverData,setServerData] = useState(initState);

    const {exceptionHandle} = UseCustomLogin();
    
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
        getList({page,size}).then( data=>{
          setServerData(data)  
        }).catch(err=>exceptionHandle)
    },[page,size,refresh])


    // 서버에서 데이터 요청해서 가져오는 코드 추가 예정

    return(
        <>
        <ul className="list">
            <li className="header">
                <span className="tno">NO.</span>
                <span className="title">제목</span>
                <span className="writer">작성자</span>
                <span className="dueDate">작성일</span>
            </li>
            {
                serverData.dtoList.map((todo,i) =>( // 배열로 데이터가 들어오고 todo로 배열의 데이터중 하나의 데이터를 가져옴
                    <li key={i} onClick={()=>{moveToRead(todo.tno)}} >
                        <span className="tno">{todo.tno}</span>
                        <span className="title">{todo.title}</span>
                        <span className="writer">{todo.writer}</span>
                        <span className="dueDate">{todo.dueDate}</span>
                    </li>
                ))
            }
        </ul>
        <PageComponent ServerData={serverData} movePage={moveToList}></PageComponent>
        </>
        
    )
}

// {return (<li>...</li>)  } 생략되어있음 
const makeDiv = (title, value) =>(
    <li>
        <p className="title">{title}</p>
        <p className="value">{value}</p>
    </li>
)




export default ListComponent;