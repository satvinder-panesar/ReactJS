import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Row, Col, FormGroup, FormControl, InputGroup, PageHeader, ButtonToolbar, Jumbotron, Button, Grid} from 'react-bootstrap';

class Welcome extends Component {

  constructor(){
      super();
      this.state = {enableTable1Page: false}
      this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState({enableTable1Page: true})
  }

  render() {
    if(this.state.enableTable1Page){
      return(
        <Redirect to = {{
          pathname: "/table1"
        }} 
        />
      )
    }else{
      return (
        <Grid>
          <center>
            <PageHeader>
               <a href = "/" >BITO<small> A robotics company</small></a>
            </PageHeader>
            <Jumbotron>
              <h1>Hello, world!</h1>
              <p>
                Welcome to the future.
              </p>            
                <Grid>
                    <Button name ="table1" bsStyle="primary" bsSize="large" block onClick = {this.handleClick}>
                      Go to table1
                    </Button>
                </Grid>         
            </Jumbotron>        
          </center>
        </Grid>
      );
    }
  }
}

export default Welcome;
