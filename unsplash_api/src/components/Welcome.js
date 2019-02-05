import React, { Component } from 'react';
import '../App.css';

class Welcome extends Component {

  constructor(){
    super()
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.state = {user: null, selected_user: null, users: null}
  }

  selectUser(user){
    this.setState({selected_user: user})
  }

  handleChange(event){
    this.setState({user: event.target.value})
  }

  async handleSearch(){
    if(this.state.user == null){
      alert("Enter Username")
    }else{
      let temp = []
      await fetch('https://api.unsplash.com/search/users?query='+this.state.user,{
            method: "get",
            headers: {
               Authorization: 'Bearer '+this.props.access_token
            }})
          .then((response) => response.json())
          .then((json) => {
            for(let i in json['results']){
              temp.push(json['results'][i]['name'])
            }
          })
      this.setState({users: temp})
  }
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
