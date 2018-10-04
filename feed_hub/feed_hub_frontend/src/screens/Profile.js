import React, { Component } from 'react';
import {Glyphicon, ListGroup, ListGroupItem, Image, Alert, PageHeader, ButtonToolbar, Grid, Row, Jumbotron, Button, Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

class Profile extends Component {

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {username: null, first_name: null, last_name: null, gender: null, dob: null, intro: null, profile_image: null, feeds: null, feed_count: 0, addFeeds: false}
  }

  handleClick(){
    this.setState({addFeeds: true})
  }

  componentWillMount(){
    fetch('http://localhost:8084/getProfileInfo',{
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username="+this.props.location.state.username
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({...json})
        let profile_image = this.state.profile_image
        profile_image = decodeURIComponent(profile_image)
        if(this.state.feeds != null){
          let feed_count = this.state.feeds
          feed_count = feed_count.length
          this.setState({feed_count: feed_count})
        }
        this.setState({profile_image: profile_image})
      }
     )
  }

  render() {

    if(this.state.addFeeds){
      return(
        <Redirect to = {{
          pathname: "/addFeeds",
          state: {username: this.state.username}
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
        </center>
        <Jumbotron>
          <Row className="show-grid">
            <Col xs={4} md={4}>
              <Image style={imageStyles} src={this.state.profile_image} circle />
            </Col>
            <Col xs={6} md={6}>
              <ListGroup>
                <ListGroupItem bsStyle="success">{this.state.first_name} {this.state.last_name}</ListGroupItem>
                <ListGroupItem bsStyle="info">{this.state.gender}</ListGroupItem>
                <ListGroupItem bsStyle="warning">{this.state.dob}</ListGroupItem>
                <ListGroupItem bsStyle="info">{this.state.intro}</ListGroupItem>
                <ListGroupItem bsStyle="success">Feeds: {this.state.feed_count}</ListGroupItem>
              </ListGroup>
              {
                this.props.location.state.view_only == false
                  &&
                <Button bsStyle="primary" bsSize="large" onClick={this.handleClick}>
                  Add Feeds
                </Button>
              }             
            </Col>
          </Row>  
        </Jumbotron> 
        <center>
          {this.state.feed_count>0 && 
            this.state.feeds.map(feed => <LazyLoad><img style={feedStyles} src={feed} /></LazyLoad>)
          }
        </center>
      </Grid>
    );
  }
}

const wellStyles = { maxWidth: 500, margin: '0 auto 10px' };

const imageStyles = { maxHeight: 250, maxWidth: 250, margin: '0 auto 10px' };

const feedStyles = {width: 800, height: 500, marginTop: 10}

export default Profile;
