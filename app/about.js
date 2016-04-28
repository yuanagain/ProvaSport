var React = require('react');
var ReactDOM = require('react-dom');

var _cvals = require('./constants/customvals')

var About = React.createClass({
  render: function() {
    return (
      <div style={content}>
        <div style={header}>
          <p style={title}>This is ProvaSport:</p>
          <p style={subtitle}>a free tournament manager for iOS, Android, and web.</p>
        </div>
        <div style={overview}>
          <p style={title}>No skill? No problem.</p>
          <p style={subtitle}> ProvaSport is for everyone who plays the sport they love,</p>
          <p style={subtitle}> from the little leagues to the pros.</p>
          <p style={title}>We put</p>
          <p style={subtitle_orange}>tournament management,</p>
          <p style={subtitle_orange}>stat tracking, and</p>
          <p style={subtitle_orange}>matchmaking</p>
          <p style={title}>into the hands of every athlete.</p>
        </div>
        <div style={details}>
          <div style={column_left}>
            <div style={icon_container}>
              <img style={icon}
                src = 'https://cdn3.iconfinder.com/data/icons/linies-small/64/trophy-512.png'
              />
            </div>
            <div style={icon_container}>
              <img style={icon}
                src = 'https://cdn4.iconfinder.com/data/icons/tupix-1/30/graph-512.png'
              />
            </div>
            <div style={icon_container}>
              <img style={icon}
                src = 'https://cdn4.iconfinder.com/data/icons/eldorado-user/40/best_friends-512.png'
              />
            </div>
          </div>
          <p style={title_mini}>Tournament Management</p>
          <p style={description}>Create elimination brackets and round robin playoffs, report match results, and watch the tournament update itself.</p>
          <p style={title_mini}>Stat Tracking</p>
          <p style={description}>Let our analytics track your performance progression, and how you stack up against the local competition.</p>
          <p style={title_mini}>Matchmaking</p>
          <p style={description}>No team? No worries! We can find you teammates and opponents that fit your skill level, schedule, and playstyle—in any sport.</p>
        </div>
        <div style={footer}>
          <p style={title}>Interested? You should be.</p>
          <div style={get_started}>
            Get Started
          </div>
        </div>
      </div>
    );
  }
});

// Styling: first section
var header = {
  height: 240,
  marginLeft: -60,
  color: _cvals.skorange,
  fontFamily: _cvals.mainfont
};
var title = {
  fontSize: 80,
  fontWeight: 400,
  paddingLeft: 50,
  paddingTop: 40,
  margin: 0,
};
var subtitle = {
  fontSize: 30,
  fontWeight: 300,
  paddingLeft: 120,
  margin: 0,
};

var content = {
  marginLeft: 50,
}

// Styling: second section
var overview = {
  width: window.innerWidth,
  height: 675,
  margin: 0,
  marginLeft: -60,
  backgroundColor: 'white',
  color: _cvals.skgray,
  fontFamily: _cvals.mainfont,
  backgroundColor: _cvals.skbackground,
};
var subtitle_orange = {
  fontSize: 30,
  fontWeight: 300,
  margin: 0,
  paddingLeft: 120,
  color: _cvals.skorange,
};

// Styling: third section
var details = {
  height: 750,
  marginLeft: -60,
  backGroundColor: 'white',
  color: _cvals.skgray,
  fontFamily: _cvals.mainfont,
  margin: 0,
};
var column_left = {
  float: 'left',
  height: 600,
  width: 300,
};
var title_mini = {
  fontWeight: 400,
  fontSize: 40,
  paddingTop: 0,
};
var description = {
  fontWeight: 300,
  fontSize: 30,
  color: '#F5A623',
};
var icon_container = {
  width: 80,
  height: 80,
  paddingLeft: 150,
  paddingTop: 50,
  paddingBottom: 75,
};
var icon = {
  width: 80,
  height: 80,
};

// Styling: fourth section
var footer = {
  width: window.innerWidth,
  height: 300,
  marginLeft: -60,
  backgroundColor: _cvals.skbackground,
  color: _cvals.skorange,
  fontFamily: _cvals.mainfont,
};
var get_started = {
  width: 165,
  height: 50,
  fontSize: 30,
  cursor: 'pointer',
  color: 'white',
  backgroundColor: _cvals.skblue,
  marginLeft: 475,
  marginTop: 20,
  paddingTop: 20,
  paddingBottom: 10,
  paddingLeft: 25,
  paddingRight: 20,
};

export default About;