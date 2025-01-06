const PageConponent = ({ServerData, movePage}) =>{

    const movePrevPage = () =>{movePage({ page : ServerData.prevPage})}
    const moveNextPage = () =>{movePage({ page : ServerData.nextPage})}
    return(
        <div>
            {
                ServerData.prev && 
                <div onClick={movePrevPage}>Prev</div>
            }
            {
                ServerData.pageNumList.map(pageNum =>
                    <span key={pageNum} 
                        onClick={ () =>movePage({ page : pageNum}) }
                        className="pageNum">
                        {pageNum}
                    </span>
                )
            }
            {
                ServerData.next && <div onClick = {moveNextPage}>Next</div>
            }
        </div>
    )
}
export default PageConponent;