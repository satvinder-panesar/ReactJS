import React, { Component } from 'react';
import {Jumbotron, Grid} from 'react-bootstrap';


class Contacts extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h3>
            panesar.satvindersingh@gmail.com
            <br /><br />
            https://www.linkedin.com/in/panesarsatvinder/
            <br />
          </h3>
        </Jumbotron>   
      </Grid>
    );
  }
}

export default Contacts;
