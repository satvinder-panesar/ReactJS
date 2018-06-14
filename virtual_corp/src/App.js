import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Navibar from './components/Navibar';
import About from './components/About';
import Contacts from './components/Contacts';

  
class App extends Component {
  render() {
    return (
       <Router>
        <div>
          <Navibar /> 
          <Route exact path = "/" component = {Home} />
          <Route path = "/about" component = {About} />
          <Route path = "/contacts" component = {Contacts} />
        </div>
        </Router>        
    );
  }
}

export default App;
