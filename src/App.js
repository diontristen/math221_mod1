import logo from './logo.svg';
import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import index from './pages/index';
import gaussSidel from './pages/gaussSidel';
import gaussSidelv2 from './pages/gaussSidelv2';
import NewtonPage from './pages/newton';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={index}/>
        <Route exact path="/gauss_sidel" component={gaussSidel}/>
        <Route exact path="/gauss_sidelv2" component={gaussSidelv2}/>
        <Route exact path="/newton" component={NewtonPage}/>
      </Switch>
    </Router>
  );
}

export default App;
