import React, { Component } from 'react';
import '../App.css';

class Welcome extends Component {

  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = {user: null, users: null, photos: null}
  }

  selectUser(data){
    let temp = []
    for(let i in data['photos']){
      temp.push(data['photos'][i]['urls']['regular'])
    }
    this.setState({photos: temp})
  }

  handleChange(event){
    this.setState({user: event.target.value})
  }

  async handleSearch(){
    if(this.state.user == null || this.state.user === ""){
      this.setState({photos: null})
      alert("Enter Username")
    }else{
      await fetch('https://api.unsplash.com/search/users?query='+this.state.user,{
            method: "get",
            headers: {
               Authorization: 'Bearer '+this.props.access_token
            }})
          .then((response) => response.json())
          .then((json) => {
            let temp = []
            for(let i in json['results']){
              temp.push(json['results'][i])
            }
            this.setState({users: temp})
          })
    }
  }
  

  render() {
    return (
      <div className = "container">
        <div className = "body">
          <div className = "user-list">
            <input type = "text" className = "search-bar" onChange = {this.handleChange} />
            <input type = "button" className = "search-button" name = "search-button" value = "Search" onClick = {this.handleSearch}/>
            {this.state.users && this.state.users.map((data)=><div onClick = {()=>this.selectUser(data)}className = "user-name" key = {data['id']}>{data['name']}</div>)}
          </div>
          <div className = "photos">
            {this.state.photos && this.state.photos.map((photo)=><img alt = "img" key = {photo} className = "image" src = {photo} />)}
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
