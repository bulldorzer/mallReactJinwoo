import { useState } from "react"
// import {getOne} from '../../api/todoApi'
import useCustomMove from "../../hook/useCustomHook"
import PageConponent from "../common/PageConponent"

// 초기값 객체
const initData = {
    tno : 0,
    title : 'Test',
    writer : 'Test',
    dueDate : '2025-01-02',
    complete : false
}
// 초기값 객체
const initState = {
    dtoList : [initData,initData], // 서버데이터가 여기에 들어옴
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
    const {page,size,moveToList} = useCustomMove()
    const [serverData,setServerData] = useState(initState);

    // 서버에서 데이터 요청해서 가져오는 코드 추가 예정

    return(
        <>
        <ul className="list">
            {
                serverData.dtoList.map((todo,i) =>( // 배열로 데이터가 들어옴
                    <li key={i} className="">
                        <span>{todo.tno}</span>
                        <span>{todo.title}</span>
                        <span>{todo.dueDate}</span>
                    </li>
                ))
            }
        </ul>
        <PageConponent ServerData={serverData} movePage={moveToList}></PageConponent>
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