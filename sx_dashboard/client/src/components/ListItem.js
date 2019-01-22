import React, { Component } from 'react';
import '../App.css';

class ListItem extends Component {
  render() {
    return (
      <div className = "list-container">
      	<div className = "list-item">
      		<div className = "list-element">
      			Flight #: {this.props.flight_number}
      		</div>
      		<div className = "list-element">
      			Mission: {this.props.mission_name}
      		</div>
      		<div className = "list-element">
      			Launch Status : {""+this.props.launch_success}
      		</div>
      		<div className = "list-element">
      			Launch Year : {""+this.props.launch_year}
      		</div>
      	</div>
      </div>
    );
  }
}

export default ListItem;