import React from 'react'
import { useState } from 'react'
import { evaluate, derivative,factorial } from 'mathjs'
import { Button, Container, Table } from '@mui/material';
import {
    Chart as chartjs,
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement
    } from 'chart.js';
    import {Line} from 'react-chartjs-2';
    chartjs.register(
        CategoryScale,
        LineElement,
        LinearScale,
        PointElement
    )
    const Secant =()=>{
        const data =[];
        const [valueIter, setValueIter] = useState([]);
        const [valueX1, setValueX1] = useState([]);
        const [valueX0, setValueX0] = useState([]);
        const [valueE, setValueE] = useState([]);
        const [html, setHtml] = useState(null);
        const [Equation,setEquation] = useState("(x^4)-13")
        const [X,setX] = useState(0)
        const [X1,setX1] = useState(0)
        const [X0,setX0] = useState(0)
        const print = () =>{
            console.log(data)
            setValueIter(data.map((x)=>x.iteration));
            setValueX1(data.map((x)=>x.X1));
            setValueX0(data.map((x)=>x.X0));
            setValueE(data.map((x)=>x.E));
            return(
                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th width="10%">Iteration</th>
                                <th width="30%">X1</th>
                                <th width="30%">X0</th>
                                <th width="30%">E</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, index)=>{
                                return  (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.X1}</td>
                                    <td>{element.X0}</td>
                                    <td>{element.E}</td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Container>
               
            );
        }
    
        const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
       
        const Calbisection = (x1, x0) => {
            let fx0, fx1, xNew, ea, scope;
            let iter = 0;
            let MAX = 50;
            const e = 0.00001;
            var obj={};
            do {
                scope = {
                    x: x0,
                }
                fx0 = evaluate(Equation, scope)
                scope = {
                    x: x1,
                }
                fx1 = evaluate(Equation, scope)
                xNew=x1-(fx1*(x0-x1))/(fx0-fx1);
                iter++;
                    ea = error(x1, xNew);
                    obj = {
                        iteration: iter,
                        X1: xNew,
                        X0: x1,
                        E: ea,
                    }
                    data.push(obj)
                    x0 = x1;
                    x1 = xNew;
            } while (ea > e && iter < MAX)
            setX(x1)
        }
     
        
    
        const inputEquation = (event) =>{
            console.log(event.target.value)
            setEquation(event.target.value)
        }
    
        const inputXL = (event) =>{
            console.log(event.target.value)
            setX1(event.target.value)
        }
    
        const inputXR = (event) =>{
            console.log(event.target.value)
            setX0(event.target.value)
        }
    
        const calculateRoot = () =>{
            const x1num = parseFloat(X1)
            const x0num = parseFloat(X0)
            Calbisection(x1num,x0num);
         
            setHtml(print());
               
            console.log(valueIter)
            console.log(valueX1)
        }
        const options = {
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: true,
                    }
                },
                y: {
                    display: true,
                    ticks: {
                        stepSize: 0.000001,
                        suggestedMin: 0,
    
                    }
    
                },
            },
    
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    
        const errorGraph = {
            labels: valueIter,
            datasets: [
                {
                    label: 'ERROR',
                    data: valueE,
                    borderColor: '#540804',
                    backgroundColor: '#ad2e24',
                },
            ],
        }
    
        const XMGraph = {
            labels: valueIter,
            datasets: [
                {
                    label: 'XM',
                    data: valueX1,
                    borderColor: '#540804',
                    backgroundColor: '#ad2e24',
                },
            ],
        }
    
        return (
                <Container>
                    <form >
                        <form className="mb-3">
                        <form>Input f(x)</form>
                            <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                            <form>Input XL</form>
                            <input type="number" id="X1" onChange={inputXL} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                            <form>Input XR</form>
                            <input type="number" id="X0" onChange={inputXR} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        </form>
                        <Button variant="dark" onClick={calculateRoot}>
                            Calculate
                        </Button>
                    </form>
                    <br></br>
                    <h5>Answer = {X.toPrecision(4)}</h5>
                    <Container>
                    {html}
                    </Container>
                    <div className="container bisection-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Error graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={errorGraph} />
                    </div>
                    <div className="container bisection-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>XM graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={XMGraph} />
                    </div>   
                </Container>
                
               
        )
        
    }
export default Secant