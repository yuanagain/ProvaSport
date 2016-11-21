import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    }
  }
  handleClick() {
    this.setState({
      count: this.state.count+1,
    });
  }
  resetCount() {
    this.setState({
      count: 0,
    })
  }
  render() {
    let value = this.state.count;
    return (
      <div>
        <button type="button" class="btn btn-primary" onClick={() => this.handleClick()}>Increment!</button>
        <button type="button" class="btn btn-primary reset" onClick={() => this.resetCount()}>Reset</button>
        <p>Count: {value}</p>
      </div>
    );
  }
}

export default Counter;
