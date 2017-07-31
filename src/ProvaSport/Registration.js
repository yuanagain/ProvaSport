import React, { Component } from 'react';
//import { Route, IndexRoute } from 'react-router';

class Registration extends Component {

  constructor(){
    super();
    this.state = {
      newProfile: {}
    }
  }

  handleSubmit(e){
  //  console.log(this.refs.email.value);
    this.setState({newProfile:{
      fName: this.refs.fName.value,
      lName: this.refs.lName.value,
      password: this.refs.password.value,
      confirmPassword: this.refs.confirmPassword.value
    }}, function(){
      this.props.Registration(this.state.newProfile);
    });
    e.preventDefault();
  }

  render() {
  //  console.log(this.props);
    return (
      <div>
          Registration
            <form onSubmit={this.handleSubmit.bind(this)}>
      <div>
      <label>First Name</label><br />
      <input type="text" ref="fName" />
      </div>
      <div>
      <label>Last Name</label><br />
      <input type="text" ref="lName" />
      </div>
      <div>
      <label>Password</label><br />
      <input type="password" ref="password" />
      </div>
      <div>
      <label>Confirm Password</label><br />
      <input type="password" ref="confirmPassword" />
      </div>
      <input type="submit" value="Register" />
      </form>
      </div>
    );
  }
}

export default Registration;
