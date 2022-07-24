import React, { useEffect, useState } from 'react'
import StartQuiz1 from './StartQuiz1'
import './Quiz1.css'
export default function Quiz1() {
    const[quiz,setQuiz]=useState(false)
    const[range1,setRange]=useState('')
    const[que,setQue]=useState('')

    useEffect(()=>{
      const check=localStorage.getItem('start');
      const rangeint=localStorage.getItem('range');
      const queint=localStorage.getItem('que');
      if(check==='true'){
        setQuiz(Boolean(check));}
      if(rangeint?.length>0) setRange(rangeint);
      if(queint?.length>0) setQue(queint);
    },[])
    useEffect(()=>{
     console.log(range1.length,'range11')
      localStorage.setItem('range',range1);
    },[range1])
    useEffect(()=>{
      localStorage.setItem('que',que)
    },[que])
    useEffect(()=>{
      localStorage.setItem('start',quiz);
    },[quiz])
    const ab=()=>{
        setQuiz(true)     
    }  
  const selectRange=(e)=>{
    setRange(e.target.value)
  }
  const noQuestion=(e)=>{   
      setQue(e.target.value)
  }
  return (
    <div className='container'>
      
        <div className={quiz===true ? 'hide1' :''}>
          <div>
        <input className='input12'  value={range1} type='text' placeholder='select number from 10 to 15' onChange={(e)=>{selectRange(e)}}></input>
        </div>
        <div>
        <input className='input12' value={que} type='text' placeholder='how many question you want ' onChange={(e)=>{noQuestion(e)}}></input>
        </div>
        <button onClick={ab} style={{height:'20px'}}>Start Quiz1</button>
        </div>
        <div>{quiz===true && range1.length>0 && que.length>0 && <StartQuiz1 random={range1} countquestion={que}></StartQuiz1>}</div>
        </div>
  )
}
