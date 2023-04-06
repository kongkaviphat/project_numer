
import {BrowserRouter,Route} from 'react-router-dom'
import './App.css'; 
import Bisection from './calculator/Rootofequaltion/bisection'
import Secant from './calculator/Rootofequaltion/secant'
import Falseposition from './calculator/Rootofequaltion/falseposition'
function App() {
  return (
    <Bisection/>
  );
}

export default App;
