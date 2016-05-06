import React from 'react';

import _cstyles from '../constants/customstyles'
import _cvals from '../constants/customvals'
import defaults from '../constants/defaults'

var PlayerBrick = React.createClass({

/*
  onPress: function() {
    var ProfilePage = require('../screens/profilepage')
    this.props.navigator.push({
      id: "ProfilePage" + String(_ctools.randomKey()),
      component: ProfilePage,
      passProps: {
        navigator: this.props.navigator,
        playerid: this.props.playerid
      }
    })
  },
*/
  getInitialState: function() {
    return (
      {
        player: defaults.default_player,
        loaded: true,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        playerid: -1,
      }
    )
  },
  render: function() {
    var {
      playerid,
    } = this.props;

    if (this.state.loaded == false) {
      return (<div></div>)
    }

    return (
      <div style={styles.playerbrick}>
        <div style={[styles.center, styles.left]} >
          <img style={styles.im}
                 src='http://facebook.github.io/react/img/logo_og.png'/>
        </div>
        <div style={styles.right}>
          <div >
            <p style={[_cstyles.detail_text]}>{this.state.player.name.first}</p>
          </div>
          <div style={styles.compress}>
            <p style={[_cstyles.detail_text, {fontWeight: 'bold'}]}>{this.state.player.name.last}</p>
          </div>
        </div>
      </div>
    );
  },

  fetchPlayer: function(data) {
    this.setState({loaded : true})
    this.setState({player : data})

  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    //Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },

  componentWillReceiveProps: function(nextProps) {
    //Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },
});

var styles = {
  playerbrick: {
    height: _cvals.brickheight,
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
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  matchrow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    margin: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  compress: {
    marginTop: -4
  }
}

module.exports = PlayerBrick;