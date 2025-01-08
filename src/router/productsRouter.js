import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProductsList from "../pages/products/ListPage"
import ProductsAdd from "../pages/products/AddPage"
import ProductsRead from "../pages/products/ReadPage"
import ModifyPage from "../pages/products/ModifyPage";


const Loading = <div>Loading...</div>


const todoRouter = () => {
    return [
        {
            path : "",
            element : <Navigate replace to="list"/>
        },
        {
            path : "list",
            element : <Suspense fallback={Loading}><ProductsList/></Suspense>
        },
        {
            path : "add",
            element : <Suspense fallback={Loading}><ProductsAdd/></Suspense>
        },
        {
            path : "read/:pno",
            element : <Suspense fallback={Loading}><ProductsRead/></Suspense>
        },
        {
            path : "modify/:pno",
            element : <Suspense fallback={Loading}><ModifyPage/></Suspense>
        }
    ]
}

export default todoRouter;