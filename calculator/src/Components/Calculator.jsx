import React from 'react';
import { useState } from 'react';
import "./Calculator.css";

const Calculator = () => {
  let [history,setHistory]=useState("");
  let [total1,setTotal1]=useState(0);
  let [show,setShow]=useState(false);
  let arr=["C","+/-","%","/",7,8,9,"x",4,5,6,"-",1,2,3,"+",0,".","="];

  // handleCalucalation
  const handleCalculation=(history_string)=>{
    console.log(history_string,"his string");
    let symbols=[]; let numbers=[]; let round="";
    for(let i=0;i<history_string.length;i++){
        let num=+(history_string[i]);
        if(num){
            round+=history_string[i]; 
        }else{
            numbers.push(Number(round));
            round="";
            symbols.push(history_string[i]);
        }
    }
    numbers.push(Number(round));
    console.log(symbols,numbers,"symbols numbers");
    let total=numbers[0];
    for (let i=0;i<symbols.length;i++){
        switch(symbols[i]){
            case "+":
                total+=numbers[i+1];
                break;
            case "-":
                total-=numbers[i+1];
                break;
            case "x":
                console.log(numbers[i+1],total,"nummb tota")
                total*=numbers[i+1];
                break;
            case "/":
                total/=numbers[i+1];
                break;
            case "%":
                total%=numbers[i+1];
                break;
            default:
                break;
        }
    }
    console.log(total,"total");
    setTotal1(total)
  }



 // To handle entity - here entity represents all items of array arr;
  const handleEntity=(e)=>{
    let selected=e.target.innerText;
    
    setHistory(history+selected);
    console.log(history,"history");
    if(selected==="="){
        handleCalculation(history)
    }else if(selected==="C"){
        setHistory("");
        setTotal1(0);
    }
  }
  
  return (
    <div id="container">
        <h2>Calculator</h2>
        <p id={show?"history":"hide"} >{history}</p>
        <button onClick={()=>{setShow(!show)}}>{show?"Hide":"History"}</button>
        <h3> Total:- {total1}</h3>
        <div id="parent">
        {
            arr.map((item,ind)=>{
                return(
                    <div key={ind} className='entity' onClick={handleEntity}>{item}</div>
                )
            })
        }
        </div>
    </div>
  )
}

export default Calculator