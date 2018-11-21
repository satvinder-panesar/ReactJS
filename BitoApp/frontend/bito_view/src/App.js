import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Welcome from './screens/Welcome';
import Table1 from './screens/Table1';
import Table2 from './screens/Table2';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path = "/" component = {Welcome} />
          <Route path = "/table1" component = {Table1} /> 
          <Route path = "/table2" component = {Table2}/>
      </div>
      </Router>
    );
  }
}

export default App;
