var React = require('react');
var ReactDOM = require('react-dom');
var InfiniteGrid = require('react-infinite-grid');

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
          <div id="entry" style={entry}>
          </div>
        </div>
        <div id="rightColumn" style={rightColumn}>
        </div>
      </div>
    );
  }
});

// Styling
var width = window.innerWidth;
var newsfeed = {
  width: width,
  height: window.innerHeight,
  backgroundColor: 'red',
  margin: 'auto',
  padding: 10,
  flex: 1,
  marginLeft: -60,
  marginTop: 0,
};
var leftColumn = {
  height: window.innerHeight,
  width: 600,
  backgroundColor: 'blue',
  float: 'left',
  flex: 1,
};
var rightColumn = {
  height: window.innerHeight,
  backgroundColor: 'green',
  flex: 1,
};
var entry = {
  height: 200,
  backgroundColor: 'yellow',
  padding: 20,
  margin: 20,
}

// Dummy values
// var items = [];
// var num_players = 6;
// var names = ['James Smith', 'Jen Johnson', 'Johhny Jones', 'Jackie Anderson', 'Josh Watson', 'Jill Jameson'];
// var scores = ['1 2 3 4 5', '6 7 8 9 10', '1 2 3 4 5', '6 7 8 9 10', '1 2 3 4 5', '6 7 8 9 10'];
// for (var i = 0; i < num_players; i++) {
//   items.push(<Example name={names[i]} score={scores[i]}/>)
// }

ReactDOM.render(
  <Newsfeed/>,
  document.getElementById('newsfeed_container')
);
