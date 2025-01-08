import { useCallback } from "react";
import BasicLayout from "../../layout/BasicLayout";
import { Outlet, useNavigate } from "react-router-dom";

const IndexPage = () =>{

    const navigate = useNavigate();
    const handleClickList = useCallback(()=>{
        navigate({pathname : 'list'})
    })
    const handleClickAdd = useCallback(()=>{
        navigate({pathname : 'add'})
    })
    const handleClickRead = useCallback(()=>{
        navigate({pathname : 'read/1'})
    })

    return(
        <BasicLayout> 
            {/* BasicLayout 에서 children 자리로 들어옴  BasicLayout태그로 감싸있는 태그들*/}
            <div className="menu">
                <button onClick={handleClickList}>LIST</button>
                <button onClick={handleClickAdd}>Add</button>
                <button onClick={handleClickRead}>Read</button>
            </div>
            <div className="products content"> 
                <Outlet/>
            </div>
        </BasicLayout>
    )
}

export default IndexPage;