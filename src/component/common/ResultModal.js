

//cbfn = callback function
const ResultModal = ({title, content, cbfn}) =>{

    const handleClick = () => {
        if(cbfn) cbfn()
    }

    return (
        <div
            onClick={handleClick}>
            <ul>
                <li>{title}</li>
                <li>{content}</li>
            </ul>
            <button className="btn" onClick={handleClick}>Close</button>
        </div>
    )
}
export default ResultModal;