import { useNavigate, useSearchParams,Outlet } from "react-router-dom";
import { useCallback } from "react";
import BasicLayout from "../../layout/BasicLayout";



const IndexPage = () =>{

    const navigate = useNavigate();

    const handleClickList = useCallback(()=>{
        navigate({pathname : ''})
    })

    // const handleClickAdd = useCallback(()=>{
    //     navigate({pathname : 'add'})
    // })

    return(
        <BasicLayout>
            {/* BasicLayout 에서 children 자리로 들어옴  BasicLayout태그로 감싸있는 태그들*/}
            <div className="menu">
                <button onClick={handleClickList}>LIST</button>
                {/* <button onClick={handleClickAdd}>Add</button> */}
            </div>
            <div className="todo content"> 
                <Outlet/>
            </div>
        </BasicLayout>
    )
}
export default IndexPage;