import Home from './Pages/Home'
import Result from './Pages/Result'

import { GlobalStyles } from "./GlobalStyles.style";
import { Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div>
      <GlobalStyles/>

      <Router>
        <Route path='/' exact component={Home}/>
        <Route path='/result' exact component={Result}/>
      </Router>
    </div>
  );
}

export default App;
