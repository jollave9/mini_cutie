import {useState} from 'react'
import Home from './Pages/Home'
import Result from './Pages/Result'
import Context from './Context/Context'
import { GlobalStyles } from "./GlobalStyles.style";
import { Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  const [state,setState] = useState('intro')
  const [data,setData] = useState('')
  return (
    <div>
      <Context.Provider value={{state,setState,data,setData}}>
      <GlobalStyles/>
      <Router>
        <Route path='/' exact component={Home}/>
        <Route path='/result' exact component={Result}/>
      </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
