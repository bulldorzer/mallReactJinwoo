import { useParams } from "react-router-dom";
import ReadComponent from "../../component/board/ReadComponent";


const ReadPage = () =>{

    const {bno} = useParams()

    return (
        <>
            <h3>ReadPage --- {bno}</h3>
            <ReadComponent bno={bno}></ReadComponent>
        </>
    )
}
export default ReadPage;