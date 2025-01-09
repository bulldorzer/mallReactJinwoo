import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "../pages/member/LoginPage";



const Loading = <div>Loading...</div>


const memberRouter = () => {
    return [
        {
            path : "",
            element : <Navigate replace to="login"/>
        },
        {
            path : "login",
            element : <Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path : "logout",
            element : <Navigate replace to="login"/>
        }
        // {
        //     path : "read/:pno",
        //     element : <Suspense fallback={Loading}><ProductsRead/></Suspense>
        // },
        // {
        //     path : "modify/:pno",
        //     element : <Suspense fallback={Loading}><ModifyPage/></Suspense>
        // }
    ]
}

export default memberRouter;