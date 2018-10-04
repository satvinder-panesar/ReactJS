import React, { Component } from 'react';
import {Row, Col, FormGroup, FormControl, InputGroup, PageHeader, ButtonToolbar, Jumbotron, Button, Grid} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class Welcome extends Component {

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.username = ""
    this.state = {enableRegistration: false, enableLogin: false, enableProfile: false, username: ""}
  }

  handleChange(event){
    if(event.target.name == "username"){
      this.setState({username: event.target.value})
    }
  }

  handleClick(event){
    if(event.target.name == "register"){
      this.setState({enableRegistration: true})
    }else if(event.target.name == "search"){
      if(this.state.username == ""){
        alert("All fields are mandatory")
      }else{
         fetch('http://localhost:8084/getProfileInfo',{
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "username="+this.state.username
        })
        .then((response) => response.json())
        .then((json) => {
          if(json.username!=null){
            this.setState({enableProfile: true})
          }else{
            alert("No such user found")
            this.setState({username: ""})
          }
        })
      }
    }else{
      this.setState({enableLogin: true})
    }
  }

  render() {

    if(this.state.enableRegistration){
      return(
        <Redirect to = {{
          pathname: "/register"
        }} 
        />
      )
    }else if(this.state.enableLogin){
      return(
        <Redirect to = {{
          pathname: "/login"
        }} 
        />
      )
    }else if(this.state.enableProfile){
      return(
        <Redirect to = {{
          pathname: "/profile",
          state: {username: this.state.username, view_only: true}
        }} 
        />
      )
    }

    return (
      <Grid>
        <center>
          <PageHeader>
             <a href = "/" >FeedHub<small> A global sharing platform</small></a>
          </PageHeader>
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              Express yourself to the people. Get a great online presence in minutes.
            </p>            
              <Grid className="well" style={wellStyles}>
                  <Button name ="register" bsStyle="primary" bsSize="large" block onClick={this.handleClick}>
                    Register
                  </Button>
                  <Button name = "login" bsSize="large" block onClick={this.handleClick}>
                    Login
                  </Button>
              </Grid>     
              <Row className="show-grid">
                <Col md={6} mdPush={6}>
                  <Button name="search" bsSize="large" block onClick={this.handleClick}>
                    Search
                  </Button>
                </Col>
                <Col md={6} mdPull={6}>
                  <FormGroup>
                    <InputGroup>
                      <InputGroup.Addon>@</InputGroup.Addon>
                      <FormControl style={searchBoxStyles} type="text" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange}/>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>       
          </Jumbotron>        
        </center>
      </Grid>
    );
  }
}

const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

const searchBoxStyles= {height: 46}

export default Welcome;
