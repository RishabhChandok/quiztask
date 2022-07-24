import React, { useState ,useEffect, useRef } from 'react'
import Final from './Final';
import './StartQuiz1.css'
export default function StartQuiz1(props) {
    
    const generateRandomOperator=(arr)=>{
        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
    return item;
    }
    const[opt1,setopt1]=useState('');
    const[opr1,setopr1]=useState('');
    const[opr2,setopr2]=useState('');
    const[text,settext]=useState('');
    const[next,setnext]=useState(false);
    const[score,setScore]=useState(0);
    const[c1,setc1]=useState(0);
    const[result,setresult]=useState({})
    const ref1=useRef()
    
    const operator=['+','-','*','/'];
    useEffect(()=>{
        
        const score1=localStorage.getItem('score');
        const screen=localStorage.getItem('countscreen');
        const resultdata=JSON.parse(localStorage.getItem('result'));
        
        console.log(typeof resultdata,'resultdata')
        if(score1!==null){
            setScore(parseInt(score1));
        }
        if(screen!==null){
            setc1(parseInt(screen))
        } 
        if(resultdata!==null){
            setresult((result)=>({
                ...result,
                ...resultdata
            }))
        }
    },[]);
    useEffect(()=>{ 
       
        localStorage.setItem('score',score);
    },[score]);
    useEffect(()=>{
       
        localStorage.setItem('countscreen',c1)
    },[c1])
    useEffect(()=>{
localStorage.setItem('result',JSON.stringify(result));
    },[result])
    useEffect(() => {
       
       let timer=setTimeout(()=>{setnext(!next);setc1(c1+1)},10000);
        setopt1(generateRandomOperator(operator));
        setopr1(Math.floor(Math.random() * (props.random - 1 + 1)) + 1);
        setopr2(Math.floor(Math.random() * (props.random - 1 + 1)) + 1);
        return ()=>{
            clearTimeout(timer)
        }
    },[next]);

const next1=()=>{
    const obj={};
        if(eval(`${opr1}${opt1}${opr2}`)==ref1.current.value){
                 
            obj[`${opr1}${opt1}${opr2}`]=true;
            setresult((result)=>({
                ...result,
                ...obj
            }))
            setScore(score+1);         
        }  else{
            obj[`${opr1}${opt1}${opr2}`]=false;
            setresult((result)=>({
                ...result,
                ...obj
            }))
        }
        
        setc1(c1+1);
        setnext(!next);
 }   
    const setvalue=(e)=>{
        settext(e.target.value);
    }
   const reset=()=>{
    console.log('reset')
    setScore(0);
    setc1(0);
}
  return (
    <div>
        <h2>Score : {score}</h2>
        <div className={c1>parseInt(props.countquestion)?'hide21':''} style={{backgroundColor:'grey',height:'500px',width:'500px'}}>
        <div >
        {
        <span className='span1'>{opr1} {opt1} {opr2}</span>
        }
        </div>
        <div>
            <input className='input1' value={text} ref={ref1} onChange={(e)=>setvalue(e)}  type='text'></input>
        </div> 
        <div style={{display:'flex',justifyContent:'space-around',position:'relative',top:'290px'}}>
        <button  onClick={next1} >Next Question</button>
        <button   onClick={reset}>reset</button>
        </div>
        
    </div>
    {c1>parseInt(props.countquestion) && <Final obj1={result}></Final>}
    </div>
  )
}
