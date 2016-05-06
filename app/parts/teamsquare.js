import React from 'react';
import TeamBrick from './teambrick'

import _cstyles from '../constants/customstyles'
import _cvals from '../constants/customvals'
import defaults from '../constants/defaults'


var TeamSquare = React.createClass({

  onPress: function() {
    // var ProfilePage = require('../screens/profilepage')
    // this.props.navigator.push({
    //   id: "ProfilePage" + String(_ctools.randomKey()),
    //   component: ProfilePage,
    //   passProps: {
    //     navigator: this.props.navigator,
    //     playerid: this.props.playerid
    //   }
    // })
  },

  getInitialState: function() {
    return (
      {
        team: defaults.default_team,
        //loaded: false,
        // Changed to true for testing
        loaded: true,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        teamid: -1,
      }
    )
  },
  render: function() {
    var {
      teamid,
    } = this.props;

    if (this.state.loaded == false) {
      return (<div></div>)
    }

    return (
      <div style={styles.teamsquare}>
        <div style={[styles.icon, ]}>
          <img style={styles.im}
                 src='http://facebook.github.io/react/img/logo_og.png'/>
          <p style={_cstyles.detail_text}>
            {this.state.team.name}
          </p>
        </div>
      </div>
    );
  },

  fetchTeam: function(data) {
    this.setState({loaded : true})
    this.setState({team : data})
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
  teamsquare: {
    display: 'flex',
    height: _cvals.slength,
    //width: slength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  im: {
    height: _cvals.thumbslength,
    width: _cvals.thumbslength,
    borderRadius: _cvals.thumbslength / 2,
    marginRight: 4,
    float: 'left',
  },
  icon: {
    display: 'flex',
    height: _cvals.slength,
    width: _cvals.slength,
    marginHorizontal: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}
export default TeamSquare;