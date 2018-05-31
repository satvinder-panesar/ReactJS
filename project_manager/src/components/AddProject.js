import React, { Component } from 'react';

class AddProject extends Component {

  handleAddProject(e){
    if(this.refs.name.value === '' || this.refs.category.value === '')
      alert("Enter some name and category");
    else{
      let project = {
        name : this.refs.name.value,
        category : this.refs.category.value
      }
      this.props.addProject(project);
    }
    e.preventDefault();
  }

  render() {
    return(
        <div>
          <form onSubmit={this.handleAddProject.bind(this)}>
            Name: <br /><input type = "text" ref = "name" /><br /><br />
            Category: <br /><input type = "text" ref = "category" /><br/><br />
            <input type="submit" value="Add Project"/>
          </form>
        </div>
    );
  }
}

export default AddProject;
