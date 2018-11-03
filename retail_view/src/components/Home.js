import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Table } from 'react-bootstrap';
import './styles.css';
import Tags from './Tags';

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
      <div style={{marginLeft:20}}>

          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#home">StackLine</a>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
            
            {data 
              && 
            <div>
              <img className = 'product-image-size' src = {data.image} alt = "product" /><br />
              <strong>{data.title}</strong><br />
              {data.subtitle}<br />
              {data.tags.map((tag)=><Tags tag={tag} key={tag}/>)}
            </div>
            }       

        
            {data
              &&
              <Table responsive>
              <thead>
                <tr>
                  <th>Week Ending</th>
                  <th>Retail Sales</th>
                  <th>Whole Sales</th>
                  <th>Units Sold</th>
                  <th>Retailer Margin Sold</th>
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
              </Table>
            }
          
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
