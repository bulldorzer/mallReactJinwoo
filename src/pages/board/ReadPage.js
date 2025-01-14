<<<<<<< HEAD
import { useParams } from "react-router-dom";
import ReadComponent from "../../component/board/ReadComponent";


=======
import {useParams} from "react-router-dom";
import ReadComponent from "../../component/board/ReadComponent";

>>>>>>> fa190431953a709595b0e5ef86e612572f76395f
const ReadPage = () =>{

    const {bno} = useParams()

<<<<<<< HEAD
    return (
        <>
            <h3>ReadPage --- {bno}</h3>
=======
    return(
        <>
            <h3>ReadPage - {bno}</h3>
>>>>>>> fa190431953a709595b0e5ef86e612572f76395f
            <ReadComponent bno={bno}></ReadComponent>
        </>
    )
}
export default ReadPage;