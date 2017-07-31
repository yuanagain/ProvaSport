import React, { Component } from 'react';
//import { Route, IndexRoute } from 'react-router';
//import Checkbox from './Components/Checkbox';
import Profile from './Components/Profile';
import Signin from './Components/Signin';
import Registration from './Components/Registration';
import * as firebase from "firebase";

//import index from './public/index';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDrTzX0nVdFUIuBvBA0OldyjRjHmvymIls",
  authDomain: "add-users-to-app.firebaseapp.com",
  databaseURL: "https://add-users-to-app.firebaseio.com",
  projectId: "add-users-to-app",
  storageBucket: "",
  messagingSenderId: "593111009070"
};
firebase.initializeApp(config);
console.log(firebase);


class App extends Component {
  constructor(){
    super();
    this.state = {
      userInfo: []
  }
}
  componentWillMount(){
    this.setState({userInfo: [
      {
        name: '',
        email: '',
        age: '',
        password: '',
      }
    ]});
  }

  handleSignIn(info){
    //console.log(info);
    let userInfo = this.state.userInfo;
    userInfo.push(info);
    this.setState({userInfo:userInfo});
    console.log(userInfo)
  }

  handleRegistration(info){

  }

  render() {
    return (
      <div className="App">
        <Signin Signin={this.handleSignIn.bind(this)} />

          <h2>Welcome to the Club!</h2>
          <Profile userInfo={this.state.userInfo} />

          <Registration Registration={this.handleRegistration.bind(this)} />
        </div>
    );
  }
}


export default App;
