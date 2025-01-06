
import { useNavigate} from "react-router-dom";


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
        </>        
    )

}

export default ModifyPage;

