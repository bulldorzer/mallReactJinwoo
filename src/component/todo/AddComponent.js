import { useState } from "react"
import ResultModal from "../common/ResultModal"

const initState = {
    tno : 0,
    title : '',
    writer : '',
    dueDate : ''
}



const AddComponent = () =>{
    const [todo, setTodo] = useState({...initState})
    const [showResult,setShowResult] = useState(null)

    const handleChangeTodo = (e) => {
        /* 
            todo[e.target.name] = e.target.value
            
            e = 이벤트 발생한 대상과 그에 관련된 모든 정보가 저장됨
            e.target = 이벤트가 발생한 그 element (Dom 요소, 해당 태그만 선택)
            태그안에 있는 속성(attribute) 값을 추출하려면? 
            e.target.name= title / e.target.value=''
            todo [] 괄호를 쓴 이유
            - 객체의 key값을 동적으로 설정하려고
        */

        const {name,value} = e.target; // input에서 name,value 추출
        // 최신 상태 todo 추출
        setTodo((prevTodo)=>({...prevTodo, [name] : value }))
        /*
            1. input에서 name,value값 추출
            2. 최신 todo 상태 추출
            3. {...prevTodo, [name] : value } - 해당 key값 추가 or 변경하여 새로운 객체 생성
            4. [key] : key값 동적 할당 위해 [] 사용
        */
        
    }

    const  handleClickAdd = (e) =>{
        console.log(todo);
        setShowResult(todo)
    }

    const closeModal = () =>{
        setShowResult(null)
    }

    return(
        <>
        {showResult && 
            <ResultModal 
            title="Add showResult" 
            content={`New ${showResult.tno} Added`} 
            cbfn={closeModal}
        />}
        <ul className="add">
            <li>
                <div>Title</div>
                <input name="title" type="text" value={todo.title} 
                onChange={handleChangeTodo}/>
            </li>
            <li>
                <div>Text</div>
                <input name="writer" type="text" value={todo.writer} onChange={handleChangeTodo}/>
            </li>
            <li>
                <div>DueDate</div>
                <input name="dueDate" type="date" value={todo.dueDate} onChange={handleChangeTodo}/>
            </li>
        </ul>
        <button type="button" className="btn" onClick={handleClickAdd}>ADD</button>
        </>
    )
}

export default AddComponent;