import React, { Component } from 'react';
import './App.css';
import TxView from './components/TxView';

class App extends Component {

  constructor(){
    super()
    this.state = {latest_block: null, blocks: null, index: 0, displayLatest: false}
  }

  handleClick = () => {
    this.setState({displayLatest: !this.state.displayLatest})
  }

  componentDidMount = async () =>{
    let data = await fetch("https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock")
    data = await data.json()
    this.setState({latest_block: data})
    data = await fetch(`https://cors-anywhere.herokuapp.com/https://blockchain.info/blocks/${Date.now()}?format=json`, {
      'Content-Type': 'application/json'
    })
    data = await data.json()
    this.setState({blocks: data})
  }

  render() {
    return (
      <div className="App">
        <div className="Banner">
          <h2>Chainyard Dashboard: Blockchain</h2>
        </div>
        <div className="LatestBlock">
          {this.state.latest_block &&
            <div className="LatestBlockContents">
              <div className="LatestLabelContent">Latest Block Index: {this.state.latest_block.block_index}</div> 
              <div className="LatestLabelContent">Number of Txs: {this.state.latest_block.txIndexes.length}</div>
              <div className="LatestLabelContent">
                <input className="ActionButton" type="button" value={this.state.displayLatest ? "Back to Home" : "View More Details"} onClick={this.handleClick} />
              </div>
            </div>
          }
        </div>
        <div className="DisplaySection">
          {this.state.displayLatest && <TxView txs={this.state.latest_block.txIndexes} />}
        </div>        
      </div>
    );
  }
}

export default App;
