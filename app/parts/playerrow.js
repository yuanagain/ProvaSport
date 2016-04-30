var React = require('react');

var _cvals = require('../constants/customvals');
var _cstyles  = require('../constants/customstyles');
var defaults  = require('../constants/defaults');

var PlayerRow = React.createClass({

  getInitialState: function() {
    return (
      {
        player: defaults.default_player,
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
      /*return (
        <div style={styles.playerbrick} >
          <div style={[styles.center, styles.left]} >
            <im style={styles.im}
                   src="http://facebook.github.io/react/img/logo_og.png"/>
          </div>
          <div style={styles.right}>
            <div >
              <p style={styles.header_text}>{this.state.player.name.full} </p>
            </div>
          </div>
        </div>
      )*/

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
    //Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },

  componentWillReceiveProps: function(nextProps) {
    //Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },
});

var styles = {
  playerbrick: {
    display: 'flex',
    height: 50,
    width: 300,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 4,
  },
  im: {
    height: _cvals.thumbslength,
    width: _cvals.thumbslength,
    borderRadius: _cvals.thumbslength / 2,
    marginHorizontal: 4,
  },
  name: {
    fontFamily: _cvals.mainfont,
    fontSize: 18,
    paddingLeft: 10,
    margin: 0,
    lineHeight: 2.5,
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