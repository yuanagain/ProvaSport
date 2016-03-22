'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var mainfont = 'avenir'
var rowheight = 100

// SHARED FORMATTING.
// TODO: make univeral
var lightgreen = "#7ED321"
var mainfont = 'avenir'
var skblue = '#4A90E2'

var NewsFeedMatchRow = React.createClass({
  getInitialState: function() {
    return (
      {
        status: 0
      }
    );
  },
  render: function() {
    var {
      row_name,
      payouts,
      ...props
    } = this.props;

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.thumbnail_container}>
            <Image
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
              style={styles.thumbnail}
            />
            <Image
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
              style={styles.thumbnail}
            />
          </View>
          <View style={styles.content_container}>
            <Text style={styles.value_text}>{"Player 1"}</Text>
            <Text style={styles.winner_text}>{"Player 2"}</Text>
            <Text style={styles.detail_text}>{"Dillon Gym"}</Text>
          </View>
          <View style={styles.scores_container}>
            <Text style={styles.scores_text}>{"21  14  21"}</Text>
            <Text style={styles.scores_text}>{"11  21  18"}</Text>
            <Text style={styles.detail_text}>{"11/12/2015"}</Text>
          </View>
        </View>
        <View style={styles.divider_line}>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  value_text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: mainfont,
  },
  scores_text: {
    color: 'black',
    fontSize: 20,
    margin: 3,
    opacity: 0.7,
    fontFamily: mainfont,
  },
  winner_text: {
    color: skblue,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: mainfont,
  },
  detail_text: {
    color: 'black',
    fontSize: 18,
    fontFamily: mainfont,
    color: 'grey',
    marginVertical: 4,
  },
  column_r_r: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  column_l_l: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  columns_container: {
    flexDirection: 'row',
    flex: 0,
    width: windowSize.width,
  },
  content_container: {
    margin: 5,
    height: rowheight,
    width: windowSize.width * 2 / 5
  },
  scores_container: {
    margin: 5,
    height: rowheight,
    width: windowSize.width / 3
  },
  thumbnail_container: {
    height: rowheight
  },
  thumbnail: {
    height: rowheight / 2 - 10,
    width: rowheight / 2 - 10,
    borderRadius: (rowheight / 2 - 10) / 2,
    marginHorizontal: 10,
    marginVertical: 5
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    width: windowSize.width
  },
})

module.exports = NewsFeedMatchRow;
