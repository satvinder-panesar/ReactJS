import React, { Component } from 'react';
import {Alert, PageHeader, ButtonToolbar, Grid, Jumbotron, Button, Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class Login extends Component {

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.username = ""
    this.password = ""
    this.state = {redirect: false, error: false}
  }

  handleChange(event){
    if(event.target.name == "username"){
      this.username = event.target.value
    }else if(event.target.name == "password"){
      this.password = event.target.value
    }
  }

  handleClick(){
    if(this.username == "" || this.password == ""){
      alert("All fields are mandatory")
    }else{
      fetch('http://localhost:8084/validateUser',{
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username="+this.username+"&password="+this.password
      })
      .then((response) => response.json())
      .then((json) =>{
          if(json.status == "OK"){
            this.setState({redirect: true})
          }else{
            this.setState({error: true})
          }
      })
    }    
  }

  render() {

    if(this.state.redirect){
      return(
        <Redirect to = {{
          pathname: "/profile",
          state: {username: this.username, view_only: false}
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
            <h2>We Need Below Details</h2>            
            <div className="well" style={wellStyles}>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Username
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Username" name="username" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
              </Form>
            </div>
            <div style={buttonStyles}>
              <Button bsStyle="primary" bsSize="large" block onClick={this.handleClick}>
                Login
              </Button>
            </div>
            {
              this.state.error 
              && 
              <Alert bsStyle="warning">
                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
              </Alert>
            }           
          </Jumbotron>
        </center>
      </Grid>
    );
  }
}

const wellStyles = { maxWidth: 500, margin: '0 auto 10px' };

const buttonStyles = { maxWidth: 250, margin: '0 auto 10px' };

export default Login;
