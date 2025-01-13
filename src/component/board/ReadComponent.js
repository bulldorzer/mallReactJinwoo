import { useEffect, useState } from "react";
import { getOne } from "../../api/boardApi";
import useCustomMove from "../../hook/useCustomMove";
import LiItem from "../common/LiItem"


const initState = {
    bno: 0,
    title : "",
    writer : "",
    visitCount: 0,
    postDate:""
}

const ReadComponent = ({bno}) =>{

    const [post,setPost] = useState(initState)

    useEffect(()=>{
        getOne(bno).then(data=>{
            setPost(()=>data?data:initState)
        }).catch((err)=>{
            console.log("ReadBoard Err: ",err)
            setPost(initState)
        })
    },[bno])

    const {moveToList, moveToModify} = useCustomMove();

    const fields = [
        {label : 'Title', name : 'title' },
        {label : 'Writer', name : 'writer'},
        {label : 'View Count', name : 'viewCount'},
        {label : 'Post Date', name : 'postDate'}
    ]
    
    return(
        <>
            <ul className="read item">
                {
                    fields.map(({label, name})=> {
                        
                        let data = post[name] || "";

                        return (
                            <LiItem 
                                key={name}  
                                label={label}
                                name={name}
                                value={data}
                                readOnly={true}
                            />
                    )}) 
                }
                <li className="readOnly">
                    <span className="labelWrap">내용</span>
                    <span className="dataWrap">
                        <textarea name="content" value={post.content} readOnly={true}></textarea>
                    </span>
                </li>
            </ul>
            <div className="btnGroup">
            <button type="button" className="btn" onClick={()=>{moveToList()}}>목록</button>
            <button type="button" className="btn" onClick={()=>{moveToModify(tno)}}>수정</button>
        </div>
        </>
    )
}
export default ReadComponent;