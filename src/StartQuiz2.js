import React, { useState ,useEffect, useRef } from 'react'
import Final from './Final';
import './StartQuiz1.css'
export default function StartQuiz2(props) {
    
    const generateRandomOperator=(arr)=>{
        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
    return item;
    }
    const[opt11,setopt11]=useState('');
    const[opr11,setopr11]=useState('');
    const[opr21,setopr21]=useState('');
    const[text1,settext1]=useState('');
    const[next1,setnext1]=useState(false);
    const[score1,setScore1]=useState(0);
    const[c11,setc11]=useState(0);
    const[result1,setresult1]=useState({})
    const ref11=useRef()
    
    const operator=['+','-','*','/'];
    useEffect(()=>{
        
        const score11=localStorage.getItem('score1');
        const screen1=localStorage.getItem('countscreen1');
        const resultdata1=JSON.parse(localStorage.getItem('result1'));
        
        console.log(typeof resultdata1,'resultdata')
        if(score11!==null){
            setScore1(parseInt(score11));
        }
        if(screen1!==null){
            setc11(parseInt(screen1))
        } 
        if(resultdata1!==null){
            setresult1((result1)=>({
                ...result1,
                ...resultdata1
            }))
        }
    },[]);
    useEffect(()=>{ 
       
        localStorage.setItem('score1',score1);
    },[score1]);
    useEffect(()=>{
       
        localStorage.setItem('countscreen1',c11)
    },[c11])
    useEffect(()=>{
localStorage.setItem('result1',JSON.stringify(result1));
    },[result1])
    useEffect(() => {
       
       let timer1=setTimeout(()=>{setnext1(!next1);setc11(c11+1)},10000);
        setopt11(generateRandomOperator(operator));
        setopr11(Math.floor(Math.random() * (props.random - 1 + 1)) + 1);
        setopr21(Math.floor(Math.random() * (props.random - 1 + 1)) + 1);
        return ()=>{
            clearTimeout(timer1)
        }
    },[next1]);

const next21=()=>{
    const obj1={};
        if(eval(`${opr11}${opt11}${opr21}`)==ref11.current.value){
                 
            obj1[`${opr11}${opt11}${opr21}`]=true;
            setresult1((result1)=>({
                ...result1,
                ...obj1
            }))
            setScore1(score1+1);         
        }  else{
            obj1[`${opr11}${opt11}${opr21}`]=false;
            setresult1((result1)=>({
                ...result1,
                ...obj1
            }))
        }
        
        setc11(c11+1);
        setnext1(!next1);
 }   
    const setvalue=(e)=>{
        settext1(e.target.value);
    }
   const reset=()=>{
    console.log('reset')
    setScore1(0);
    setc11(0);
}
  return (
    <div>
        <h2>Score-{score1}</h2>
        <div className={c11>parseInt(props.countquestion)?'hide21':''} style={{backgroundColor:'grey',height:'500px',width:'500px'}}>
        <div >
        {
        <span className='span1'>{opr11} {opt11} {opr21}</span>
        }
        </div>
        <div>
            <input className='input1' value={text1} ref={ref11} onChange={(e)=>setvalue(e)}  type='text'></input>
        </div> 
        <div style={{display:'flex',justifyContent:'space-around',position:'relative',top:'290px'}}>
        <button  onClick={next21} >Next Question</button>
        <button   onClick={reset}>reset</button>
        </div>
    </div>
    {c11>parseInt(props.countquestion) && <Final obj1={result1}></Final>}
    </div>
  )
}
