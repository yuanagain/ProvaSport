var React = require('react');
var ReactDOM = require('react-dom');

// Feed
var Newsfeed = React.createClass({
  getInitialState: function() {
    return {
      focused: 0
    };
  },
  clicked: function(index) {
    this.setState({
      focused: index
    });
  },
  render: function() {
    var self = this;
    return (
      <div id="newsfeed_container" style={newsfeed}>
        <div id="leftColumn" style={leftColumn}>

        </div>
        <div id="rightColumn" style={rightColumn}>

        </div>
      </div>
    );
  }
});

// Styling
var newsfeed = {
  width: window.innerWidth,
  height: window.innerHeight * 10,
  backgroundColor: '#0000FF',
  margin: 'auto',
  padding: 10,
  flex: 1,
  marginLeft: -60,
  marginTop: 0,
};
var leftColumn = {
  height: window.innerHeight * 10,
  width: window.innerWidth / 2 - 60,
  backgroundColor: 'red',
  float: 'left',
  marginRight: 15,
  marginTop: 30,
  marginLeft: 30,
};
var rightColumn = {
  height: window.innerHeight * 10,
  width: window.innerWidth / 2 - 60,
  backgroundColor: 'green',
  float: 'left',
  marginLeft: 15,
  marginTop: 30,
  marginRight: 30,
};
var entry = {
  height: 200,
  backgroundColor: 'beige',
  padding: 20,
  margin: 30,
}

ReactDOM.render(
  <Newsfeed/>,
  document.getElementById('newsfeed_container')
);
