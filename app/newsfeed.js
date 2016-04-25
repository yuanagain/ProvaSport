// Mapping help: https://facebook.github.io/react/docs/tutorial.html
// Accessed: April 20, 2016
// Marked: https://github.com/chjj/marked
// Accessed: April 20, 2016
var React = require('react');
var ReactDOM = require('react-dom');

var dummyData = [
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
];

var Entry = React.createClass({
  render: function() {
    return (
      <span style={entry}>
        <div style={text}>
          {this.props.winner} {this.props.result} {this.props.loser} in a game of {this.props.sport}.
        </div>
        {this.props.children}
      </span>
    );
  }
});

var Newsfeed = React.createClass({
  getDefaultProps: function() {
    return (
      {
        data: dummyData
      }
    )
  },
  render: function() {
    return (
      <div className="entry">
        <EntryMap data={this.props.data} />
      </div>
    );
  }
});

var EntryMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry) {
      return (
        <Entry winner={entry.winner} result={entry.result} loser={entry.loser} sport={entry.sport}>
          <div style={date}>
            {entry.date}
          </div>
          <div style={pic_container}>
            <img style={pic}
              src = {entry.pic_a}
            />
            <div style={score}>
              {entry.score_a}
            </div>
          </div>
          <div style={pic_container}>
            <img style={pic}
              src = {entry.pic_b}
            />
            <div style={score}>
              {entry.score_b}
            </div>
          </div>
        </Entry>
      );
    });
    return (
      <div className="entryMap">
        {vals}
      </div>
    );
  }
});

// Styling
// width value is temp, obviously
var width = window.innerWidth / 2.5;
var entry = {
  width: width,
  backgroundColor: '#E6E6E6',
  padding: 30,
  margin: 30,
  marginTop: 10,
  fontFamily: 'avenir',
  color: '#262626',
  fontSize: 20,
  display: 'block',
};
var text = {
  width: width,
  // float: 'left',
  display: 'block',
};
var date = {
//  float: 'left',
  color: '#666666',
  fontSize: 15,
  padding: 10,
  display: 'block',
};
var pic_container = {
  height: 50,
  paddingTop: 15,
  display: 'block',
};
var pic = {
  float: 'left',
  width: 45,
  height: 45,
  borderRadius: 50,
};
var score = {
  float: 'left',
  color: '#262626',
  fontSize: 25,
  marginLeft: 25,
  margin: 5,
};

//ReactDOM.render(
//  <Newsfeed data={data} />,
//  document.getElementById('newsfeed_container')
//);
export default Newsfeed;