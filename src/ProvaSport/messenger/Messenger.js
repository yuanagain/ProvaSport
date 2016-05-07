'use strict';

var React = require('react-native');

var {
  AsyncStorage,
  LinkingIOS,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text
} = React;

var _cvals = require('../styles/customvals')
var  MessagePage = require('./MessagePage.js');
var Communications = require('react-native-communications');
var messagedb = require('firebase');
messagedb = new Firebase('https://provamessenger.firebaseio.com');

import * as Conversation from '../modules/conversation'


var player = {
            "name" : "Sam",
            "userid" : 0,
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

var Messenger = React.createClass({

  getDefaultProps() {
    return {
      friendid: 0,
    };
  },

  getInitialState: function() {
    return (
      {
        messages: [],
        convoid: 0,
        messagesLoaded: false,
        _isMounted: false,
        _didUnmount: false,
        _interval_id: false,
      }
    );
  },

  componentDidMount: function () {
    // get friend
    //get messages
    this.setState({_isMounted: true})
    this.getMessages(this.state.convoid, this.harvest);
    this.setState({messagesLoaded: true});
    this.animate();
  },
  componentWillReceiveProps: function (nextProps) {
    // get friend
    //get messages
    this.setState({convoid: nextProps.convoid})
    this.getMessages(nextProps.convoid, this.harvest);
    this.setState({messagesLoaded: true});
    this.animate();
  },

  componentWillUnmount: function() {
    // this.setState({_isMounted: false})
    // this.setState({_didUnmount: true})
    clearInterval(this.state._interval_id)
  },

  animate: function() {
    var interval_id = setInterval(() => {
    if (this.state._isMounted) {
      this.handleReceive();
    }      // if (this.state._didUnmount) {
     //   clearInterval(interval_id)
     // }
    }, 500);
    this.setState({_interval_id: interval_id})
  },

  // harvest
  harvest: function(data) {
    this.setState({messages: data})
  },

/* getMessages of conversation
 * @calls callback with the resulting messageObjectList
 */
  getMessages: function(convoid, callback) {
    //grab playerid
    AsyncStorage.getItem('player', (err, player)=>{
      player = JSON.parse(player);
      //grab the most recent 15
      Conversation.getMessagesLimited(convoid, player.playerid, 15).then(function(result) {
        callback(result);
      }).catch(function() {
        console.log("READ FAILED")
      });
    })
  },

/* send a message to the database
 * retrieve if sent succesfully or not
 * dependent on Conversation.newMessage()
 */
  handleSend(message = {}, rowID = null) {
    //push to Firebase
    //TODO: make the child be the player id
    if (message !== {}) {
      Conversation.newMessage(convoid, message).then(function(value) {
        if (value) {
          this.MessagePage.setMessageStatus('Sent', rowID);
        }
        else {
          this._MessagePage.setMessageStatus('ErrorButton', rowID);
        }
      }).catch(function(error) {
          console.log(error);
      });
    }
    else {
      console.log("ERROR no message to send!");
    }
  },

  // @oldestMessage is the oldest message already added to the list
  onLoadEarlierMessages(oldestMessage = {}, callback = () => {}) {

    // Your logic here
    // Eg: Retrieve old messages from your server

    // newest messages have to be at the begining of the array

    setTimeout(() => {
      callback(earlierMessages, false); // when second parameter is true, the "Load earlier messages" button will be hidden
    }, 1000);
  },

  handleReceive: function() {
    setTimeout(() => {
      this.getMessages(this.props.frendid, this.harvest);
    }, 1000);
  },

  onErrorButtonPress(message = {}, rowID = null) {
    // try re-sending message
    handleSend(message, rowID);
  },

  // will be triggered when the Image of a row is touched
  onImagePress(rowData = {}, rowID = null) {
    // Your logic here
    // Eg: Navigate to the user profile
  },

  render() {
    return (
      <MessagePage
        ref={(c) => this._MessagePage = c}

        styles={{
          bubbleRight: {
            marginLeft: 70,
            backgroundColor: '#007aff', // sender bubble color; can be changed to _cstyles
            // (also see backgroundColor in Navigation.js for header bar color)
          },
        }}

        autoFocus={false}
        messages={this.state.messages}
        handleSend={this.handleSend}
        onErrorButtonPress={this.onErrorButtonPress}
        maxHeight={Dimensions.get('window').height - _cvals.headerHeight - _cvals.statusBarHeight}
        loadEarlierMessagesButton={false} // disable load earlier messages
        onLoadEarlierMessages={this.onLoadEarlierMessages}

        senderName={this.props.player.name}
        senderImage={null}
        onImagePress={this.onImagePress}
        displayNames={true}

        parseText={false} // disable handlePhonePress and handleUrlPress
        handlePhonePress={this.handlePhonePress}
        handleUrlPress={this.handleUrlPress}
        handleEmailPress={this.handleEmailPress}

        inverted={true}
        navigator={this.props.navigator}
      />

    );
  },

  handleUrlPress(url) {
    if (Platform.OS !== 'android') {
      LinkingIOS.openURL(url);
    }
  },

  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ];
      var CANCEL_INDEX = 2;

      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
        }
      });
    }
  },

  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  },
});

var navBarHeight = (Platform.OS === 'android' ? 56 : 64);
// warning: height of android statusbar depends of the resolution of the device
// http://stackoverflow.com/questions/3407256/height-of-status-bar-in-android
// @todo check Navigator.NavigationBar.Styles.General.NavBarHeight
var statusBarHeight = (Platform.OS === 'android' ? 25 : 0);


module.exports = Messenger;
