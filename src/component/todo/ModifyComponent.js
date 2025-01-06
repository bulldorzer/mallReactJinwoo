import { useEffect, useState } from "react"

const initState = {
    tno : 0,
    title : 'test',
    writer : 'test',
    dueDate : '2025-01-06',
    complete : false
}



const ModifyComponent = ({tno, moveList, moveRead}) =>{
    const [todo, setTodo] = useState({...initState})

    useEffect(()=>{
        console.log(tno);
    },[tno])

    const handleChangeTodo = (e) =>{
        const {name, value} = e.target
        setTodo((prevTodo)=>({...prevTodo, [name] : value}))
    }

    return(
        <>
        <div>
            {makeLi('Tno','tno',todo.tno,null,"text",true)}
            {makeLi('Writer','writer',todo.writer,null,"text",true)}
            {makeLi('Title','title',todo.title,handleChangeTodo)}
            {makeLi('Due Date','dueDate',todo.dueDate,handleChangeTodo,'date')}
            <li>
                <span>Complete</span>
                <span>
                    <label><input type="radio" name="status"/>Yes</label>
                    <label><input type="radio" name="status"/>No</label>
                </span>
            </li>
        </div>
        <div className="btnGrop">
            <button type="button" className="btn" onClick={()=>{}}>삭제</button>
            <button type="button" className="btn" onClick={()=>{}}>수정</button>
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