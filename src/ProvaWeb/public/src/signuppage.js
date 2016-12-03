import React from 'react';
import ReactDOM from 'react-dom';

class SignupPageUI extends React.comonent {
  constructor() {
    super();
    this.state = {
      numSports = 1
    }
  }

  render() {
    return (
      <div>
        <form>
          <input type = "text" name="name"/><br/>
          <input type = "text" name="age"/><br/>
          <input type = "email" name="email"/><br/>
          <input type = "text" name="password"/><br/>
        </form>
      </div>
    );
  }
};

module.exports = SignupPageUI;