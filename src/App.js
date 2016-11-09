import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compiler: "int x\nx = 100\nprint(x)",
      assembler: "defi x\npushki 100\npopi x\npushi x\nprti x",
      binary: " dfasdfasdf",
      executable:" return 1"
    }
  }
  compilerChange(event) {
    this.setState({compiler: event.target.value});
  }
  handleCompile() {
  }
  render() {
    return (
      <div >
        <div>
        <h1>Compilador</h1>
        <button> Compilar </button>
        </div>
        <div className="hcontainer">
          <Compiler compiler={this.state.compiler}
                    compilerChange={this.compilerChange}/>
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
      <div className="item">
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
