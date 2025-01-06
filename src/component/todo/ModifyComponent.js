import { useEffect, useState } from "react"
import useCustomMove from "../../hook/useCustomHook"
import ResultModal from "../common/ResultModal"
import { getOne, deleteOne, putOne } from "../../api/todoApi"
const initState = {
    tno : 0,
    title : '',
    writer : '',
    dueDate : '',
    complete : false
}



const ModifyComponent = ({tno}) =>{
    const [todo, setTodo] = useState({...initState})
    const {moveToList,moveToRead} = useCustomMove();
    const [showResult, setShowResult] = useState(null)
    

    useEffect(()=>{
        getOne(tno).then(data=>{
            setTodo(data)
        })
    },[tno])

    const handleClickModify = () =>{
        putOne(todo).then(data=>{
            console.log("modify result: " + data)
            setShowResult('Modify')
        })
    }
    const handleClickDelete = () =>{
        deleteOne(tno).then(data =>{
            console.log("delete result: " + data)
            setShowResult('Delete')
        })
    }

    const handleChangeTodo = (e) =>{
        const {name, value} = e.target
        setTodo((prevTodo)=>({...prevTodo, [name] : value}))
        console.log("e.target.value",e.target.value)
        console.log("todo.complete",todo.complete)
        
    }

    const closeModal = () =>{
        setShowResult(null)
    }

    return(
        <>
        {showResult && <ResultModal title={'처리결과'} content={showResult} cbfn={closeModal}/>}
        <ul>
            {makeLi('Tno','tno',todo.tno,null,"text",true)}
            {makeLi('Writer','writer',todo.writer,null,"text",true)}
            {makeLi('Title','title',todo.title,handleChangeTodo)}
            {makeLi('Due Date','dueDate',todo.dueDate,handleChangeTodo,'date')}
            <li>
                <span>Complete</span>
                <span>
                    <label><input type="radio" name="complete" value="true" onChange={handleChangeTodo} />Yes</label>
                    <label><input type="radio" name="complete" value="false" onChange={handleChangeTodo} />No</label>
                </span>
            </li>
        </ul>
        <div className="btnGrop">
            <button type="button" className="btn" onClick={handleClickDelete}>삭제</button>
            <button type="button" className="btn" onClick={handleClickModify}>수정</button>
        </div>
        </>
    )
}

// {return (<li>...</li>)  } 생략되어있음
// type은 설정 안할시 type으로 default 설정 
const makeLi = (title, name, value, onChange, type='text', readOnly = false) =>(
    <li>
        <span className="title">{title}</span>
        <input className="value" name={name} type={type} value={value} onChange={onChange} readOnly={readOnly}/>
    </li>
)


export default ModifyComponent;