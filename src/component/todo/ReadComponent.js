import { useEffect, useState } from "react"
import { getOne } from "../../api/todoApi"
import useCustomMove from "../../hook/useCustomMove"
import LiItem from "../common/LiItem"

// 초기값 객체
const initState = {
    tno : 0,
    title : 'Test',
    writer : 'Test',
    dueDate : null,
    complete : false
}
const ReadComponent = ({tno}) =>{
    const [todo,setTodo] = useState(initState)
    // useCustomMove 컴포넌트 안에 있는 함수들 호출 

    useEffect(()=>{
        getOne(tno).then(data=>{
            setTodo(data)
        })
    },[tno])
    
    const {moveToList,moveToModify} = useCustomMove();
    
    const fields = [
        {label : 'Title',name : 'title'},
        {label : 'Writer',name : 'writer'},
        {label : 'Due Date',name : 'dueDate'},
        {label : 'Complete',name : 'complete'}
        
    ]

    return(
        <>
        <ul className="read item">
            {/* 
            {makeDiv('Tno',todo.tno)}
            {makeDiv('Writer',todo.writer)}
            {makeDiv('Title',todo.title)}
            {makeDiv('Due Date',todo.dueDate)}
            {makeDiv('Complete',todo.complete?'Complete' : 'Not Yet')} 
            */}
            {
                fields.map(({label,name})=>{
                    let data = todo[name]
                    if (name == "complete") {
                        data = todo['complete'] ? 'Complete' : 'Not Yet'
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
        </ul>
        <div className="btnGroup">
            <button type="button" className="btn" onClick={()=>{moveToList()}}>목록</button>
            <button type="button" className="btn" onClick={()=>{moveToModify(tno)}}>수정</button>
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