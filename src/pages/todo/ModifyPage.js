
import { useNavigate} from "react-router-dom";
import ModifyComponent from "../../component/todo/ModifyComponent";


const ModifyPage = ({tno}) => {

    const navigate = useNavigate()
        
    const moveToRead = ()=>{ // read 화면 이동
        navigate( { pathname : `/todo/read/${tno}` } )
    }

    const moveToList = ()=>{ // 리스트 화면 이동
        navigate( { pathname : `/todo/list`} )
    }

    return(
        <>
            <h3>Todo Modify Page...</h3>
            <ModifyComponent/>
        </>        
    )

}

export default ModifyPage;

