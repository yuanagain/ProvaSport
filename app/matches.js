var React = require('react');
var ReactDOM = require('react-dom');
import './styles/menu.css';


var Matches = React.createClass({
  getDefaultProps: function() {
    // dummy match data
    var data = [{
      date:      'April 20, 2016',
      date_abbr: '04/20/2016',
      time:      '07:00 PM',
      location:  'ProClub Seattle',
      team_1:    'The Microsofties',
      team_2:    'Amazon\'s BaseBallers',
      result:    'beat',
      sport:     'baseball',
      sport_cap: 'Baseball',
      payout:    '10,000',
      win_bonus: '4,000',
      score_a:   '0 2 1 0 3 2 2 1 0',
      score_b:   '3 2 2 0 1 2 0 0 0',
      total_a:   '11',
      total_b:   '10'
    }];
    return (
      {
        data: data,
      }
    )
  },
  render: function() {
    return (
      <div style={content}>
        <img style={cover_pic}
          src = 'http://beingcovers.com/media/facebook-cover/Soccer-Stadium-facebook-covers-3555.jpg'
        />
        <div id="column_left" style={column_left}>
          <Sidebar items = {dates}/>
        </div>
        <div id="column_right" style={column_right}>
          <TitleMap data={this.props.data} />
          <h1 style={section_label}>PLAYERS</h1>
          <PlayersMap data={this.props.data} />
          <h1 style={section_label}>MATCH INFO</h1>
          <MatchMap data={this.props.data} />
          <h1 style={section_label}>SCORES</h1>
          <ScoresMap data={this.props.data} />
        </div>
      </div>
    );
  }
});

// Players layout
var PlayersEntry = React.createClass({
  render: function() {
    return (
      <span style={entry}>
        <div style={team_label_1}>
          {this.props.team_1}
        </div>
        {this.props.children}
        <div style={team_label_2}>
          {this.props.team_2}
        </div>
        {this.props.children}
      </span>
    );
  }
});

// Information layout
var MatchEntry = React.createClass({
  render: function() {
    return (
      <span style={entry}>
        <div id="data_col_left" style={info_column_left}>
          <p style={data_column_left}>Date</p>
          <p style={data_column_left}>Time</p>
          <p style={data_column_left}>Location</p>
          <p style={data_column_left}>Sport</p>
          <p style={data_column_left}>Payout</p>
          <p style={data_column_left}>Win Bonus</p>
        </div>
        <div id="data_col_right" style={info_column_right}>
          <p style={data_column_right}>{this.props.date_abbr}</p>
          <p style={data_column_right}>{this.props.time}</p>
          <p style={data_column_right}>{this.props.location}</p>
          <p style={data_column_right}>{this.props.sport_cap}</p>
          <p style={data_column_right}>{this.props.payout}</p>
          <p style={data_column_right}>{this.props.win_bonus}</p>
        </div>
        <div style={info_column_filler}>
        </div>
      </span>
    );
  }
});

// Scores layout
var ScoresEntry = React.createClass({
  render: function() {
    return (
      <span style={entry}>
        <div style={team_label_1}>
          {this.props.team_1}
        </div>
        <div style={score}>
          {this.props.score_1}
        </div>
        <div style={team_label_2}>
          {this.props.team_2}
        </div>
        <div style={score}>
          {this.props.score_2}
        </div>
      </span>
    );
  }
});

// Title layout
var TitleEntry = React.createClass({
  render: function() {
    return (
      <div style={title_div}>
        Match on {this.props.date}
      </div>
    );
  }
});

// TODO: How do I map the pics separately from var data[]?
var PlayersMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry) {
      return (
        <PlayersEntry team_1={entry.team_1} team_2={entry.team_2}>
          <div style={pic_container}>
            <img style={pic}
              src = 'http://facebook.github.io/react/img/logo_og.png'
            />
            <img style={pic}
              src = 'http://facebook.github.io/react/img/logo_og.png'
            />
            <img style={pic}
              src = 'http://facebook.github.io/react/img/logo_og.png'
            />
            <img style={pic}
              src = 'http://facebook.github.io/react/img/logo_og.png'
            />
          </div>
        </PlayersEntry>
      );
    });
    return (
      <div className="playersMap">
        {vals}
      </div>
    );
  }
});

// Match Info
var MatchMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry) {
      return (
        <MatchEntry date_abbr={entry.date_abbr} time={entry.time} location={entry.location} sport_cap={entry.sport_cap} payout={entry.payout} win_bonus={entry.win_bonus}>
        </MatchEntry>
      );
    });
    return (
      <div className="scoresMap">
        {vals}
      </div>
    );
  }
});

// Scores
var ScoresMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry) {
      return (
        <ScoresEntry team_1={entry.team_1} score_1={entry.score_a} team_2={entry.team_2} score_2={entry.score_b}>
        </ScoresEntry>
      );
    });
    return (
      <div className="matchMap">
        {vals}
      </div>
    );
  }
});

