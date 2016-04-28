import React from 'react';

import _cstyles from '../constants/customstyles'
import _cvals from '../constants/customvals'
import defaults from '../constants/defaults'

var TeamBrick = React.createClass({

  toTeamPage: function() {
    if (this.props.disabled) {
      return
    }
    /*var TeamPage = require('../screens/teampage')
    this.props.navigator.push({
      id: "TeamPage" + String(_ctools.randomKey()),
      component: TeamPage,
      passProps: {
        navigator: this.props.navigator,
        teamid: this.props.teamid
      }
    })*/
  },

  toPlayerPage: function() {
    /*var ProfilePage = require('../screens/profilepage')
    this.props.navigator.push({
      id: "ProfilePage" + String(_ctools.randomKey()),
      component: ProfilePage,
      passProps: {
        navigator: this.props.navigator,
        playerid: this.state.team.players[0]
      }
    })*/
  },

  getInitialState: function() {
    return (
      {
        team: defaults.default_team,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        teamid: -1,
        disabled: false,
      }
    )
  },
  render: function() {
    var {
      teamid,
      disabled,
    } = this.props;

    if (this.props.disabled || this.state.team.name == 'BYE ') {
      return (
        <div style={styles.teambrick}>
          <div style={[styles.center, styles.left]} >
            <img style={styles.im}
                 src='http://facebook.github.io/react/img/logo_og.png'/>
          </div>
          <div style={styles.right}>
              <p style={_cstyles.detail_text}>
                    {this.state.team.name}
              </p>
          </div>
        </div>
        )
    }

    return (
      <div style={styles.teambrick}
                        onPress={() => this.toTeamPage()}>
        <div style={[styles.center, styles.left]} >
            <img style={styles.im}
                 src='http://facebook.github.io/react/img/logo_og.png'/>
        </div>
        <div style={styles.right}>
            <p style={_cstyles.detail_text}>
                  {this.state.team.name}
            </p>
        </div>
      </div>
    );
  },

  fetchTeam: function(data) {
    this.state.team = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    //Team._GetTeam(this.props.teamid, this.fetchTeam)
  },

  componentWillReceiveProps: function(nextProps) {
    //Team._GetTeam(nextProps.teamid, this.fetchTeam)
  },
});

var styles = {
  teambrick: {
    display: 'flex',
    height: _cvals.brickheight,
    width: _cvals.bricklength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 4,
  },
  im: {
    height: _cvals.thumbslength,
    width: _cvals.thumbslength,
    borderRadius: _cvals.thumbslength / 2,
    marginRight: 4,
    float: 'left',
  },
  left:{
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: _cvals.thumbslength + 5,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default TeamBrick;