import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화

import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";

const Loading = <div>Loding...</div>
// 렌더링 전까지는 다운로드 하지 X 
const Main = lazy(()=> import( "../pages/MainPage"))
const About = lazy(()=> import( "../pages/AboutPage"))
const TodoIndex = lazy(()=> import( "../pages/todo/IndexPage"))
const ProductsIndex = lazy(()=> import( "../pages/products/IndexPage"))


const root = createBrowserRouter([
    {
        path : "",
        element : <Suspense fallback={Loading}><Main/></Suspense>
    }, 
    {
        path : "about",
        element : <Suspense fallback={Loading}><About/></Suspense>
    }, 
    {
        path : "todo",
        element : <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        children : todoRouter()
    },
    {
        path : "products",
        element : <Suspense fallback={Loading}><ProductsIndex/></Suspense>,
        children : productsRouter()
    }  

    // localhost:3000/todo/list
    // localhost:3000/todo/add

])

export default root;