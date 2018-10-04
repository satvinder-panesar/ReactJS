import React, { Component } from 'react';
import {PageHeader, ButtonToolbar, Grid, Jumbotron, Button, Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class Register extends Component {

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.username = ""
    this.password = ""
    this.first_name = ""
    this.last_name = ""
    this.gender = ""
    this.dob = ""
    this.intro = ""
    this.profile_image = ""
    this.state = {redirect: false}
  }

  handleChange(event){
    if(event.target.name == "username"){
      this.username = event.target.value
    }else if(event.target.name == "password"){
      this.password = event.target.value
    }else if(event.target.name == "first_name"){
      this.first_name = event.target.value
    }else if(event.target.name == "last_name"){
      this.last_name = event.target.value
    }else if(event.target.name == "gender"){
      this.gender = event.target.value
    }else if(event.target.name == "dob"){
      this.dob = event.target.value
    }else if(event.target.name == "intro"){
      this.intro = event.target.value
    }else if(event.target.name == "profile_image"){
      this.profile_image = event.target.value
    }
  }

  handleClick(){
    if(this.username == "" || this.password == "" || this.first_name == "" || this.last_name == "" || this.gender == "" || this.dob == "" || this.intro == ""){
      alert("All fields are mandatory")
    }else{
      fetch('http://localhost:8084/addUser',{
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username="+this.username+"&password="+this.password+"&first_name="+this.first_name+"&last_name="+this.last_name+"&gender="+this.gender+"&dob="+this.dob+"&intro="+this.intro+"&profile_image="+encodeURIComponent(this.profile_image)
      })
      .then((response) => response.json())
      .then((json) =>{
          if(json.status == "OK"){
            this.setState({redirect: true})
          }else if(json.status == "Username taken"){
            alert("Username already exists")
          }
      })
    }    
  }

  render() {

    if(this.state.redirect){
      return(
        <Redirect to = {{
          pathname: "/"
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
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    First Name
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="First Name" name="first_name" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Last Name
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Last Name" name="last_name" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Gender
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Gender" name="gender" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    DOB
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="MM/DD/YYYY" name="dob" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Your Intro
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Few words that describe you" name="intro" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Image URL
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Your profile image URL" name="profile_image" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
              </Form>
            </div>
            <div style={buttonStyles}>
              <Button bsStyle="primary" bsSize="large" block onClick={this.handleClick}>
                Register
              </Button>
            </div>
          </Jumbotron> 
        </center>
      </Grid>
    );
  }
}

const wellStyles = { maxWidth: 900, margin: '0 auto 10px' };

const buttonStyles = { maxWidth: 300, margin: '0 auto 10px' };

export default Register;
