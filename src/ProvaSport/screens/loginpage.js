'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var WideButton = require('../smallparts/widebutton');

var _cvals = require('../styles/customvals');
var _cstyles= require('../styles/customstyles');

var SignUpPage = require('./signuppage')
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import Store from 'react-native-store';


//database name and constant for storing data
//clear out the DB
// will complete on app creation beating the sign-in
//DB.user.destroy()
//DB.player.destroy()

var {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  AndroidDatePicker,
} = React;

var LoginPage = React.createClass({
  getInitialState: function() {
    return (
      {
        username: '',
        password: '',
      }
    );
  },
  render: function() {
    var {
      name,
      navToHomeFunc,
      signUpFunction,
      ...props
    } = this.props;

    // Known issue on Android, doesn't cause any problems
    console.ignoredYellowBox = [
      'Warning: Native component for',
      'Possible',
    ];
    
    return (
    <View style={styles.container}>

      <View style={styles.logo_container}>
        <Image style={styles.logo}
               source={require('../assets/logo_white_orange.png')} />
      </View>

      <View style={styles.header_container}>
        <Text style={styles.title_text}>
          {"ProvaSport"}
        </Text>
      </View>



      <View style={styles.inputs_container}>

        <TextInput
        style={styles.login_input}
        underlineColorAndroid='rgba(0,0,0,0)'
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        placeholder={"user@email.com"}
        autoCapitalize={"none"}
        />

        <View style={styles.white_line}>
        </View>

        <TextInput
        style={styles.login_input}
        underlineColorAndroid='rgba(0,0,0,0)'
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        placeholder={"Password"}
        secureTextEntry={true}
        autoCapitalize={"none"}
        />
      </View>

      <View style={styles.buttons_container}>
        <WideButton
          text={"Sign In"}
          style={styles.login_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.onSignInPress}
          />

        <TouchableOpacity
          style={styles.signup_button}
          onPress={this.onSignUpPress} >
          <Text style={{fontFamily: _cvals.mainfont,
                        fontSize: 20 * _cvals.dscale,
                        color: 'white',}}>
            {"New user? Sign Up!"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  },

  onSignUpPress: function(name) {

    this.props.navigator.push({
      id: "SignUpPage",
      component: SignUpPage,
      passProps: {
        navToHomeFunc: this.props.navToHomeFunc
      }

    })
  },
  onSignInPress: function(name) {
      /* Valid Login? now authenticate?*/
      var email = this.state.username;
      var pass = this.state.password;
      /*
       * var coreData = {
       *   "user": User.default_user,
       *   "player": Player.default_player
       * };
       */
       var uid = 0;

       //DB.user.add(User.default_user, 0).then(resp => console.log(resp))
       //DB.player.add(Player.default_player, 0).then(resp => console.log(resp))
       /*
       *  DB.user.find().then(resp => console.log(resp))
       *  DB.player.find().then(resp => console.log(resp))
        */
       User._Login(email, pass, this.grabUser);
        // watch this it might jump the gun
  },
  _setInitialUser: function(obj) {
/*
 *     AsyncStorage.setItem(store_key, JSON.stringify(UID123_object), () => {
 *      AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
 *        AsyncStorage.getItem('UID123', (err, result) => {
 *          console.log(result);
 *          // => {'name':'Chris','age':31,'traits':{'shoe_size':10,'hair':'brown','eyes':'blue'}}
 *        });
 *      });
 *    });
 */
    try {
      //THIS WORKS!!!
      AsyncStorage.setItem('user', JSON.stringify(obj), () => {
        AsyncStorage.getItem('user', (err, result)=>{
          //console.log("PLAYER");
          console.log(JSON.parse(result));
        });
      });
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  },
  _setInitialPlayer: function(obj) {
/*
 *     AsyncStorage.setItem(store_key, JSON.stringify(UID123_object), () => {
 *      AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
 *        AsyncStorage.getItem('UID123', (err, result) => {
 *          console.log(result);
 *          // => {'name':'Chris','age':31,'traits':{'shoe_size':10,'hair':'brown','eyes':'blue'}}
 *        });
 *      });
 *    });
 */
    try {
      //THIS WORKS!!!
      AsyncStorage.setItem('player', JSON.stringify(obj), () => {
        AsyncStorage.getItem('player', (err, result)=>{
          //console.log("User");
          console.log(JSON.parse(result));
        });
      });
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  },
  grabUser: function(authdata) {
    var uid = authdata.uid;
    //var uid = 'dd726cb4-cdd3-4d66-a06f-cb9e5a5a8794';
    /*TODO change back to uid*/
    User._GetUser(uid, this.handleUser);

  },
  handleUser: function(user){
    //this might throw an exception when inccorrect email
    var callback = this.handlePlayer;
    var playerid = user.playerid;
    this._setInitialUser(user);
    Player._GetPlayer(playerid, callback)
  },
  handlePlayer: function(player){
    //console.log("handleplayer")
    this._setInitialPlayer(player)
    var callback = this.props.navToHomeFunc;
    callback()
  }
});


var styles = StyleSheet.create({
  logo: {
    width: 200 * _cvals.dscale,
    height: 200 * _cvals.dscale
  },
  logo_container: {
    width: windowSize.width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title_text: {
    color: 'white',
    fontSize: 50 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    padding: 10 * _cvals.dscale
  },
  login_button: {
    color: 'white',
    //height: windowSize.height * 1 / 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'center',
    fontSize: 30 * _cvals.dscale,
    backgroundColor: _cvals.skorange,
    width: windowSize.width,
    paddingVertical: 12 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3},

  },
  signup_button: {
    opacity: 1,
    padding: 5 * _cvals.dscale,
    margin: 10 * _cvals.dscale,
  },
  login_input: {
    height: 40 * _cvals.dscale,
    borderWidth: 0,
    fontSize: 34 * _cvals.dscale,
    textShadowColor: 'white',
    color: 'white',
    margin: 10 * _cvals.dscale,
    marginVertical: 18 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#4A90E2',
    opacity: 1.00,
    margin: 0,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs_container: {
    width: windowSize.width,
    //height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7bafea',
    opacity: 1.0,
  },
  buttons_container: {
    //height: windowSize.height * 1 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    backgroundColor: '#7bafea',
  },
  white_line: {
    backgroundColor: 'white',
    height: 2 * _cvals.dscale,
    opacity: 0.3,
    width: windowSize.width
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width:320 * _cvals.dscale,
    height:480 * _cvals.dscale,
  }
})

module.exports = LoginPage;
