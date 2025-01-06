import { Link } from "react-router-dom"

const PageConponent = ({ServerData, movePage}) =>{

    const movePrevPage = () =>{movePage({ page : ServerData.prevPage})} // 이전 페이지 블록 이동
    const moveNextPage = () =>{movePage({ page : ServerData.nextPage})} // 다음 페이지 블록이동
    return(
        <div className="pagination">
            {console.log("ServerData",ServerData)}
            {
                ServerData.prev && 
                <div onClick={movePrevPage}>Prev</div>
            }
            {
                ServerData.pageNumList.map(pageNum =>
                    <Link key={pageNum} 
                        onClick={ () =>movePage({ page : pageNum}) }
                        className="pageNum">
                        {pageNum}
                    </Link>
                )
            }
            {
                ServerData.next && <div onClick = {moveNextPage}>Next</div>
            }
        </div>
    )
}
export default PageConponent;