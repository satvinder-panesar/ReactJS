import React from 'react';
import '../App.css';

let TxDetails = (props) => {
	return(
		<div>
			<div>Tx Index: {props.data.tx_index}</div>
			<div>Height: {props.data.block_height}</div>
			<div>Block Index: {props.data.block_index}</div>
			<div>Size: {props.data.size}</div>
			<div>Weight: {props.data.weight}</div>
		</div>
	)
}

export default TxDetails;