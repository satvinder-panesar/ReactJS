import React, { Component } from 'react';
import { connect } from 'react-redux';

var data = null;

class Home extends Component {

	componentWillMount(){
		this.props.getData()
	}

	componentWillReceiveProps = (newProps) => {
		console.log("new props ",newProps.retail_data)
		data = newProps.retail_data
	}

  render() {
    return (
      <div>
      	{data}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    retail_data: state.retail_data.retail_data,
    dataAvailable: state.retail_data.dataAvailable
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch({ type: 'RETAIL_DATA_REQUEST'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
