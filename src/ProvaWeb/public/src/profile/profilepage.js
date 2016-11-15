// Yuan Wang
// profilepage.js
// Copyright ProvaSport 2016

var React = require('react');
var ReactDOM = require('react-dom');

var ProfilePage = React.createClass({

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    //this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      
        <div style = {style_3}>
          <h1>{"HELLO"}</h1>

        </div>

    );
  }
});


var style_3 = {
  color: 'orange',
};

export default ProfilePage;
