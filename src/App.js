import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import './css/App.css';

function App(){

    return(
       <RouterProvider router={root}/>
    )
}

export default App;