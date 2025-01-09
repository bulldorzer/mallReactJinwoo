import { useEffect, useState } from "react";
import BasicLayout from "../layout/BasicLayout";

function AboutPage (){

    /*
     input + state 같이 사용할 때 (state값을 input에 실시간 반영하고 싶을때) 
     onchange 이벤트 = 값을 실시간으로 업데이트해서 반영하는 함수를 작성해라
     */
    const [pno,setPno] = useState(0)
    const [obj,setObj] = useState({name : "홍길동", age : 20})
    const [arr,setArr] = useState([0,0,0])
    const handleChange = (e) =>{
        const {name, value} = e.target
        setPno(()=> value) // 매개변수 : 최신 state 상태
        setObj((prevData)=>{
            return { ...prevData, [name] : value}
            // ...preData : 객체 값들 펼치기
            // [name] : value => 새로운 값을 대입하거나 또는 기존에 있던 데이터를 덮어씌우거나
        })

        /*
        setObj((prevData)=>{
            const copy = {...prevData}
            copy[name] = value ; // 줄이면 { ...prevData, [name] : value}
            return copy
            // ...preData : 객체 값들 펼치기
            // [name] : value => 새로운 값을 대입하거나 또는 기존에 있던 데이터를 덮어씌우거나
        })
        */
       /*
        배열함수 
        push() - 마지막 추가, 
        unshift()- 첫번째 추가 
        splice() : 특정위치에 추가
        splice ( 삽입할 인덱스위치, 삭제할갯수,삽입할 값들) 
        setArr(([preData])=>{
            const copy = [...arr]
            copy[index] = value ; 
            return copy

            preData.map((item,i)=>{return(i==index ? value : item)})
       })
       */            
    }
    useEffect(()=>{
        /*
            컴포넌트 생성(마운트) 될때, 의존성배열(state, 파라미터)의 값이 바뀔때 --> 실행
            clean up 함수 - return()=>{} 구문이 있다면 컴포넌트 소멸(언마운트)될 때, 값이 바뀌어서 useEffect가 실행되기 직전에 (기존에 실행한 작업 청소) 실행됨
        */
            const timer = setInterval(() => {
                console.log(`${pno} 0.5초마다 실행, 무한반복`)
            }, 3000);
            
            // 콜백함수
            return  ()=>{
                clearInterval(timer)
            }
    },[pno])
    return(
        <BasicLayout>
            <div className="mainPage">
                <h2>About Page</h2>
                <p>값<input value={pno} onChange={handleChange}/></p>
                <p>이름<input name="title" value={obj.title} onChange={handleChange}/></p>
                <p>나이<input name="age" value={obj.age} onChange={handleChange}/></p>
                {/* <input value={pno} onChange={handleChange}/> */}
            </div>
        </BasicLayout>
    )

}

export default AboutPage;

