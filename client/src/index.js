import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import reducer from './store/reducer';
import reducer2 from './store/reducer2';
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import BaseLayout from './components/BaseLayout';
import MyThings from './components/MyThings';
import Register from './components/Register';
import Login from './components/Login';
import AddThings from './components/AddThings';
import AddMyThing from './components/AddMyThing'
import AddMail from './components/AddMail'
import AllMail from './components/AllMail'

import Logout from './components/Logout';
import AllThings from './components/AllThings';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))
const store2 = createStore(reducer2, composeEnhancers(
  applyMiddleware(thunk)
))





ReactDOM.render(

    <React.StrictMode>
      <BrowserRouter>
       <Provider store = {store}>
       
    
    <BaseLayout>
    <Switch>
  
    <Route exact path = "/register"component = {Register} />
    <Route exact path = "/" component = {Login} />
    <Route exact path = "/allthings" component = {AllThings} />
    <Route exact path = "/mythings" component = {MyThings} />
    <Route exact path = "/addthings" component = {AddThings} />
    <Route exact path = "/logout" component = {Logout} />
    <Route exact path = "/addmything" component = {AddMyThing} />
    <Route exact path = "/addmail" component = {AddMail} />
    
    </Switch>
    </BaseLayout>
   
    </Provider>
    <Provider store = {store2}>
    <Route exact path = "/allmail" component = {AllMail} />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
