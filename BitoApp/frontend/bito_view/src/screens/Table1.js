import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Row, Col, FormGroup, FormControl, InputGroup, PageHeader, ButtonToolbar, Jumbotron, Button, Grid} from 'react-bootstrap';

class Table1 extends Component {

  constructor(){
      super();
      this.state = {enableTable2Page: false}
      this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState({enableTable2Page: true})
  }

  render() {
    if(this.state.enableTable2Page){
      return(
        <Redirect to = {{
          pathname: "/table2"
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
              <h1>Table 1 details</h1> 
              <Grid>
                  <Button name ="table2" bsStyle="primary" bsSize="large" block onClick = {this.handleClick}>
                    Go to table2
                  </Button>
              </Grid>        
            </Jumbotron>        
          </center>
        </Grid>
      );
    }
  }
}

export default Table1;
