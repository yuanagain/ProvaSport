var React = require('react');

var _cvals = require('../constants/customvals');
var _cstyles  = require('../constants/customstyles');
var defaults  = require('../constants/defaults');
import {Link} from 'react-router';

import * as Player from '../modules/player';

var PlayerRow = React.createClass({

  getInitialState: function() {
    return (
      {
        player: Player.default_player,
        // Temp
        //loaded: false,
        loaded: true,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        playerid: -1,
        dead: false,
      }
    )
  },
  render: function() {
    var {
      playerid,
    } = this.props;
      return (
        <Link to="/profile" query={{ playerid: this.props.playerid }}>
          <div style={styles.playerbrick} >
            <div style={[styles.center, styles.left]} >
              <img style={styles.im}
                     src={this.state.player.prof_pic}/>
            </div>
            <div style={styles.right}>
              <div >
                <p style={styles.name}>{this.state.player.name.full}</p>
              </div>
            </div>
          </div>
        </Link>
      )
    },
/*
      return (
        <div style={styles.playerbrick} >
          <div style={[styles.center, styles.left]} >
            <img style={styles.im}
                   src='http://facebook.github.io/react/img/logo_og.png'/>
          </div>
          <div style={styles.right}>
            <div >
              <p style={styles.name}>Jeremiah Jenkins</p>
            </div>
          </div>
        </div>
      )
    },
*/
  onPress: function() {
    /*var PlayerPage = require('../screens/playerpage')
    this.props.navigator.push({
      id: "PlayerPage" + String(_ctools.randomKey()),
      component: PlayerPage,
      passProps: {
        navigator: this.props.navigator,
        playerid: this.props.playerid
      }
    })*/
  },

  fetchPlayer: function(data) {
    this.state.player = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },
/*
  componentWillReceiveProps: function(nextProps) {
    Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },*/
});

var styles = {
  playerbrick: {
    display: 'flex',
    height: 75,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 25,
  },
  im: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 4,
  },
  name: {
    fontFamily: _cvals.mainfont,
    fontSize: 28,
    fontColor: "#626771",
    paddingLeft: 10,
    margin: 0,
    textDecoration: 'none',
  },
  left:{
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {
    justifyContent: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  matchrow: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    margin: 1
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

module.exports = PlayerRow;