// Source 1: https://github.com/brentvatne/react-native-scrollable-tab-view
// Source 2: https://github.com/yuanagain/BlueAgent2/wiki/Programmatic-View-Generation-from-Data-and-Placement-Formatting

'use strict';

var React      = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

// var MatchView = require('../matchview')

var num_players = 16
var num_rounds  = 5
var prelims     = []

for (var i = 1; i <= num_players; i++) {
  prelims.push("Player " + i)
}

var {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} = React;



import FacebookTabBar from './FacebookTabBar';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';



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



var Bracket = React.createClass({
  getInitialState: function() {
    return {
        num_players: num_players,
        num_rounds : num_rounds,
        players    : prelims,
        page_title : 'IM Playoffs',
        tourneyData: [{'matchid': 1, 'player1': 'Player 1',  'player2': 'Player 2',  'scores': [1, 2]},
                      {'matchid': 2, 'player1': 'Player 3',  'player2': 'Player 4',  'scores': [2, 1]},
                      {'matchid': 3, 'player1': 'Player 5',  'player2': 'Player 6',  'scores': [1, 2]},
                      {'matchid': 4, 'player1': 'Player 7',  'player2': 'Player 8',  'scores': [2, 1]},
                      {'matchid': 5, 'player1': 'Player 9',  'player2': 'Player 10', 'scores': [1, 2]},
                      {'matchid': 6, 'player1': 'Player 11', 'player2': 'Player 12', 'scores': [2, 1]},
                      {'matchid': 7, 'player1': 'Player 13', 'player2': 'Player 14', 'scores': [1, 2]},
                      {'matchid': 8, 'player1': 'Player 15', 'player2': 'Player 16', 'scores': [2, 1]}]
    }
  },

  render() {

    var createMatches = (data) => <MatchView matchid={data['matchid']}
                                             player1={data['player1']}
                                             player2={data['player2']} />;

    return (
      <View style={styles.container}>
        <View style={styles.header_pic_container}>
            <Image
              style={styles.header_pic}
              source={{uri: 'http://beingcovers.com/media/facebook-cover/Soccer-Stadium-facebook-covers-3555.jpg'}}
            />
        </View>

        <ScrollableTabView tabBarUnderlineColor='#4A90E2' tabBarActiveTextColor='#4A90E2' style={{marginTop: 70}}>
          <ScrollView tabLabel='Prelims' style={styles.tabView}>
            <View>
              {this.state.tourneyData.map(createMatches)}
            </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[0]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[1]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[2]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[3]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[4]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[5]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[6]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[7]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[8]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[9]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[10]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[11]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[12]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[13]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[14]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[15]}
          //       </Text>
          //     </View>
          //   </View>
          // </ScrollView>
          // <ScrollView tabLabel='Quarters' style={styles.tabView}>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[0]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[3]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[4]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[6]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[9]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[11]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[13]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[14]}
          //       </Text>
          //     </View>
          //   </View>
          // </ScrollView>
          // <ScrollView tabLabel='Semis' style={styles.tabView}>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[3]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[4]}
          //       </Text>
          //     </View>
          //   </View>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[9]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[14]}
          //       </Text>
          //     </View>
          //   </View>
          // </ScrollView>
          // <ScrollView tabLabel='Finals' style={styles.tabView}>
          //   <View style={styles.match}>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.loser}>
          //         {this.state.players[4]}
          //       </Text>
          //     </View>
          //     <View style={styles.row}>
          //       <View style={styles.thumbnail_container}>
          //         <Image
          //           style={styles.thumbnail}
          //           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          //         />
          //       </View>
          //       <Text
          //         style={styles.winner}>
          //         {this.state.players[9]}
          //       </Text>
          //     </View>
          //   </View>
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  },
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



module.exports = Bracket;
