import { useState } from "react"
import { postAdd } from "../../api/todoApi"
import ResultModal from "../common/ResultModal"
import LiItem from "../common/LiItem"
import useCustomHook from "../../hook/useCustomHook"

const initState = {
    title : '',
    writer : '',
    dueDate : ''
}



const AddComponent = () =>{
    const [todo, setTodo] = useState({...initState})
    const [showResult,setShowResult] = useState(null)

    const {moveToList} = useCustomHook()

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
        postAdd(todo).then(result =>{ // 통신 성공시 {'RESULT' = 'SUCCESS'}
            setTodo({...initState})
            setShowResult(result.TNO) // = true 모달 보임 결과값 표시
            // controller에서 리턴되는 키값에 의해 결정됨
            /*
                @PostMapping("/")
                public Map<String, Long> register(@RequestBody TodoDTO todoDTO){
                    log.info("TodoDTO : "+ todoDTO);

                    Long tno = service.register(todoDTO);
                    return Map.of("TNO", tno);
                }
            */
        }).catch(e=>{
            console.error(e)
        })
        setShowResult(todo)
    }

    const closeModal = () =>{
        setShowResult(null)
    }

    const fields = [
        {label : 'Writer', name : 'writer'},
        {label : 'Title', name : 'title'},
        {label : 'Due Date', name : 'dueDate', type : 'date'}
    ]

    return(
        <>
        {showResult && 
            <ResultModal 
            title="Add showResult" 
            content={`New ${showResult} Added`} 
            cbfn={closeModal}
        />}
        <ul className="add item">
            {
                fields.map(({label, name, type})=>{
                    return(
                        <LiItem  
                        key={name}
                        label = {label} 
                        name = {name}
                        type={type}
                        value={todo[name]}
                        onChange={handleChangeTodo}  
                         /> // onChange 핸들러 전달
                    )
                })
                /*
                fields.map(({label,type,name})=>(
                    <li>
                        <span className="labelWrap"><label>{label}</label></span>
                        <span className="dataWrap">
                            <input 
                                type={type}
                                name={name}
                                value={todo[name]}
                                onChange={handleChangeTodo}
                            ></input>
                        </span>
                    </li>
                ))
                */
            }
            {/*
            <li>
                <label>Title</label>
                <input name="title" type="text" value={todo.title} 
                onChange={handleChangeTodo}/>
            </li>

             <li>
                <label>Text</label>
                <input name="writer" type="text" value={todo.writer} onChange={handleChangeTodo}/>
            </li>
            <li>
                <label>DueDate</label>
                <input name="dueDate" type="date" value={todo.dueDate} onChange={handleChangeTodo}/>
            </li> 
            */}
        </ul>
        <div className="btnGroup">
            <button type="button" className="btn" onClick={()=>{moveToList()}}>목록</button>
            <button type="button" className="btn" onClick={handleClickAdd}>등록</button>
        </div>
        </>
    )
}

// 컴포넌트
/*
const LiField = ({label, type = 'text', name, todo, onChange}) =>(
    <li>
        <span className="labelWrap"><label>{label}</label></span>
        <span className="dataWrap">
            <input 
                type={type}
                name={name}
                value={todo[name]}
                onChange={onChange}
            ></input>
        </span>
    </li>
)
*/    


export default AddComponent;