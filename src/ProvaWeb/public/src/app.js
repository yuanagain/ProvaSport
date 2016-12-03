// Yuan Wang
// app.js
// Copyright ProvaSport 2016

//var React = require('react');
//var ReactDOM = require('react-dom');

// import BottomNavigation, BottomNavigationItem from 'material-ui'

// import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import React from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
// import BottomNavigation, BottomNavigationItem from 'material-ui/BottomNavigation';

//var ProfilePage = require('./profile/profile.js')

import React from 'react';
import ReactDOM from 'react-dom';

import LoginPage from './loginpage';

var MainApp = React.createClass({

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    //this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    //<MuiThemeProvider></MuiThemeProvider>  
    return (
        
        LoginPage.render();
        <div style = {style_2}>
          <h1>{"Yo"}</h1>
          <SideApp data={"yo1"} />
          <SideApp data={"hello"} />
          <SideApp data={"yo mama2"} />
        </div>

    );
  }
});

var SideApp = React.createClass({

  componentDidMount: function() {
    console.log(this.props)
    console.log("This component has mounted.")
  },


  render: function() {
    //<MuiThemeProvider></MuiThemeProvider>  

    
    return (
      
        <div style = {style_3}>
          <h2>{this.props.data}</h2>

        </div>

    );
  }
});


var style_3 = {
  color: 'orange',
};

var style_2 = {
  color: 'blue',
};

ReactDOM.render(
  <LoginPage />,
  document.getElementById('content')
);