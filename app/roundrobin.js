import React from 'react';

import TeamBrick from './parts/teambrick';
import MatchBrick from './parts/matchbrick';
import ScoreSquare from './parts/scoresquare';
import TeamSquare from './parts/teamsquare';
import PlayerBrick from './parts/playerbrick';

import _cvals from './constants/customvals';

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
      return (
          <div style={[styles.match, styles.border]}>
            <ScoreSquare matchid={this.state.item}/>
          </div>
        )
    }
    if (this.state.type == 'icon') {
      return (
          <div style={styles.icon}>
            <TeamSquare teamid={this.state.item} />
          </div>
        )
    }
    if (this.state.type == 'empty') {
      return (
          <div style={[styles.match, styles.border]}>
            <div style={[styles.icon, ]}>
              <p style={styles.standard_text}>
                {""}
              </p>
            </div>
          </div>
        )
    }
    if (this.state.type == 'player') {
      return (
          <div style={[styles.player, styles.border]}>
            <PlayerBrick playerid={this.state.item}/>
          </div>
        )
    }
    if (this.state.type == 'team') {
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

    var renderMatch = (data) => <RRMatchSquare data={data} key={randomKey()} />;
    return (
      <div style={styles.matchrow}>
        {this.props.matchrow.map(renderMatch)}
      </div>
      )
  }
})

var RoundRobin = React.createClass({

  getInitialState: function() {
    var rr1 = {
      teams: [1, 0, 1, 0, 1],
      matches: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    }
    return (
      {
        mode: 'normal',
        matches: RRMatrix(rr1),
        scrollstyle: styles.scroll,
      }
    );
  },

  render: function() {
    var {
      matches,
      style,
    } = this.props;

    var tslength = _cvals.slength + 2
    var height = this.state.matches.length * tslength
    var width = height + tslength * 1.5

    var renderRow = (matchrow) => <RRMatchRow matchrow={matchrow}
                                              key={randomKey()} />;
    return (
      <div style={styles.content}>
        <div style={[styles.scroll,
                    this.props.style]}>
          {this.state.matches.map(renderRow)}
        </div>
      </div>
    );
  },
});

var randomKey = function() {
  return Math.random(1, 2^32 - 1)
}

var RRMatrix = function(tournament) {
  var teams = tournament.teams
  var matches = tournament.matches
  var matrix = []
  var k = 0
  for (var i = 0; i < teams.length + 1; i++) {
    var row = []
    for (var j = 0; j < teams.length + 1; j++) {
      if (i == 0) {
        if (j == 0) {
          row.push({'item': false, 'type': 'blank'})
        }
        else {
          row.push({'item': teams[j - 1], 'type': 'icon'})
        }
      }
      else {
        if (j == 0) {
          row.push({'item': teams[i - 1], 'type': 'team'})
        }
        else if (i == j) {
          row.push({'item': 0, 'type': 'empty'})
        }
        else if (i < j) {
          row.push({'item': matches[k], 'type': 'match'})
          k++
        }
        else if (i > j) {
          row.push(matrix[j][i])
        }
      }
    }
    matrix.push(row)
  }
  return matrix
}

var styles = {
  standard_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: _cvals.mainfont,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    opacity: 1.00,
    margin: 1,
  },
  content: {
    float: 'left',
    marginTop: 75,
    marginLeft: 20,
  },
  match: {
    display: 'flex',
    height: _cvals.slength,
    width: _cvals.slength,
    marginHorizontal: 1,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    height: _cvals.slength,
    width: _cvals.slength,
    marginHorizontal: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  player: {
    display: 'flex',
    height: _cvals.slength,
    width: 2.5 * _cvals.slength,
    marginHorizontal: 1,
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
}

export default RoundRobin;