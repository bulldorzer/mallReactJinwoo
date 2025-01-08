

//cbfn = callback function
const ResultModal = ({title, content, cbfn}) =>{

    const handleClick = () => {
        if(cbfn) cbfn()
    }

    return (
        <div 
            className="result modal"
            onClick={handleClick}>
            
            <h2>{title}</h2>
            <p>{content}</p>
            <button className="btn" onClick={handleClick}>Close</button>
        </div>
    )
}
export default ResultModal;