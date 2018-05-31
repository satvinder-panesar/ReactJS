import React, { Component } from 'react';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      projects :[
        {
          name:'Loan Data Report',
         category:'Data Analysis'
        },
		{
          name:'Weather Info',
         category:'Web Development'
        },
        {
          name:'Sales Data Report',
         category:'Data Analysis'
        }
      ]
    };
  }

  addProject(project){
    let copy = this.state.projects;
    copy.push(project);
    this.setState({projects:copy})
  }

  deleteProject(name){
    let copy = this.state.projects;
    let index = copy.indexOf(x => x.name === name);
    copy.splice(index,1);
    this.setState({projects:copy});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple Project Manager</h1>
        </header>
        <br />
        <AddProject addProject = {this.addProject.bind(this)}/><br />
        <ProjectList projects = {this.state.projects} deleteProject={this.deleteProject.bind(this)}/>
      </div>
    );
  }
}

export default App;
