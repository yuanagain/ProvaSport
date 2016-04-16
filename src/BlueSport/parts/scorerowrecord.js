'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var _cvals = require('../styles/customvals')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
} = React;

var rowheight = 100

var ScoreRowRecord = React.createClass({
  getInitialState: function() {
    return (
      {
        editable: true,
        score1: this.props.scores[0],
        score2: this.props.scores[1]
      }
    );
  },
  render: function() {
    var {
      scores,
      ...props
    } = this.props;

    if (this.state.editable) {
      return (
        <View style={styles.container}>
          <View style={styles.content_container}>
            <TextInput
              style={styles.score_field}
              value={String(this.state.score1)}
              onChangeText={(score1) => this.setState({score1}) }
              keyboardType={'numeric'}
              maxLength={2}
              editable={true}
              />
            <TextInput
              style={styles.score_field}
              value={String(this.state.score2)}
              onChangeText={(score2) => this.setState({score2}) }
              keyboardType={'numeric'}
              maxLength={2}
              editable={true}
              />
          </View>
          <View style={styles.divider_line}></View>
        </View>

      );
    }
    return (
      <View></View>
    )
  },
});

var styles = StyleSheet.create({
  score_field: {
    height: 24,
    width: 30,
    borderColor: 'grey',
    borderWidth: 0.0,
    flexDirection: 'row',
    flex: 0,
    margin: -.5,
    marginHorizontal: -.5,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  value_text: {
    color: _cvals.skblue,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: _cvals.mainfont,
  },
  content_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'column',
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    width: windowSize.width
  },
})

module.exports = ScoreRowRecord;
