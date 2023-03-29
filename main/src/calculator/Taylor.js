import React from 'react'
import { useState } from 'react'
import { evaluate, derivative,factorial } from 'mathjs'

export default function Taylor() {
    const [equation, setEquation] = useState();
    const [x0, setX0] = useState();
    const [x, setX] = useState();
    const [n, setN] = useState();
    const [table, setTable] = useState();
    const [ans, setAns] = useState("");



    function calculate(){
        let f;
        let ans;
        let count = parseInt(n);
        let all_ans = [];
        let temp_table;
        
        for(var i = 0;i<count;i++){  
            if(i === 0){
                f = evaluate(equation,{x:x0});
                ans = f;
            }
            else{
                setEquation((derivative(equation,'x')).toString());
                f = evaluate(equation,{x:x0});
                let eq = evaluate("(x-x0)",{x0:x0,x:x});
                eq = Math.pow(eq,i)/factorial(i);
                ans = ans + f * eq;   
            }
            all_ans.push(ans);
        }
        
        temp_table = all_ans.map((ans,index) => {
            return <tr>
                <td>{index+1}</td>
                <td>{ans}</td>
            </tr>
        })
        setTable(temp_table);
        setAns(ans);
    }

 
  return (
    <div className='container'>
            <h1></h1>
            <div className='container'>
                <p><label className='form-label'>Equation</label>
                <input type="text" className='form-control' value={equation} onChange={e => setEquation(e.target.value)} /></p>
                <p><label className='form-label'>x0</label>
                <input type="text" className='form-control' value={x0} onChange={e => setX0(e.target.value)} /></p>
                <p><label className='form-label'>x</label>
                <input type="text" className='form-control' value={x} onChange={e => setX(e.target.value)} /></p>
                <p><label className='form-label'>n</label>
                <input type="text" className='form-control' value={n} onChange={e => setN(e.target.value)} /></p>
                <button type="submit" className='btn btn-primary' onClick={calculate}>Submit</button>
            </div>
        <div className='container'>
            <h5>Answer: {ans} </h5>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>

        </div>
    </div>
  )
}