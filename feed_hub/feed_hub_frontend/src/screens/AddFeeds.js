import React, { Component } from 'react';
import {Alert, PageHeader, ButtonToolbar, Grid, Jumbotron, Button, Form, FormGroup, Col, Row, FormControl, ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class AddFeeds extends Component {

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.feed_url = ""
    this.state = {feed_url: "", redirect: false, preview: false}
    this.username = ""
  }

  componentWillMount(){
    this.username = this.props.location.state.username
  }

  handleChange(event){
      this.setState({feed_url: event.target.value})
  }

  handleClick(event){
    if(event.target.name == "share_feed"){
      if(this.state.feed_url == ""){
        alert("All fields are mandatory")
      }else{
        console.log(this.state.feed_url)
        this.setState({preview: true})
      }
    }else if(event.target.name == "back_to_profile"){
        this.setState({redirect: true})
    }else{
      fetch('http://localhost:8084/addFeed',{
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username="+this.username+"&feed_url="+this.state.feed_url
      })
      .then((response) => response.json())
      .then((json) =>{
          if(json.status == "OK"){
            alert("Added")
            this.setState({preview: false, feed_url: ""})
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
                    Feed URL
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" value={this.state.feed_url} placeholder="URL to share" name="feed_url" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
              </Form>
            </div>
            <div style={buttonStyles}>
              <Row className="show-grid">
               <Col xs={5} md={5}>
                  <Button name="share_feed" bsStyle="primary" bsSize="large" block onClick={this.handleClick}>
                    Share Feed
                  </Button>
                </Col>
                <Col xs={5} md={5}>
                  <Button name="back_to_profile" bsStyle="primary" bsSize="large" block onClick={this.handleClick}>
                    Back To Profile
                  </Button>
                </Col>
              </Row>
            </div>   
            {
              this.state.preview 
                && 
              <div>
                <img style={imageStyles} src = {this.state.feed_url} />
                <Button name="confirm" style={buttonStyles} bsStyle="primary" bsSize="large" block onClick={this.handleClick}>
                  Confirm
                </Button>
              </div>
            }       
          </Jumbotron>
        </center>
      </Grid>
    );
  }
}

const wellStyles = { maxWidth: 700, margin: '0 auto 10px' };

const buttonStyles = { maxWidth: 400, margin: '0 auto 10px', marginTop: '10px' };

const imageStyles = {width: 700, height: 400}

export default AddFeeds;
