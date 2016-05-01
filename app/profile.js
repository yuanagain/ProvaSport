import React from 'react';
import Newsfeed from './newsfeed'

import _cvals from './constants/customvals'
import * as Player from './modules/player'

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

  componentDidMount: function () {
    Player._GetPlayer(this.state.playerid, this.fetchPlayer)
  },

  render: function() {
    return (
      <div>
        <div className="profile" style={header}>
        </div>
        <div style={headerContents}>
          <div style={image}>
            <img src={this.state.player.prof_pic} style={image}/>
          </div>
          <p style={name}> {this.state.player.name.full}</p>
        </div>
        <div style={content}>
          <InfoBlock player={this.state.player}/>
          <StatBlock player={this.state.player}/>
        </div>
        <div style={newsfeedContainer}>
          <p style={newsfeedTitle}> ACTIVITY </p>
        </div>
      </div>
    );
  }
});

var InfoBlock = React.createClass({

  render: function() {
    var {
      player,
    } = this.props;

    return (
      <div style={infoBlock}>
        <p style={blockTitle}> PERSONAL INFO </p>
        <div style={info}>
          <InfoRow title="Country" contents={this.props.player.nationality}/>
          <InfoRow title="Location" contents={this.props.player.home}/>
          <InfoRow title="Sports" contents={this.props.player.sports}/>
        </div>
      </div>
    );
  }
});

var StatBlock = React.createClass({

  render: function() {
    var {
      player,
    } = this.props;

    return (
      <div style={statBlock}>
        <p style={blockTitle}> STATS </p>
        <div style={stats}>
          <InfoRow title="Account" contents={this.props.player.earnings[0].cash}/>
          <InfoRow title="Experience" contents={this.props.player.earnings[0].xp}/>
          <InfoRow title="Friends" contents={this.props.player.friends.length}/>
          <InfoRow title="Trophies" contents={this.props.player.earnings[0].trophies}/>
        </div>
      </div>
    );
  }
});

var InfoRow = React.createClass({

  render: function() {
    return (
      <div style={infoRow}>
        <div style={rowTitle}>
          <p style={rowTitleText}> {this.props.title}</p>
        </div>
        <div style={rowContents}>
          <p style={rowContentsText}> {this.props.contents} </p>
        </div>
      </div>

    );
  }
});

var titleFontSize = 24;
var leftMargin = 35;

var header = {
  width: 2000,
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


//ReactDOM.render(
//  <Profile/>,
//  document.getElementById('profile_container')
//);
export default Profile;