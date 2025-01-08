
import { useNavigate, useParams} from "react-router-dom";
import ModifyComponent from "../../component/products/ModifyComponent";

// todo/read/104?page=1&size=10
// useParams : 104(파라미터값)
// useSearchParams : 쿼리스트링 추출 page, size값을 추출
const ModifyPage = () => {

    const {pno} = useParams() // url에서 tno 추출
    // const navigate = useNavigate()
        
    // const moveToRead = ()=>{ // read 화면 이동 하라고 명령하는 navigate 
    //     navigate( { pathname : `/todo/read/${tno}` } )
    // }

    // const moveToList = ()=>{ // 리스트 화면 이동
    //     navigate( { pathname : `/todo/list`} )
    // }

    return(
        <>
            <h3>Todo Modify Page...</h3>
            <ModifyComponent pno={pno}/>
        </>        
    )

}

export default ModifyPage;

