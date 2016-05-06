import React from 'react';
import Newsfeed from './newsfeed'
var Button = require('react-bootstrap/lib/Button');
import {Link} from 'react-router';

import _cvals from './constants/customvals'
import * as Player from './modules/player'
import * as Match from './modules/match'
import default_pic from './styles/default_pic.jpg';

var Profile = React.createClass({
  getInitialState: function() {
    let { query } = this.props.location
    return (
      {
        playerid: query.playerid,
        player: Player.default_player,
      }
    );
  },

  fetchPlayer: function(data) {
    this.setState({player : data})
  },

  componentDidMount: function() {
    Player._GetPlayer(this.state.playerid, this.fetchPlayer)
  },

  render: function() {
    var pic = this.state.player.prof_pic
    if (this.state.player.prof_pic == "Loading")
      pic = default_pic
    return (
      <div>
        <div className="profile" style={header}>
        </div>
        <div style={headerContents}>
          <div style={image}>
            <img src={pic} style={image}/>
            <Link  to="/matches" query={{ matches: this.state.player.matches }}>
              <Button style={matchesButton}>
                View Past Matches
              </Button>
            </Link>
          </div>
          <p style={name}> {this.state.player.name.full}</p>
        </div>
        <div style={content}>
          <InfoBlock player={this.state.player}/>
          <StatBlock player={this.state.player}/>
        </div>
      </div>
    );
  }
});

var InfoBlock = React.createClass({
  getInitialState: function() {
    return (
      {
        player: Player.default_player,
      }
    );
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      player: nextProps.player
    });
  },

  render: function() {
    var {
      player,
    } = this.props;

    return (
      <div style={infoBlock}>
        <p style={blockTitle}> PERSONAL INFO </p>
        <div style={info}>
          <InfoRow title="Country" contents={this.state.player.nationality}/>
          <InfoRow title="Location" contents={this.state.player.home}/>
          <InfoRow title="Sports" contents={this.state.player.sports}/>
        </div>
      </div>
    );
  }
});

var StatBlock = React.createClass({
  getInitialState: function() {
    return (
      {
        player: Player.default_player,
      }
    );
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      player: nextProps.player
    });
  },

  render: function() {
    var {
      player,
    } = this.props;
    console.log(this.props.player)
    return (
      <div style={statBlock}>
        <p style={blockTitle}> STATS </p>
        <div style={stats}>
          <InfoRow title="Friends" contents={this.state.player.friends.length}/>
          <InfoRow title="Teams" contents={this.state.player.teams.length}/>
          <InfoRow title="Matches Played" contents={this.state.player.matches.length}/>
        </div>
      </div>
    );
  }
});

var InfoRow = React.createClass({
  getInitialState: function() {
    return (
      {
        contents: null,
      }
    );
  },

  componentWillReceiveProps: function(nextProps) {
    var contents = nextProps.contents
    if (contents) {
      if (contents.constructor === Array) {
        this.setState({
          contents: contents.join(", ")
        });
      }
      else {
        this.setState({
          contents: contents
        });
      }
    }
  },

  render: function() {

    return (
      <div style={infoRow}>
        <div style={rowTitle}>
          <p style={rowTitleText}> {this.props.title}</p>
        </div>
        <div style={rowContents}>
          <p style={rowContentsText}> {this.state.contents} </p>
        </div>
      </div>

    );
  }
});

var titleFontSize = 24;
var leftMargin = 35;

var header = {
  width: 1320,
  height: 125,
  backgroundColor: 'gray',
  position: 'relative',
  zIndex: -1,
  marginLeft: -60
};

var headerContents = {
  marginLeft: leftMargin,
  marginTop: -85,
  zIndex: 1,
}

var image = {
  width: 150,
  height: 150,
  borderRadius: 75,
  backgroundColor: 'black',
  border: 'solid',
  borderWidth: 2,
};

var name = {
  fontFamily: _cvals.mainfont,
  color: 'white',
  fontSize: 36,
  paddingLeft: 175,
  marginTop: -130,
};

var content = {
  marginTop: 100,
  marginLeft: leftMargin,
  display: 'block',
};

var infoBlock = {
  float: 'left',
  display: 'block',
}

var info = {
  width: 350,
  backgroundColor: _cvals.skbackground,
  float: 'left',
  paddingBottom: 15,
}

var statBlock = {
  display: 'inline-block',
  paddingLeft: 75,
}

var stats = {
  width: 350,
  backgroundColor: _cvals.skbackground,
  float: 'right',
  paddingBottom: 15,
}

var blockTitle = {
  fontColor: 'white',
  fontFamily: _cvals.mainfont,
  fontSize: titleFontSize,
  paddingBottom: 10,
}

var infoRow = {
  paddingBottom: 0,
  display: 'block',
  clear: 'both',
}

var rowTitle = {
  float: 'left',
  paddingRight: 10,
}

var rowTitleText = {
  fontFamily: _cvals.mainfont,
  fontSize: 18,
  paddingLeft: 20,
  fontWeight: 700
}

var rowContents = {
  float: 'left',
  paddingRight: 10,
}

var rowContentsText = {
  fontSize: 18,
  fontFamily: _cvals.mainfont,
}

var newsfeedContainer = {
  paddingLeft: 5,
  marginTop: 20,
}

var newsfeedTitle = {
  fontFamily: _cvals.mainfont,
  fontSize: titleFontSize,
  paddingLeft: leftMargin,
  paddingTop: 25,
}

var matchesButton = {
    height: 40,
    width: 200,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: _cvals.skorange,
    marginLeft: 175,
    marginTop: -50,
    fontFamily: _cvals.mainfont,
    fontSize: 18,
}


export default Profile;