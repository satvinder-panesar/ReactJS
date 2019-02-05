import React, { Component } from 'react';
import '../App.css';

class Welcome extends Component {

  constructor(){
    super()
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.state = {user: null, selected_user: null, users: []}
  }

  selectUser(user){
    this.setState({selected_user: user})
  }

  handleChange(event){
    this.setState({user: event.target.value})
  }

  handleSearch(){
    this.setState({users: ["a","b","c","d"]})
  }

  render() {
    return (
      <div className = "container">
        <div className = "body">
          <div className = "user-list">
            <input type = "text" className = "search-bar" onChange = {this.handleChange} />
            <input type = "button" className = "search-button" name = "search-button" value = "Search" onClick = {this.handleSearch}/>
            {this.state.users.map((user)=><div key = {user} className = "user-name" onClick = {()=>this.selectUser(user)}> {user}</div>)}
          </div>
          <div className = "photos">
            Photos {this.state.selected_user}
          </div>
        </div>
        <div className = "footer">
          Area for credentials and social icons
        </div>
      </div>
    );
  }
}

export default Welcome;
