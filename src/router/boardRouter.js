import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const Board = lazy(()=>import("../pages/board/BoardPage"))
const BoardAdd = lazy(()=>import("../pages/board/AddPage"))
const BoardRead = lazy(()=>import("../pages/board/ReadPage"))
<<<<<<< HEAD
const BoardModify = lazy(()=>import("../pages/board/ModifyPage"))
=======
>>>>>>> fa190431953a709595b0e5ef86e612572f76395f

const boardRouter = () =>{
    return [
        {
            path : "",
            element : <Navigate replace to ="list"/>
        },
        {
            path : "list",
            element : <Suspense fallback={Loading}><Board/></Suspense>
        },
        {
            path : "add",
            element : <Suspense fallback={Loading}><BoardAdd/></Suspense>
        },
        {
            path : "read/:bno",
            element : <Suspense fallback={Loading}><BoardRead/></Suspense>
<<<<<<< HEAD
        },
        {
            path : "modify/:bno",
            element : <Suspense fallback={Loading}><BoardModify/></Suspense>
=======
>>>>>>> fa190431953a709595b0e5ef86e612572f76395f
        }
    ]

}
export default boardRouter;