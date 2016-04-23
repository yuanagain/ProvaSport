import React from 'react';

import TeamBrick from './teambrick';
import MatchBrick from './matchbrick';


var RRMatchSquare = React.createClass({
  getInitialState: function() {
    return (
    {
      type: this.props.data['type'],
      item: this.props.data['item'],
    }
    );
  },
  render: function() {
    var {
      data,
    } = this.props;

    if (this.state.type == 'match') {
      var ScoreSquare = require('./scoresquare')
      return (
        <div style={[styles.match, styles.border]}>
          <ScoreSquare matchid={this.state.item}/>
        </div>
        )
    }
    if (this.state.type == 'icon') {
      var TeamSquare = require('./teamsquare')
      return (
        <div style={[styles.icon, ]}>
          <TeamSquare teamid={this.state.item} />
        </div>
        )
    }
    if (this.state.type == "empty") {
      return (
        <div style={[styles.match, styles.border]}>
          <div style={[styles.icon, ]}>
            <p style={[_cstyles.standard_text]}>
              {""}
            </p>
          </div>
        </div>
        )
    }
    if (this.state.type == 'player') {
      var PlayerBrick = require('./playerbrick')
      return (
        <div style={[styles.player, styles.border]}>
          <PlayerBrick playerid={this.state.item}/>
        </div>
        )
    }
    if (this.state.type == 'team') {
      var TeamBrick = require('./teambrick')
      return (
        <div style={[styles.player, styles.border]}>
        <TeamBrick teamid={this.state.item}/>
        </div>
        )
    }
    return (
      <div style={[styles.match, ]}>

      </div>
      )
  }
});

var RRMatchRow = React.createClass({
  render: function() {
    var {
      matchrow,
    } = this.props;

    var renderMatch = (data) => <RRMatchSquare data={data} key={_ctools.randomKey()} />;
    return (
      <div style={styles.matchrow}>
        {this.props.matchrow.map(renderMatch)}
      </div>
      )
  }
})

var RoundRobin = React.createClass({

  getInitialState: function() {
    return (
    {
      mode: 'normal',
      matches: this.props.matches,
      scrollstyle: styles.scroll,
    }
    );
  },

  render: function() {
    var {
      matches,
      style,
      ...props
    } = this.props;

    var tslength = slength + 2 * _cvals.dscale
    var height = this.state.matches.length * tslength
    var width = height + tslength * 1.5

    var renderRow = (matchrow) => <RRMatchRow navigator={this.props.navigator}
    matchrow={matchrow}
    key={_ctools.randomKey()} />;
    return (
      <div>
        <div style={[styles.scroll,
                    {width: windowSize.width},
                    this.props.style]}>
          {this.state.matches.map(renderRow)}
        </div>
      </div>
    );
  },
});

// TODO: Make universal
var mainfont = 'avenir';
var slength = 75;
var bricklength = slength * 2.5 - 2;
var brickheight = ((slength) * 3 / 5 - 4);


var fork_styles = {

};

var styles = {

}

export default RoundRobin;