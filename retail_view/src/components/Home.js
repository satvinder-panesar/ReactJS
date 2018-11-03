import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import './styles.css';
import Tags from './Tags';

var data = null;

class Home extends Component {

	componentWillMount(){
		this.props.getData()
	}

	componentWillReceiveProps = (newProps) => {
		data = newProps.retail_data
	}

  render() {
    return (
      <div style={{marginLeft:20}}>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#home">StackLine</a>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
          <div className = "splitscreen">
            <div className = "left">
              {data 
                && 
              <div>
                <img className = 'product-image-size' src = {data.image} alt = "product" /><br />
                <strong>{data.title}</strong><br />
                {data.subtitle}<br />
                {data.tags.map((tag)=><Tags tag={tag} key={tag}/>)}
              </div>
              }       
            </div>
            <div className = "right">
              <div className ="table-style">
                {data
                  &&
                  <table className = "table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Week Ending</th>
                        <th scope="col">Retail Sales</th>
                        <th scope="col">Wholesale Sales</th>
                        <th scope="col">Units Sold</th>
                        <th scope="col">Retailer Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                  {data.sales.map((sale, index)=> 
                    <tr key={index}>
                      <td>{sale.weekEnding}</td>
                      <td>{sale.retailSales}</td>
                      <td>{sale.wholesaleSales}</td>
                      <td>{sale.unitsSold}</td>
                      <td>{sale.retailerMargin}</td>
                    </tr>
                    )}
                  </tbody>
                  </table>
                  }
              </div>
            </div>
          </div>
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
