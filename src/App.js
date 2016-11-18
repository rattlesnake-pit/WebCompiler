import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compiler: "{\nint x\nx = 100\nprint(x)\n}",
      assembler: "defi x\npushki 100\npopi x\nprti x\nprtcr",
      binary: "00000000: 2843 2943 4855 4e4b 554e 0004 000c 1700  (C)CHUNKUN......\n00000010: 0000 641c 0000 0300 0001                 ..d.......",
      executable:"100"
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
      that.setState({assembler: obj.assembler,
                     binary: obj.chop,
                     executable: obj.vm})
    })
  }
  render() {
    return (
      <div >
          <section id="buttons">
            <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <a onClick={this.handleCompile.bind(this)} type="button" className="btn btn-default btn-lg label-success"><span className="glyphicon glyphicon-ok"></span>&nbsp;<font color="#323232">Compile it!</font></a>
                    </div>
                  </div>
              </div>
          </section>
          <section id="high-level">
           <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="ex1" className="h4" >High-level Language</label><br/>
                <Compiler compiler={this.state.compiler} compilerChange={this.compilerChange.bind(this)}/>
              </div>
              <div className="col-lg-3">
                 <label htmlFor="ex1" className="h4" >Assembly Language</label><br/>
                <Assembler assembler={this.state.assembler}/>
              </div>
              <div className="col-lg-3 ">
                <label htmlFor="ex1" className="h4" >Disassembly Language</label><br/>
                <textarea rows="15" cols="36" id="disassembly" style={{resize: "none"}} data-role="none" disabled></textarea>
              </div>
            </div>
            
            </div>
          </section>
          <section id="compiler">
           <div className="container">
            <div className="row">
             <div className="col-lg-6">
                <label htmlFor="ex2" className="h4" >Compiled Result</label><br/>
                <Executable executable={this.state.executable} />
             </div>
              <div className="col-lg-6">
                   <label htmlFor="ex2" className="h4" >Binary (CHOP)</label><br/>
                  <Binary binary={this.state.binary} />
              </div>
            </div>
           </div>
          </section>
        <div>
        </div>
      </div>
    );
  }
}

class Compiler extends Component {
  render() {
    return (
        <div>
          <textarea value={this.props.compiler} onChange={this.props.compilerChange} rows="15" cols="80" id="highlevel" style={{resize: "none"}} data-role="none"/>
        </div>
    );
  }
}

class Assembler extends Component {
  render() {
    return (
      <div >
        <textarea rows="15" cols="38" id="assembly" style={{resize: "none"}} data-role="none" disabled value={this.props.assembler}/>
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
    <div>
      <textarea value={this.props.binary} rows="15" cols="78" id="compiled" style={{resize: "none"}} data-role="none" disabled/>
    </div>
    );
  }
}

class Executable extends Component {
  render() {
    return (
    <div >
      <textarea value={this.props.executable} rows="15" cols="80" id="compiled" style={{resize: "none"}} data-role="none" disabled/>
    </div>
    );
  }
}

export default App;
