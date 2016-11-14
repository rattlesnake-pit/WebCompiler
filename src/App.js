import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compiler: "{\nint x\nx = 100\nprint(x)\n}",
      assembler: "defi x\npushki 100\npopi x\nprti x\nprtcr",
      binary: "00000000: 2843 2943 4855 4e4b 554e 0004 000c 1700  (C)CHUNKUN......\n00000010: 0000 641c 0000 0300 0001                 ..d.......",
      executable:" return 1"
    }
  }
  compilerChange(event) {

    this.setState({compiler: event.target.value});
  }
  handleCompile() {
    var that = this
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var request = new Request('/compile', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ compiler: this.state.compiler})
    });

    fetch(request).then(function(response) {
      return response.json();
    })
    .then(function(obj) {
      that.setState({assembler: obj.assembler, binary: obj.chop})
    })
  }
  render() {
    return (
      <div >
        <div>
        <h1>Compilador</h1>
        <button onClick={this.handleCompile.bind(this)}> Compilar </button>
        </div>
        <div className="hcontainer">
          <Compiler compiler={this.state.compiler}
                    compilerChange={this.compilerChange.bind(this)}/>
          <Assembler assembler={this.state.assembler}/>
          <BinaryExecutable binary={this.state.binary} executable={this.state.executable}/>
        </div>
      </div>
    );
  }
}

class Compiler extends Component {
  render() {
    return (
        <div className="item">
          <h3>Compilador</h3>
          <textarea value={this.props.compiler} onChange={this.props.compilerChange}/>
        </div>
    );
  }
}

class Assembler extends Component {
  render() {
    return (
      <div className="item">
        <h3>Ensamblador</h3>
        <textarea value={this.props.assembler}/>
      </div>
    );
  }
}

class BinaryExecutable extends Component {
  render() {
    return (
      <div className="item2">
          <Binary binary={this.props.binary}/>
          <Executable executable={this.props.executable}/>
      </div>
    );
  }
}

class Binary extends Component {
  render() {
    return (
    <div className="item">
      <h3>Chop("binario")</h3>
      <textarea value={this.props.binary}/>
    </div>
    );
  }
}

class Executable extends Component {
  render() {
    return (
    <div className="item">
      <h3>Ejecutable</h3>
      <textarea value={this.props.executable}/>
    </div>
    );
  }
}

export default App;
