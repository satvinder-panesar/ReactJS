import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {PageHeader, Jumbotron, Button, Grid} from 'react-bootstrap';

class Table2 extends Component {

  constructor(){
      super();
      this.state = {enableTable1Page: false, stock_data: null}
      this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState({enableTable1Page: true})
  }

  componentWillMount(){
    fetch('http://127.0.0.1:5000/getTable2Data')
    .then((response) => response.json())
    .then((json) => this.setState({stock_data: json['result']}))
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
              <h1>Table 2 details</h1> 
              {this.state.stock_data &&
                <table className = "table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Domain</th>
                        <th scope="col">Stock Value</th>
                      </tr>
                    </thead>
                    <tbody>
                  {this.state.stock_data.map((stock_detail, index)=> 
                    <tr key={index}>
                      <td>{stock_detail['domain']}</td>
                      <td>{stock_detail['stock_value']}</td>
                    </tr>
                    )}
                  </tbody>
                  </table>
              }
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

export default Table2;
