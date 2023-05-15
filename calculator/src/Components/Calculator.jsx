import React from 'react';
import { useState } from 'react';
import "./Calculator.css";

const Calculator = () => {
 // This is to maintain the state of history;
  let [history,setHistory]=useState("");
  let [total1,setTotal1]=useState(0);
  // This is to maintain the show/hide status of the user's expression history 
  let [show,setShow]=useState(false);

  // This arr is used to loop through ;
  let arr=["C","+/-","%","/",7,8,9,"x",4,5,6,"-",1,2,3,"+",0,".","="];


  // handleCalucalation function- This function is used to calculate the total value of expressions pressed by user;
  
  const handleCalculation=(history_string)=>{
    
    // here symbols and numbers are separeted 

    let symbols=[]; let numbers=[]; let round="";
    for(let i=0;i<history_string.length;i++){
        let num=+(history_string[i]);
        // If it is number or "." means it will push to numbers array; else to symbols array;
        if(num || history_string[i]==="."){
            round+=history_string[i]; 
        }else{
            numbers.push(Number(round));
            round="";
            symbols.push(history_string[i]);
        }
    }
    numbers.push(Number(round));
    
    // Initial value of total;
    let total=numbers[0];

    // here totals are calculated based on the symbols by looping through the symbols array;

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
    
    setTotal1(total)
  }



 // To handle entity - here entity represents all items of array arr;
  const handleEntity=(e)=>{
    let selected=e.target.innerText;
    
    setHistory(history+selected);
    // Whenever user clicks on "=" it will call handleCalculation function to perform total ;
    if(selected==="="){
        let last=+(history[history.length-1]);
        // If the last expression is symbol means it will throw alert and resets everything;
        if(!last){
            setHistory("");
            setTotal1(0);
            alert("last expression should be a number");
        }else{
            // calls the handleCalculation function
            handleCalculation(history)
        }
        
    }else if(selected==="C"){
        // if user clicks "C" means it will clear everything
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