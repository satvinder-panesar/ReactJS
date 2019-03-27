import React, { Component } from 'react';
import './App.css';
import TxView from './components/TxView';

class App extends Component {

  constructor(){
    super()
    this.state = {latest_block: null, blocks: null, displayLatest: false, displayTxView: false, txs: null}
  }

  handleClick = () => {
    this.setState({displayLatest: !this.state.displayLatest, displayTxView: false})
  }

  handleSelect = async (block) => {
    let data = await fetch(`https://cors-anywhere.herokuapp.com/https://blockchain.info/rawblock/${block}`)
    data = await data.json()
    data = data.tx.slice(0,18)
    let temp = []
    for(let ele in data){
      temp.push(data[ele].tx_index)
    }
    this.setState({displayTxView: true, txs: temp, displayLatest: true})
  }

  componentDidMount = async () =>{
    let data = await fetch("https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock")
    data = await data.json()
    this.setState({latest_block: data})
    data = await fetch(`https://cors-anywhere.herokuapp.com/https://blockchain.info/blocks/${Date.now()}?format=json`, {
      'Content-Type': 'application/json'
    })
    data = await data.json()
    this.setState({blocks: data.blocks})
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
          {this.state.displayLatest && !this.state.displayTxView && <TxView txs={this.state.latest_block.txIndexes.slice(0,18)} />}
          {!this.state.displayLatest && !this.state.displayTxView && 
            this.state.blocks && 
            <div>
              <h3>Select any block hash to view</h3>
              {this.state.blocks.slice(0,6).map((block,i)=><li onClick={this.handleSelect.bind(this,block.hash)} key={i}>{block.hash}</li>)}
            </div>
          }
          {this.state.displayTxView && this.state.displayLatest && this.state.txs &&
            <TxView txs={this.state.txs} />
          }
        </div>        
      </div>
    );
  }
}

export default App;
