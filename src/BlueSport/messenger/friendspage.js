'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView,
  TouchableOpacity,
  Navigator,
  //RefreshControl,
} = React;

var MY_FRIENDS = [
  {'id': 1, 'name': "Suneel", 'sports': "basketball",
  'profpic': "http://facebook.github.io/react/img/logo_og.png"},
  {'id': 2, 'name': "Daniel", 'sports': "tennis",
  'profpic': "http://facebook.github.io/react/img/logo_og.png"},
  {'id': 3, 'name': "Khadim", 'sports': "football",
  'profpic': "http://facebook.github.io/react/img/logo_og.png"}];

  var player = {
            "name" : "Sam",
            "userid" : 2,
            "prof_pic": "",
            "elo": 0.0,
            "earnings": {
              "cash": 1000,
              "xp": 200,
            },
            "sports": "Basketball",
            "friends": [0],
            "teams": [],
            "matches": [],
            "tournaments": []
          };

var FriendsPage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.data),
    };
  },
  getDefaultProps: function() {
    return ({
      data: MY_FRIENDS,
      player: player
    })
  },
render() {
  var {
      data,
      navigator,
      ...props
    } = this.props;
	
return (
  <View style={styles.container}>
	<View style={_cstyles.header_container}>
        <Text style={_cstyles.title_text}>
          {"CHAT"}
        </Text>
  </View>
  <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}
      />

  </View>
      );
  },


  renderRow(rowData) {
    return (
      <View style={styles.friendContainer}>
        <TouchableOpacity onPress = {()=>this.onPress(rowData.id)} style = {styles.container}>
          <View style={styles.profpicContainer}>
            <Image
              source={{uri: rowData.profpic}}
              style={styles.profpic}
            />
        	</View> 
          <View>
          	<View style={styles.details}>
  	            <Text style={_cstyles.standard_text}>{rowData.name}</Text>
  	            <Text style={_cstyles.detail_text}>{rowData.sports}</Text>
              </View>
              <View style={_cstyles.section_divider_line} ></View> 
          </View>
        </TouchableOpacity>
      </View>
    );
  },


  onPress: function(friendId) {
    var GiftedMessengerExample = require('./GiftedMessengerExample');
    this.props.navigator.push({
      id: "GiftedMessengerExample",
      component: GiftedMessengerExample,
      passProps: {
        player: this.props.player,
        friend: friendId,
      }
    });
  },
});

  var styles = StyleSheet.create({
  	container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    //paddingHorizontal: _cvals.dscale * 8,
    paddingBottom: _cvals.dscale * 4,
    opacity: 1.00,
    marginTop: 0,
  },
  friendContainer: {
    flexDirection: 'row',
    flex: 1,
    width: windowSize.width,
    marginTop: _cvals.dscale * 4,
    marginBottom: _cvals.dscale * 4
  },
  player_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: _cvals.dscale * 4,

},
  profpicContainer: {
  	//float: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowSize.width / 5,
    height: windowSize.wwidth / 5,
  },
  profpic: {
  	width: windowSize.width / 8,
    height: windowSize.width / 8,
    borderRadius: windowSize.width / 16
  },
  listview: {
    backgroundColor: 'transparent',
  },
  details: {
  	marginTop: -1*(windowSize.width /8),
  	marginLeft: windowSize.width / 5,
  }
  })

  module.exports = FriendsPage;