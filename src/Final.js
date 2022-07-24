import React from 'react'
import './Final.css'
export default function Final(props) {
  
  return (
    <div>
     <h1>Results--</h1> 
      {
        Object.keys(props.obj1).map(item=>{
            return(
          <>
            <div className={props.obj1[item]===true ? 'true1':'false1'}>{`${item} = ${props.obj1[item]}`}</div>
            </>
            )
         
        })


      }
    </div>
  )
}
