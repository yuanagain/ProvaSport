import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Form extends React.Component {
  render(){
    return(
      <form>
        Username:<br/>
        <input type="text" name="username"/><br/>
        Password:<br/>
        <input type="text" name="password"/>
      </form>
    );
  }
}

export default Form;
