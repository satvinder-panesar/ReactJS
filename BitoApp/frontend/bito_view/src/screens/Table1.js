import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Row, Col, FormGroup, FormControl, InputGroup, PageHeader, ButtonToolbar, Jumbotron, Button, Grid} from 'react-bootstrap';
import Chart from "react-apexcharts";

class Table1 extends Component {

  constructor(){
      super();
      this.state = {enableTable2Page: false, options: null, series: null}
      this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount(){
    fetch('http://127.0.0.1:5000/getTable1Data')
    .then((response) => response.json())
    .then((json) => {
      let results = json['result']
      let temp1 = []
      let temp2 = []
      for(let i in results){
        temp1.push(results[i]['domain'])
        temp2.push(results[i]['stock_value'])
      }
      this.setState({options: 
      {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: temp1
        }
      }, series: [
        {
          name: "series-1",
          data: temp2
        }
        ]
     })
    })
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
              {this.state.options &&
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="500"
              />}
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
