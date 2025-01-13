import BoardComponent from "../../component/board/BoardComponent";
import { useSearchParams } from "react-router-dom";

const BoardPage = () =>{

    const [queryParams] = useSearchParams()

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
    return (
        <>
            <h2>BoardPage...{page}</h2>
            <BoardComponent/>
        </>
    )
}
export default BoardPage;