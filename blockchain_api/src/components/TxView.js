import React, { Component } from 'react';
import TxDetails from './TxDetails';
import '../App.css';

class TxView extends Component{

	constructor(){
		super()
		this.state = {selectedTx: null, txDetails: null}
	}

	handleClick = async (tx) => {
		this.setState({selectedTx: tx})
		let data = await fetch(`https://cors-anywhere.herokuapp.com/https://blockchain.info/rawtx/${tx}`)
	    data = await data.json()
	    this.setState({txDetails: data})
	}

	render(){
		return(
			<div className="TxView">
				<div className="Txs">
					<div><h4>Select a Tx to view details</h4></div>
					<div>{this.props.txs.map((tx,i) => <li onClick={this.handleClick.bind(this,tx)} key={i}>{tx}</li>)}</div>
				</div>
				<div className="TxsDetail">
					<h3>Tx Details</h3>
					{this.state.txDetails && <TxDetails data = {this.state.txDetails} />}
				</div>
			</div>
		)
	}
}

export default TxView;