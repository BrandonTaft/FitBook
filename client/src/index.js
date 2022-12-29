import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import reducer from './store/reducer';
import reducer2 from './store/reducer2';
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import BaseLayout from './components/BaseLayout';
import Private from './components/Private';
import Register from './components/Register';
import Redirect from './components/Redirect';
import Login from './components/Login';
import Messages from './components/Messages'
import history from './store/History';
import Logout from './components/Logout';
import PublicFeed from './components/PublicFeed';
import ChatRoom from './components/Chat/ChatRoom';
import UploadImage from './components/UploadImage';
import Chat from './components/Chat/Chat';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))
const store2 = createStore(reducer2, composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(

    <React.StrictMode>
      {/* <BrowserRouter> */}
      <Router history={history}>
       <Provider store = {store}>
       
    
    <BaseLayout>
    <Switch>
    <Route exact path = "/redirect"component = {Redirect} />
    <Route exact path = "/register"component = {Register} />
    <Route exact path = "/" component = {Login} />
    <Route exact path = "/feed" component = {PublicFeed} />
    <Route exact path = "/profile" component = {Private} />
    <Route exact path = "/logout" component = {Logout} />
    <Route exact path = "/upload-image" component = {UploadImage} />
    <Route exact path = "/messages" component = {Messages} />
    <Route exact path="/chat" component={Chat} />
    <Route exact path="/chatroom/:roomId" component={ChatRoom} />
    </Switch>
    </BaseLayout>
    </Provider>
    </Router>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
