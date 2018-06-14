import React, { Component } from 'react';
import {Grid, Row, Col, Button, Navbar, Nav, NavItem} from 'react-bootstrap';

class Navibar extends Component {
  render() {
    return (
    	<Navbar>
		  <Nav>
		    <NavItem eventKey={1} href="/">
		      Home
		    </NavItem>
		    <NavItem eventKey={2} href="/about">
		      About
		    </NavItem>	
		    <NavItem eventKey={3} href="/contacts">
		      Contacts
		    </NavItem>		    
		  </Nav>
		</Navbar>
    );
  }
}

export default Navibar;
