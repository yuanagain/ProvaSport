'use strict';

var React = require('react-native');

var {
  LinkingIOS,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text
} = React;

var GiftedMessenger = require('./GiftedMessenger');
var Communications = require('react-native-communications');
var messagedb = require('firebase');
messagedb = new Firebase('https://provamessenger.firebaseio.com');

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

var GiftedMessengerExample = React.createClass({

  getDefaultProps() {
    return {
      player: player,
      friendid: 0,
    };
  },

  getInitialState: function() {
    
    return ({
    messages: [],
    messagesLoaded: false,
    });
  },

  componentDidMount: function () {
    this.getMessages(this.props.friendid, this.harvest);
    this.setState({messagesLoaded: true});
    this.animate(); //TODO: figure out how to query for send and receive
  },

  animate: function() {
    setInterval(() => {
      this.handleReceive();
    }, 500);
  },
  
  // harvest
  harvest: function(data) {
    this.setState({messages: data})
  },

  // load previous messages
  getMessages: function(playerid, callback) {

  var promise = new Promise(function(resolve, reject) {
      // examine contents of the database (current conversation)
    var messagelist = [];
    //TODO: make the child be the playerid
    messagedb.child(0).once("value", function(snapshot) {
      
      // format each message
     	snapshot.forEach(function(childSnapshot) {
     		var text = childSnapshot.child("text").val();
     		var userid = childSnapshot.child("userid").val();
     		var date = childSnapshot.child("date").val();
     		var position = 'left';

     		if (userid === player.userid) {
     			position = 'right';
     		}
     		var messagedata = {
     			"userid" : userid,
     			"text" : text,
     			"date" : date,
     			"position" : position,
     		};
   		  messagelist.push(messagedata);
  	   	});
        resolve(messagelist);
    	});      
  });

  promise.then(function(result) {
      callback(result);
    }).catch(function() {
      console.log("READ FAILED")
    });
  },
  
  handleSend(message = {}, rowID = null) {
    //push to Firebase
    //TODO: make the child be the player id
    var newmessage = messagedb.child(0).push();
    var promise = new Promise(function(resolve, reject) {
      newmessage.set(
    {
      userid: player.userid,
      text: message.text,
      date: Date.now(),
    }, function(error) {
    	if (error) {
    		reject(false);
    	}
    	else {
    		resolve(true);
    	}
    }); 
  });
    promise.then(function(value) {
      if (value === true) {
        this._GiftedMessenger.setMessageStatus('Sent', rowID);
      }
      else {
        this._GiftedMessenger.setMessageStatus('ErrorButton', rowID); 
      }
    }).catch(function(error) {
        console.log(error);
      });
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
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}
    
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
        maxHeight={Dimensions.get('window').height - navBarHeight - statusBarHeight}
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


module.exports = GiftedMessengerExample;