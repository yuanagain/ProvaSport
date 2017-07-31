import React, { Component } from 'react';
//import { Route, IndexRoute } from 'react-router';

class Signin extends Component {

  constructor(){
    super();
    this.state = {
      newRegistration: {}
    }
  }

  handleSubmit(e){
  //  console.log(this.refs.email.value);

    this.setState({newRegistration:{
      email: this.refs.email.value,
      password: this.refs.password.value
    }}, function(){
      this.props.Signin(this.state.newRegistration);
    });
    e.preventDefault();
  }

  render() {
  //  console.log(this.props);
    return (
      <div>
          Sign In
            <form onSubmit={this.handleSubmit.bind(this)}>
      <div>
      <label>Email</label><br />
      <input type="text" ref="email" />
      </div>
      <div>
      <label>Password</label><br />
      <input type="password" ref="password" />
      </div>
      <input type="submit" value="Login" />
      </form>
      </div>
    );
  }
}

export default Signin;
