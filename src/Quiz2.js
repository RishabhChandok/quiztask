import {React,useState,useEffect} from 'react'
import './Quiz1.css'
import StartQuiz2 from './StartQuiz2'
export default function Quiz2() {
  const[quiz1,setQuiz1]=useState(false)
    const[range11,setRange1]=useState('')
    const[que1,setQue1]=useState('')

    useEffect(()=>{
      const check1=localStorage.getItem('start1');
      const rangeint1=localStorage.getItem('range1');
      const queint1=localStorage.getItem('que1');
      if(check1==='true'){
        setQuiz1(Boolean(check1));}
      if(rangeint1?.length>0) setRange1(rangeint1);
      if(queint1?.length>0) setQue1(queint1);
    },[])
    useEffect(()=>{
     console.log(range11.length,'range11')
      localStorage.setItem('range1',range11);
    },[range11])
    useEffect(()=>{
      localStorage.setItem('que1',que1)
    },[que1])
    useEffect(()=>{
      localStorage.setItem('start1',quiz1);
    },[quiz1])
    const ab=()=>{
        setQuiz1(true)     
    }  
  const selectRange=(e)=>{
    setRange1(e.target.value)
  }
  const noQuestion=(e)=>{   
      setQue1(e.target.value)
  }
  return (
    <div style={{height:'100vh',width:'50%',backgroundColor:'lightblue',display:'flex',justifyContent:'center',alignItems:'center'}}>
       <div className={quiz1===true ? 'hide1' :''}>
          <div>
        <input className='input12'  value={range11} type='text' placeholder='select number from 10 to 15' onChange={(e)=>{selectRange(e)}}></input>
        </div>
        <div>
        <input className='input12' value={que1} type='text' placeholder='how many question you want ' onChange={(e)=>{noQuestion(e)}}></input>
        </div>
        <button onClick={ab} style={{height:'20px'}}>Start Quiz2</button>
        </div>
        <div>{quiz1===true && range11.length>0 && que1.length>0 && <StartQuiz2 random={range11} countquestion={que1}></StartQuiz2>}</div>
        </div>
        
  )
}
