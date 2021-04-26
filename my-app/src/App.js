import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from "./redux/stor/stor";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from './component/signUp'
import Picture from './component/picture'
import Login from './component/login'
import StockImages from './component/stockImages'
import Hello from './component/hello'
import LogOut from './component/LogOut'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="auth-wrapper">
              <div >
                <div className="d-flex justify-content-between" style={{backgroundColor:"gray"}} >
                  <Hello></Hello>
                  <LogOut></LogOut>
                </div>
                <Switch>
                  <Route exact path='/' component={SignUp} />
                  <Route path="/sign-up" component={SignUp} />
                  <Route path="/picture" component={Picture} />
                  <Route path="/login" component={Login} />
                  <Route path="/stockImages" component={StockImages} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
