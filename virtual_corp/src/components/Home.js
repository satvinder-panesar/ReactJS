import React, { Component } from 'react';
import {Jumbotron, Grid, Row, Col, Image} from 'react-bootstrap';
import './Home.css';

class Home extends Component {
  render() {
    return (
    	<Grid>
    	  <center>
		      <Jumbotron>
		      		<h3>Welcome to Virtual Corp</h3>
		      		<h1><p>A sample website for any company</p></h1>
		      </Jumbotron>
		      <Row>
			    <Col xs={6} md={4}>
			      <Image className="pic" src="data:image/jpeg;base64,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" circle />
			      <br />Logo1
			    </Col>
			    <Col xs={6} md={4}>
			      <Image className="pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-IALodl3NjL2bGh--1WcPpF4hgxdziHXhhzZKPcchBTZR7-gIw" circle />
			      <br />Logo2
			    </Col>
			    <Col xs={6} md={4}>
			      <Image className="pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyerJDza02hybjwJ-XVQq8SM3EtpGgYd9eGkUXEP2kL-8edIsvsQ" circle />
			      <br />Logo3
			    </Col>
			</Row>
			<br /><br />	
			<p>Some detailed information about something which is enough to cover all this space</p>  
			<br />
			<p>Above pictures from Google</p>
			</center>    
		</Grid>
    );
  }
}

export default Home;
