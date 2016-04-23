import React from 'react';

import TeamBrick from './parts/teambrick';
import MatchBrick from './parts/matchbrick';

var getForkMargin = function(level) {
  var mult = 0;
  for (var i = 0; i < level; i++) {
    mult += Math.pow(2, i - 1)
  }
  return mult * (brickheight + 1)
}

var getForkHeight = function(level) {
  return Math.pow(2, level) * (brickheight + 1) + 1
}

var Fork = React.createClass({
  getInitialState: function() {
    // var fmargin = defaultHeight * (Math.pow(3, (this.props.level - 1))) / 2
    // var fheight = defaultHeight  * (Math.pow(2, (this.props.level)))
    var fmargin = getForkMargin(this.props.level)
    var fheight = getForkHeight(this.props.level)

    return (
      {
        match: this.props.data,
        fmargin: fmargin,
        fheight: fheight,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        level: 0,
      }
    )
  },

  render: function() {
    var {
      data,
      level,
      navigator,
    } = this.props;

    var bricks = []
    for (var i = 0; i < 2; i++) {
      if (this.props.level == 0) {
        bricks.push(
          <TeamBrick teamid={this.props.data[i]}/>
          )
      }
      else {
        bricks.push(
         <MatchBrick matchid={this.props.data[i]}/>
        )
      }
    }

    return (
      <div style={[fork_styles.fork_wrapper, {marginVertical: 0}]}>
        <div style={[fork_styles.fork, ]}>
          <div style={[{marginVertical: this.state.fmargin}]}>
            {bricks[0]}
            <div style={[fork_styles.hline]}></div>
          </div>
          <div style={[{marginVertical: this.state.fmargin}]}>
            {bricks[1]}
            <div style={[fork_styles.hline]}></div>
          </div>
        </div>
        <div style={fork_styles.vline_wrapper}>
          <div style={[fork_styles.vline,
                        {height: this.state.fheight,
                         marginBottom: this.state.fmargin,
                         marginLeft: 0}]}>
          </div>
        </div>
      </div>
    )
  }
});

var ForkColumn = React.createClass({
  render: function() {
    var {
      column,
      level,
    } = this.props;

    var forks = [];
    for (var i = 0; i < this.props.column.length; i++) {
      forks.push(<Fork level={this.props.level}
                       data={this.props.column[i]}
                       key={i} />);
    }
    return (
      <div style={styles.column}>
        {forks}
      </div>
    )
  }
})

var t3 = {
  teams: [1, 0, 1, 0],
  matches: [1, 0, 1, 0],
}

var bracketMatrix = function(tournament) {
  var teams = tournament.teams
  var matches = tournament.matches
  var matrix = [[]]
  var k = 0
  var depth = Math.ceil(Math.log(teams.length) / Math.log(2))

  // populate first layer of forks with teams
  for (var i = 0; i < teams.length; i += 2) {
    matrix[0].push([teams[i], teams[i + 1]])
  }

  for (var j = 1; j < depth; j++) {
    var col = []

    var cap = Math.pow(2, depth - j)

    for (var i = 0; i < cap; i += 2) {
      col.push([matches[k], matches[k + 1]])
      k += 2
    }
    matrix.push(col)
  }
  matrix.push(tournament.matches[matches.length - 1])
  return matrix
}

var Bracket = React.createClass({

  getInitialState: function() {
    return (
      {
        mode: 'normal',
        //matches: this.props.matches,
        matches: bracketMatrix(t3),
        scrollstyle: styles.scroll,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        matches: bracketMatrix(t3),
      }
    )
  },

  render: function() {
    var {
      matches,
    } = this.props;

    var tslength = slength + 2
    var height = Math.pow(2, this.props.matches.length - 1) * (brickheight + 1)
    var width = bricklength * (this.state.matches.length) + 20

    var columns = [];
    for (var i = 0; i < this.props.matches.length - 1; i++) {
        columns.push(<ForkColumn level={i}
                        column={this.props.matches[i]}
                        key={i} />);
    }

    return (
        <div>
            <div style={styles.container}>
            {columns}
            <Final data={this.props.matches[this.props.matches.length - 1]}
                   level={this.props.matches.length - 1}
                   marginBottom={height / 2} />
            </div>
        </div>
    );
  },
});

var Final = React.createClass({
  getInitialState: function() {
    // TODO: CHECK MATH HERE
    var fmargin = getForkMargin(this.props.level)
    var fheight = getForkHeight(this.props.level)

    if (this.props.level == 0) {
      fmargin = 0
    }

    return (
      {
        match: this.props.data,
        fmargin: fmargin,
        fheight: fheight,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        level: 0,
      }
    )
  },

  render: function() {
    var {
      data,
      level,
      marginBottom,
    } = this.props;

    return (
      <div style={styles.column}>
      <div style={[styles.fork_wrapper, ]}>
        <div style={[styles.fork ]}>
          <div style={[{marginTop: this.state.fmargin}]}>
            <MatchBrick matchid={this.props.data}/>
            <div style={styles.hline}></div>
          </div>
        </div>
      </div>
      </div>
    )
  }
});


// TODO: Make universal
var mainfont = 'avenir';
var slength = 75;
var bricklength = slength * 2.5 - 2;
var brickheight = ((slength) * 3 / 5 - 4);

var fork_styles = {
  fork_wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 0,
    flex: 1,
  },
  fork: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flex: 1,
  },
  vline_wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 1,
    alignSelf: 'flex-end',
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  hline: {
    width: bricklength,
    flex: 1,
    backgroundColor: 'black',
    height: 1,
    zIndex: 1,
  },
  vline: {
    //marginVertical: 1
    flex: 1,
    backgroundColor: 'black',
    width: 1,
    zIndex: 1,
  },
};

var styles = {
  scroll: {
    justifyContent: 'center'
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 1,
  },
  fork_wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 0,
    flex: 1,
  },
  fork: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flex: 1,
  },
  vline_wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 1,
    alignSelf: 'flex-end',
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  hline: {
    width: bricklength,
    flex: 1,
    backgroundColor: 'black',
    height: 1,
  },
  vline: {
    //marginVertical: 1
    flex: 1,
    backgroundColor: 'black',
  }
}

export default Bracket;