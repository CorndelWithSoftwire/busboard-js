import React, { Component } from 'react';
import busesLogo from './buses.svg';
import './App.css';
import BusBoard from "./BusBoard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={busesLogo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the BusBoard</h1>
        </header>
        <BusBoard/>
      </div>
    );
  }
}

export default App;
