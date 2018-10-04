import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Welcome from './screens/Welcome';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Login from './screens/Login';
import AddFeeds from './screens/AddFeeds';

class App extends Component {
  render() {
    return (
      <Router>
      	<div>
	        <Route exact path = "/" component = {Welcome} />
	        <Route path = "/profile" component = {Profile} /> 
          <Route path = "/register" component = {Register}/>
          <Route path = "/login" component = {Login}/>
          <Route path = "/addFeeds" component = {AddFeeds}/>
	    </div>
      </Router>
    );
  }
}

export default App;
