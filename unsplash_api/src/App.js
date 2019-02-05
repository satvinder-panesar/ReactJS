import React, { Component } from 'react';
import Welcome from './components/Welcome';

const CLIENT_ID = "415e38dc4d9a9dbf451ab8eb12217bd86fe03dec5630f1eba503f633275b35c9";
const CLIENT_SECRET = "1b50c62379dec99cad11b3b10fae1fb8bdeb9dcb5d4725ce324c1cd9f419557e"
class App extends Component {

  constructor(){
    super()
    this.state = {authorized: null, access_token: null}
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    await fetch('https://unsplash.com/oauth/token',{
          method: "post",
          headers: {
             "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&redirect_uri=http://localhost:3000/&code="+code+"&grant_type=authorization_code"
        })
        .then((response) => response.json())
        .then((json) => this.setState({authorized: true, access_token: json['access_token']}))
    console.log(this.state.access_token)
  }

  render() {
    return (
      <div>
        {!this.state.access_token && <center>
          <a
              href={`https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/`}
          >Authorize</a></center>}
        {this.state.access_token && <Welcome />}
       </div>
    );
  }
}

export default App;
