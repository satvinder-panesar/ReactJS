import React, { Component } from 'react';

class Project extends Component {

  handleDelete(name){
  	this.props.deleteProject(name);
  }

  render() {
    return (
      <div>
        <b>{this.props.project.name}</b> : {this.props.project.category} : <a href = "#" onClick={this.handleDelete.bind(this,this.props.project.name)}>Delete</a> <br /><br />
      </div>
    );
  }
}

export default Project;