// Page title
var TitleMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry) {
      return (
        <div>
          <TitleEntry date={entry.date}>
          </TitleEntry>
        </div>
      );
    });
    return (
      <div className="matchMap">
        {vals}
      </div>
    );
  }
});

// Sidebar
var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      focused: 0,
      width: window.innerWidth,
    };
  },
  updateDimensions: function() {
    this.setState({width: $(window).width()});
  },
  componentWillMount: function() {
    this.updateDimensions();
  },
  componentDidMount: function() {
    window.addEventListener("resize", this.updateDimensions);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  clicked: function(index) {
    this.setState({
      focused: index,
    });
  },
  render: function() {
    var self = this;
    return (
      <div style={sidebar}>
        <ol> {
          this.props.items.map(function(m, index) {
            var style = '';
            if (self.state.focused == index) {
              style = 'focused';
            }
            return <li className = {
              style
            }
            onClick = {
              self.clicked.bind(self, index)
            } > {
              m
            } </li>;
          })
        }
        </ol>
      </div>
    );
  }
});



// Dummy dates
var dates = ['April 20, 2016',
             'April 18, 2016',
             'April 13, 2016',
             'April 9, 2016',
             'April 2, 2016',
             'March 31, 2016',
             'March 10, 2016',
             'February 14, 2016',
             'February 13, 2016',
             'February 11, 2016',
             'February 9, 2016',
             'January 31, 2016',
             'January 15, 2016',
             'January 14, 2016',
             'January 13, 2016',
             'January 4, 2016',
             'January 3, 2016',
             'January 2, 2016'];

// Styling
var width = window.innerWidth / 2.5;
var content = {
  paddingLeft: 50,
}
var column_left = {
  width: width / 1.5,
  height: 1250,
  float: 'left',
  marginLeft: -60,
  color: '#262626',
};
var column_right = {
  width: width - width / 1.5,
  float: 'left',
  paddingLeft: 30,
  color: '#262626',
};
var info_column_left = {
  float: 'left',
  width: 150,
  height: 200,
  marginRight: 10,
  color: '#262626',
};
var info_column_right = {
  float: 'left',
  height: 200,
  color: '#262626',
};
var info_column_filler = {
  height: 200,
  width: 200,
};
var data_column_left = {
  fontFamily: 'avenir',
  fontWeight: 500,
  fontSize: 25,
  padding: 0,
  color: '#262626',
};
var data_column_right = {
  fontFamily: 'avenir',
  fontWeight: 200,
  fontSize: 25,
  padding: 0,
  color: '#262626',
};
var entry = {
  width: width,
  backgroundColor: '#E6E6E6',
  padding: 30,
  margin: 30,
  fontFamily: 'avenir',
  color: '#262626',
  fontSize: 20,
  display: 'block',
};
var text = {
  width: width,
  display: 'block',
  color: '#262626',
};
var date = {
  color: '#666666',
  fontSize: 15,
  padding: 10,
  display: 'block',
};
var pic_container = {
  height: 50,
  paddingLeft: 15,
  paddingTop: 15,
};
var pic = {
  float: 'left',
  marginRight: 7,
  width: 45,
  height: 45,
  borderRadius: 50,
};
var cover_pic = {
  width: window.innerWidth,
  height: 200,
  marginLeft: -60,
  padding:0,
};
var section_label = {
  fontFamily: 'avenir',
  fontWeight: 200,
  paddingTop: 28,
  paddingLeft: 28,
  width: 300,
  color: '#262626',
};
var title_div = {
  width: 700,
  fontFamily: 'avenir',
  fontWeight: 400,
  fontSize: 45,
  paddingTop: 18,
  color: '#262626',
};
var team_label_1 = {
  display: 'block',
  fontFamily: 'avenir',
  fontWeight: 500,
  fontSize: 25,
  color: '#262626',
};
var team_label_2 = {
  display: 'block',
  paddingTop: 15,
  fontFamily: 'avenir',
  fontWeight: 500,
  fontSize: 25,
  color: '#262626',
};
var score = {
  fontSize: 25,
  paddingLeft: 20,
  paddingTop: 10,
  color: '#262626',
};
var left_data = {
  width: entry/2.5,
  float: 'left',
  fontFamily: 'avenir',
  fontWeight: 400,
  fontSize: 25,
  color: '#262626',
};
var right_data = {
  width: entry/2.5,
  fontFamily: 'avenir',
  fontWeight: 200,
  fontSize: 25,
  color: '#262626',
};
var sidebar = {
  width: 250,
  float: 'left',
  flex: 10,
  fontFamily: 'avenir',
  fontSize: 18,
  color: '#262626',
};
var sidebar_item = {
  display: 'block',
  padding: 20,
  paddingLeft: 300,
  cursor: 'pointer',
  transition: 0.15,
  fontSize: 18,
  color: '#262626',
};

export default Matches;