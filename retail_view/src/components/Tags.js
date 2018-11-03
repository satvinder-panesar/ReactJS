import React, { Component } from 'react';
import './styles.css';

class Tags extends Component {
  render() {
    return (
      <div className = 'tag-background'>
      {this.props.tag}
      </div>
    );
  }
}

export default Tags;
