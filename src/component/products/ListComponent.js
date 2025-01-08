import { useEffect, useState } from "react"
import { API_SERVER_PORT } from "../../api/todoApi"
import { getList } from "../../api/productsApi"
import ResultModal from "../common/ResultModal"
import useCustomMove from "../../hook/useCustomHook"
import FetchingModal from "../common/FetchingModal"
import PageComponent from "../common/PageComponent"

// 주소불러옴
const host = API_SERVER_PORT;

// 초기값 객체
const initData = {
    pno : 0,
    pname : 'Test',
    pdesc : 'Test',
    price : '2200',
    delFlag : false,
    keyword : ''
}

// 초기값 ...initData,{...initData,pno:1}
const initState = {
    dtoList : [], // 서버데이터가 여기에 들어옴
    pageNumList : [1,2,3,4,5],
    pageRequestDto : null,
    prev : false,
    next : false,
    totalCount : 2,
    prevPage : 0,
    nextPage : 0,
    totalPage : 1,
    current : 1
}
const ListComponent = () =>{
    const {page,size,refresh,moveToList,moveToRead} = useCustomMove()
    // const {page,size,moveToList : goToList} = useCustomMove() 함수이름 바꾸는 기법
    const [serverData,setServerData] = useState(initState);
    const [fetching,setFetching] = useState(false)
    
    /*
        1. 처음 실행할 때 한번만 무조건 실행
            - useEffect(()⇒{}.[])
        2. 해당값이 변경될때 마다, useEffect를 실행한다
            - useEffect(()⇒{}.[state1,state2])
        3. 리액트의 전반적인 흐름
            - state        effect         callback
            - 변경함 → 랜더링O, 동작O         함수 재생성O
            - 변경안됨 → 랜더링X, 동작X         함수 재생성X
    */
    useEffect( ()=>{
        setFetching(true)
        getList({page,size}).then( data=>{
          setServerData(()=> data ? data : initState)  
          setFetching(false)
          console.log(data)
        })
    },[page,size,refresh])


    // 서버에서 데이터 요청해서 가져오는 코드 추가 예정

    return(
        <>
        {fetching && <FetchingModal/>}
        <ul className="list">
            {serverData.dtoList.map(product =>(
                <li key={product.pno} onClick={()=>{moveToRead(product.pno)}}>
                    <p>{product.pno}</p>
                    <div>
                        <img
                            src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                            alt="product"
                            className=""
                        />
                    </div>
                    <p>이름 : {product.pname}</p>
                    <p>가격 : {product.price}</p>
                </li>
            ))}
        </ul>
        <PageComponent ServerData={serverData} movePage={moveToList}></PageComponent>
        </>
        
    )
}

// {return (<li>...</li>)  } 생략되어있음 
const makeDiv = (title, value) =>(
    <li>
        <p className="title">{title}</p>
        <p className="value">{value}</p>
    </li>
)




export default ListComponent;