import { useEffect, useState } from "react"
import { getOne, deleteOne, putOne } from "../../api/todoApi"

import useCustomMove from "../../hook/useCustomHook"
import ResultModal from "../common/ResultModal"
import LiItem from "../common/LiItem"

const initState = {
    tno : 0,
    title : '',
    writer : '',
    dueDate : '',
    complete : false
}

const ModifyComponent = ({tno}) =>{
    const [todo, setTodo] = useState({...initState}) // 스프레드로 객체 복제
    const {moveToList,moveToRead} = useCustomMove();
    const [result, setResult] = useState(null)
    

    useEffect(()=>{
        getOne(tno).then(data=>{
            setTodo(data)
        })
    },[tno])

    // () => 실행할 문장 // 리턴생략
    // () => 리턴될값; // 리턴생략
    // () => ({}) - // 리턴값이 객체 형태인 경우
    const handleChangeTodo = (e) =>{
        const {name, value} = e.target
        setTodo((prevTodo)=>({
            ...prevTodo, [name] : name =="complete" ? value === "true" : value
        }))
        // [name] : key값을 동기적 설정
        // name속성이 complete이면 value === "true"의 결과 값(true/false)를 저장
        // == : 값이 같은지 비교, === : 값과 자료형까지 비교
        // 책 174p 상단에 있음
    }
    const handleClickModify = () =>{
        putOne(todo).then(data=>{
            setResult('Modify')
        })
    }
    const handleClickDelete = () =>{
        deleteOne(tno).then(data =>{
            setResult('Deleted')
        })
    }

    const closeModal = () =>{
        if (result == 'Deleted') {
            moveToList()
        } else {
            moveToRead(tno)
        }
    }

    
    const fields = [
        {label : 'Writer', name : 'writer', value : todo.writer, type : 'text', readOnly : true},
        {label : 'Title', name : 'title', value : todo.title, onChange : handleChangeTodo},
        {label : 'Due Date', name : 'dueDate', value : todo.dueDate, onChange : handleChangeTodo, type : 'date'}
    ]

    return(
        <>
        {result && <ResultModal title={'처리결과'} content={result} cbfn={closeModal}/>}
        <ul className="modify item">
            {/* 
            {makeLi('Tno','tno',todo.tno,null,"text",true)}
            {makeLi('Writer','writer',todo.writer,null,"text",true)}
            {makeLi('Title','title',todo.title,handleChangeTodo)}
            {makeLi('Due Date','dueDate',todo.dueDate,handleChangeTodo,'date')} 
            */}
            {
                fields.map(field=>(
                    <LiItem key={field.name} {...field}/>
                ))
            }
            <li>
                <span className="labelWrap">Complete</span>
                <span className="dataWrap">
                    <label><input type="radio" name="complete" value="true" onChange={handleChangeTodo} checked={todo.complete==true} />Yes</label>
                    <label><input type="radio" name="complete" value="false" onChange={handleChangeTodo} checked={todo.complete==false}/>No</label>
                </span>
            </li>
        </ul>
        <div className="btnGroup">
            <button type="button" className="btn" onClick={handleClickDelete}>삭제</button>
            <button type="button" className="btn" onClick={handleClickModify}>수정</button>
        </div>
        </>
    )
}

// 컴포넌트
/*
const LiField = ({title,name,value,onChange, type ='text', readOnly = false}) =>(
    <li>
        <span className="labelWrap">{title}</span>
        <span className="dataWrap">
            <input 
                name={name} 
                type={type} 
                value={value} 
                onChange={onChange} 
                readOnly={readOnly}/>
        </span>
    </li>
)
*/

// {return (<li>...</li>)  } 생략되어있음
// type은 설정 안할시 type으로 default 설정 
/*
const makeLi = (title, name, value, onChange, type='text', readOnly = false) =>(
    <li>
        <span className="title">{title}</span>
        <input className="value" name={name} type={type} value={value} onChange={onChange} readOnly={readOnly}/>
    </li>
)
*/


export default ModifyComponent;