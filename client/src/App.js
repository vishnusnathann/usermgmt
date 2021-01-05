
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Link,Redirect,Route,Switch} from 'react-router-dom';
import AddUser from './componets/AddUser/AddUser';
import ListUser from './componets/ListUser/ListUser';
import Home from './componets/Home/Home';
function App() {
  return (
    <Router>
      <div className="App">



      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/adduser" component={AddUser}/>
        <Route exact path="/listuser" component={ListUser}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
