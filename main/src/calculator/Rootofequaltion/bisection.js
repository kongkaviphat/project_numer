import {useState} from 'react'
import { evaluate } from 'mathjs';
import { Button, Container, Table } from '@mui/material';
export default function Bisection() {
    const[valueE,SetvalueE]=useState([]);
    const[valueXM,SetvalueXM]=useState([]);
    const[valueXl,SetvalueXl]=useState([]);
    const[valueXr,SetvalueXr]=useState([]);
    const[valueIter,SetValueIter]=useState([]);
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)
    const data=[];
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
    const print = () =>{
        console.log(data)
        SetValueIter(data.map((x)=>x.iteration));
        SetvalueXl(data.map((x)=>x.Xl));
        SetvalueXM(data.map((x)=>x.Xm));
        SetvalueXr(data.map((x)=>x.Xr));
        SetvalueE(data.map((x)=>x.E));
        return(
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
        );
}
    const Calbisection=(xl,xr)=>{
        let fxm,fxr,xm,ea,iter,scope;
        let MAX;
        let ans;
        const E=0.000001;
        let obj={};
        do{
            xm=(xl+xr)/2;
            scope ={
                x:xr,
            }
            fxr=evaluate(Equation,scope);
            scope={
                x:xm,
            }
            fxm=evaluate(Equation,scope);
            iter ++;
            if(fxm*fxr>0){
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
            else if(fxm*fxr<0){
                ea = error(xr, xm);
                    obj = {
                        iteration:iter,
                        Xl:xl,
                        Xm:xm,
                        Xr:xr,
                    }
                    data.push(obj)
                    xl = xm;
            }
        }while(ea>E&&iter<MAX);
        setX(obj);
    };
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
        
  return (
    <>   
    <div>bisection</div>
    
    <form>
        <div>Equation</div>
        <input type='text' value={Equation} onChange={inputEquation}></input>
        <div>Xl</div>
        <input type='number' onChange={inputXL}></input>
        <div>Xr</div>
        <input type='number' onChange={inputXR}></input>
        <button variant="dark" onClick={Calbisection}>
                Calculate
        </button>
        </form>
        <br></br>
        <h5>Answer = {X.toPrecision(7)}</h5>
        <div>
            {print}
        </div>
    </>
  )
}
