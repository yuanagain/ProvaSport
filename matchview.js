'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
} = React;



var MatchView = React.createClass({
  getInitialState: function() {
    return (
      {
      }
    )
  },

  render: function() {
    var {
      matchid,
      player1,
      player2,
      status1,
      status2,
      onPress1,
      onPress2,
      ...props
    } = this.props;
    return (
      <View style={styles.match}>
        <View style={styles.row}>
          <View style={styles.thumbnail_container}>
            <Image
              style={styles.thumbnail}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <Text
            style={styles.winner}>
            {this.state.player1}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.thumbnail_container}>
            <Image
              style={styles.thumbnail}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <Text
            style={styles.loser}>
            {this.state.player2}
          </Text>
        </View>
      </View>
    );
  },
  onPress1: function() {
    this.props.onPress1()
  },
  onPress2: function() {
    this.props.onPress2()
  }
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header_pic_container: {
    marginTop: 20,
    backgroundColor: 'black',
    height: windowSize.width / 5.5,
    opacity: 0.4,
  },
  header_pic: {
    width: windowSize.width,
    height: windowSize.width / 3,
  },
  header_text: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'avenir',
    padding: 10,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  match: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 100,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  row: {
    backgroundColor: 'transparent',
    height: 40,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  winner: {
    marginTop: -30,
    marginLeft: windowSize.height / 14 + 15,
    fontFamily: 'avenir',
    fontWeight: '800',
    fontSize: 17,
  },
  loser: {
    marginTop: -30,
    marginLeft: windowSize.height / 14 + 15,
    fontFamily: 'avenir',
    fontSize: 17,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  thumbnail_container: {
      flexDirection: 'row',
      marginTop: -10,
      backgroundColor: 'black',
      height: windowSize.height / 17,
      width: windowSize.height / 17,
  },
  thumbnail: {
      height: windowSize.height / 17 - 10,
      width: windowSize.height / 17 - 10,
      borderRadius: (windowSize.height / 17 - 10) / 2,
      marginHorizontal: -75,
  },
});



module.exports = MatchView;
