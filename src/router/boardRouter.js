import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const Board = lazy(()=>import("../pages/board/BoardPage"))
const BoardAdd = lazy(()=>import("../pages/board/AddPage"))

const boardRouter = () =>{
    return [
        {
            path : "",
            element : <Navigate replace to ="list"/>
        },
        {
            path : "list",
            element : <Suspense fallback={Loading}><Board/></Suspense>
        }
        ,
        {
            path : "add",
            element : <Suspense fallback={Loading}><BoardAdd/></Suspense>
        }
    ]

}
export default boardRouter;