import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {latest_block: null, blocks: null, index: 0}
  }

  componentDidMount = async () =>{
    let data = await fetch("https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock", {
      'Content-Type': 'application/json'
    })
    data = await data.json()
    console.log(data)
    this.setState({latest_block: data})
    data = await fetch(`https://cors-anywhere.herokuapp.com/https://blockchain.info/blocks/${Date.now()}?format=json`, {
      'Content-Type': 'application/json'
    })
    data = await data.json()
    console.log(data)
    this.setState({blocks: data})
  }

  render() {
    return (
      <div className="App">
        <div className="Banner">
          <h2>Chainyard Dashboard: Blockchain</h2>
        </div>
        <div className="LatestBlock">
          Latest
        </div>
        <div className="DisplaySection">
          Content
        </div>
      </div>
    );
  }
}

export default App;
