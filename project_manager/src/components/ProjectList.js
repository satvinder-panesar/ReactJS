import React, { Component } from 'react';
import Project from './Project'

class ProjectList extends Component {

  deleteProject(name){
    this.props.deleteProject(name);
  }

  render() {
    return(
        <div>
        <br />
         {
          this.props.projects.map(project => <Project key = {project.name} project = {project} deleteProject={this.deleteProject.bind(this)}/>)
        }
        </div>
    );
  }
}

export default ProjectList;
