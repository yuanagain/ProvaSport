var React = require('react');

var _cvals = require('../constants/customvals');
var _cstyles  = require('../constants/customstyles');
var defaults  = require('../constants/defaults');
import {Link} from 'react-router';

import * as Player from '../modules/player';
import default_pic from '../styles/default_pic.jpg';

var PlayerRow = React.createClass({

  getInitialState: function() {
    return (
      {
        player: Player.default_player,
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
    var pic = this.state.player.prof_pic
    if (this.state.player.prof_pic == "Loading")
      pic = default_pic

      return (
        <Link to="/profile" query={{ playerid: this.props.playerid }}>
          <div style={styles.playerbrick} >
            <div style={[styles.center, styles.left]} >
              <img style={styles.im}
                     src={pic}/>
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

  fetchPlayer: function(data) {
    this.state.player = data
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },
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
    border: 'solid',
    borderWidth: 1,
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