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
    const bisection =()=>{
        const print = () =>{
            console.log(data)
            setValueIter(data.map((x)=>x.iteration));
            setValueXl(data.map((x)=>x.Xl));
            setValueXm(data.map((x)=>x.Xm));
            setValueXr(data.map((x)=>x.Xr));
            setValueE(data.map((x)=>x.E));
            return(
                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th width="10%">Iteration</th>
                                <th width="30%">XL</th>
                                <th width="30%">XM</th>
                                <th width="30%">XR</th>
                                <th width="30%">E</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, index)=>{
                                return  (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.Xl}</td>
                                    <td>{element.Xm}</td>
                                    <td>{element.Xr}</td>
                                    <td>{element.E}</td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Container>
               
            );
        }
    
        const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
       
        const Calbisection = (xl, xr) => {
            var xm,fXm,fXr,ea,scope,E;
            var iter = 0;
            var MAX = 50;
            const e = 0.00001;
            var obj={};
            do
            {
                xm = (xl+xr)/2.0;
                scope = {
                    x:xr,
                }
                fXr = evaluate(Equation, scope)
    
                scope = {
                    x:xm,
                }
                fXm = evaluate(Equation, scope)
    
                iter ++;
                if (fXm*fXr > 0)
                {
                    ea = error(xr, xm);
                    obj = {
                        iteration:iter,
                        Xl:xl,
                        Xm:xm,
                        Xr:xr,
                        E:ea,
                    }
                    data.push(obj)
                    xr = xm;
                }
                else if (fXm*fXr < 0)
                {
                    ea = error(xl, xm);
                    obj = {
                        iteration:iter,
                        Xl:xl,
                        Xm:xm,
                        Xr:xr
                    }
                    data.push(obj)
                    xl = xm;
                }
            }while(ea>e && iter<MAX)
            setX(xm)
        }
        
     
        const data =[];
        const [valueIter, setValueIter] = useState([]);
        const [valueXl, setValueXl] = useState([]);
        const [valueXm, setValueXm] = useState([]);
        const [valueXr, setValueXr] = useState([]);
        const [valueE, setValueE] = useState([]);
         
       
        const [html, setHtml] = useState(null);
        const [Equation,setEquation] = useState("(x^4)-13")
        const [X,setX] = useState(0)
        const [XL,setXL] = useState(0)
        const [XR,setXR] = useState(0)
    
        const inputEquation = (event) =>{
            console.log(event.target.value)
            setEquation(event.target.value)
        }
    
        const inputXL = (event) =>{
            console.log(event.target.value)
            setXL(event.target.value)
        }
    
        const inputXR = (event) =>{
            console.log(event.target.value)
            setXR(event.target.value)
        }
    
        const calculateRoot = () =>{
            const xlnum = parseFloat(XL)
            const xrnum = parseFloat(XR)
            Calbisection(xlnum,xrnum);
         
            setHtml(print());
               
            console.log(valueIter)
            console.log(valueXl)
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
                    data: valueXm,
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
                            <input type="number" id="XL" onChange={inputXL} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                            <form>Input XR</form>
                            <input type="number" id="XR" onChange={inputXR} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        </form>
                        <Button variant="dark" onClick={calculateRoot}>
                            Calculate
                        </Button>
                    </form>
                    <br></br>
                    <h5>Answer = {X.toPrecision(7)}</h5>
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
export default bisection