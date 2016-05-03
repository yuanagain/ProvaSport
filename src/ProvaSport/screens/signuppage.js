'use strict';
var React = require('react-native')
var _cstyles = require('../styles/customstyles.js')
var _cvals = require('../styles/customvals.js')
var Dimensions = require('Dimensions')
var windowSize = Dimensions.get('window')

var Header = require('../parts/header')
var PopoverSelector = require('../bigparts/popoverselector')
var WideButton = require('../smallparts/widebutton');
var AddImageIcon = require('../assets/add.png')
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var TextField = require('../smallparts/textfield')
var KeyboardHandler = require('../parts/keyboardhandler')

import * as Player from '../modules/player'
import * as User from '../modules/userdata'
import * as _settings from '../modules/settings'
//for uploading images
import { RNS3 } from 'react-native-aws3';


var {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Platform,
} = React;

var SignUpPage = React.createClass({

  getInitialState() {
    return {
      user: User.default_user,
      name: "",
      first: "",
      last: "",
      gender: null,
      birthDate: new Date(),
      age: '',
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      profImage: AddImageIcon,
      country: [],
      sports: [],
    }
  },

  showImagePicker: function() {
    var options = {
      title: 'Select Profile Picture',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      },
      allowsEditing: true,
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);
        // You can display the image using either data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // uri (on iOS)
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        // const source = {uri: response.uri, isStatic: true};
        //upload image
        //this.upload(source)
        this.setState({
          profImage: source
        });
      }
    );
  },

  async showDatePicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  },

  render: function() {
    var {
      name,
      date,
      navToHomeFunc,
      ...props
    } = this.props;
    var settings = _settings.config;

    // Known issue with DatePickerIOS results in warnings. This suppresses the
    // yellow warning boxes. React Native team is currently working on this.
    // See https://github.com/facebook/react-native/issues/4547 for first.
    // See https://github.com/facebook/react-native/issues/41 for second.
    console.ignoredYellowBox = [
      'Warning: Failed propType',
      'Warning: ScrollView doesn\'t take rejection well - scrolls anyway'
    ];

    return (
      <View style={styles.screen}>
        <Header title={"SIGN UP"}
              mode={'nav'}
              navigator={this.props.navigator} />
        <View>
        <SmartScrollView>
          <View style={styles.image_container}>
            <TouchableOpacity onPress={this.showImagePicker}>
              <Image source={this.state.profImage} style={styles.avatar}/>
            </TouchableOpacity>
          </View>
          <View style={_cstyles.body_container}>
            <TextField
              label="Email "
              placeholder="user@email.com"
              secureTextEntry={false}
              keyboardType='email-address'
              onChangeText={(email) => this.setState({email})}
            />

            <TextField
              label="Password "
              placeholder="password"
              secureTextEntry={true}
              keyboardType='default'
              onChangeText={(password) => this.setState({password})}
            />

            <TextField
              label="Confirm Password "
              placeholder="password"
              secureTextEntry={true}
              keyboardType='default'
              onChangeText={(passwordConf) => this.setState({passwordConf})}
            />

            <TextField
              label="First Name "
              placeholder="First Name"
              secureTextEntry={false}
              keyboardType='default'
              onChangeText={(first) => this.setState({first})}
            />

            <TextField
              label="Last Name "
              placeholder="Last Name"
              secureTextEntry={false}
              keyboardType='default'
              onChangeText={(last) => this.setState({last})}
            />

            <TextField
              label="Age "
              placeholder="Age"
              secureTextEntry={false}
              keyboardType='numeric'
              onChangeText={(age) => this.setState({age})}
            />

            <View style={_cstyles.divider_line}/>

            <View style={[styles.input_row, styles.selector]}>
              <PopoverSelector
                title={'Country'}
                items={settings.countries}
                maxSelect={1}
                navigator={this.props.navigator}
                selection={this.state.country}
                harvest={(country) => this.setState({country})}
              />
            </View>

            <View style={_cstyles.divider_line}/>

            <View style={[styles.input_row, styles.selector]}>
              <PopoverSelector
                title={'Sports'}
                items={settings.sports}
                navigator={this.props.navigator}
                selection={this.state.sports}
                harvest={(sports) => this.setState({sports})}
              />
            </View>
            <View style={_cstyles.divider_line}/>
          </View>
          <WideButton
            text={"Submit"}

            onPress={this.onSubmit}
          />
        </SmartScrollView>
        </View>
      </View>
    );
  },

  validEmail() {
    var re = /\S+@\S+\.\S+/;
    return re.test(this.state.email)
  },

  validPasswordLength() {
    return (this.state.password.length >= 8)
  },

  validPasswordConf() {
    return (this.state.password == this.state.passwordConf)
  },

  validUsername() {
    return (this.state.username.length >= 6)
  },


  onSubmit() {
    /*
     * if (!this.validUsername()) {
     *   Alert.alert(
     *     'Invalid Username',
     *     'Username must be at least 6 characters long',
     *     [
     *       {text: 'OK'},
     *     ]
     *   )
     * }
     */
    if (!this.validEmail()) {
      Alert.alert(
        'Invalid Email',
        'Invalid email address',
        [
          {text: 'OK'},
        ]
      )
    }
    else if (!this.validPasswordLength()) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long',
        [
          {text: 'OK'},
        ]
      )
    }
    else if (!this.validPasswordConf()) {
      Alert.alert(
        'Invalid Password',
        'Passwords do not match',
        [
          {text: 'OK'},
        ]
      )
    }
    /*
     * else if (!this.validName()) {
     *   Alert.alert(
     *     'Invalid Name',
     *     'Name field must not be left blank',
     *     [
     *       {text: 'OK'},
     *     ]
     *   )
     * }
     */
    /*
     * else if (this.state.gender == null) {
     *   Alert.alert(
     *     'Invalid Gender',
     *     'Please select a gender',
     *     [
     *       {text: 'OK'},
     *     ]
     *   )
     * }
     * else if (this.state.country == null) {
     *   Alert.alert(
     *     'Invalid Country',
     *     'Please select a country',
     *     [
     *       {text: 'OK'},
     *     ]
     *   )
     * }
     * else if (this.state.sports == null) {
     *   Alert.alert(
     *     'Invalid Country',
     *     'Please select at least 1 sport',
     *     [
     *       {text: 'OK'},
     *     ]
     *   )
     * }
     */
    else {
      /* Valid Login? now authenticate?*/
      /*

       */



      var callback = this.props.navToHomeFunc;
      var email = this.state.email;
      var pass = this.state.password;
      var player = JSON.parse(JSON.stringify(Player.default_player));
      var setUser = JSON.parse(JSON.stringify(this.state.user));
      //load in the data above
      player.name.first = this.state.first;
      player.name.last = this.state.last;
      player.name.full = this.state.first + " " + this.state.last;
      player.nationality = String(this.state.country);
      player.sports = this.state.sports;
      setUser.sports = this.state.sports;
      setUser.email = email;
      setUser.birthday = this.state.age;
      setUser.nationality = String(this.state.country);
      var earnings = []
      var i = 0;
      var len = this.state.sports.length;

      var obj = {};
      this.state.sports.forEach(function(sport){
        obj[sport] = {
          cash: 0,
          xp: 0,
          trophies: 0
        };
        i++;
        if(i == len){
          player.earnings = obj;
        }
      })
//POSSIBLE RACE CONDITION



//call the next functions
      var callback = this.storeUser;
      console.log(player)
      //uid=>callback(uid, setUser, player)
      User.createUser(email, pass).then(uid=>callback(uid, setUser, player)).catch(function(err){console.log("COULD NOT CREATE USER "+err)})
    }
  },
  storeUser: function (uid, user, player) {
    console.log("\n"+uid+"  "+user+"  "+player)
    player.userid = uid;
    var callback = this.props.navToHomeFunc;
    var call1 = this._setInitialUser;
    Player.createPlayer(player).then(function(id){
      //given the id add to the user and create data in FB
      console.log(this.state.profImage.uri);
      //this.upload(this.state.profpic.source.uri, this.state.playerid);
      user.playerid = id;
      console.log(user)
      User.setUser(uid, user);
      call1(user)
    })
    this._setInitialPlayer(player)
    callback()
    //create player
  },
  _setInitialUser: function(obj) {
    console.log("CACHE user")
    try {
      //THIS WORKS!!!
      AsyncStorage.setItem('user', JSON.stringify(obj), () => {
        AsyncStorage.getItem('user', (err, result)=>{
          console.log("USER");
          console.log(JSON.parse(result));
        });
      });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },


  upload(uri, playerid) {
    var name = "prof_pic"+playerid+".jpg"
    let file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: "file:///Users/kenanfarmer/Library/Developer/CoreSimulator/Devices/9212EF35-3593-450A-84D1-87112A2A717A/data/Containers/Data/Application/463DAE6D-E6F2-4D77-B1CB-4A6A73455C13/Documents/751C50B2-AE47-4DAA-B323-3EE8C5E06736.jpg",
      name: name,
      type: "image/jpeg"
    }

    let options = {
      keyPrefix: "provasport_profile_pics/",
      bucket: "provasport",
      region: "us-east-1",
      accessKey: "AKIAIOKYIRF3NPM6QJFA",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body.location);
    }).catch(function(err){console.log(err);});
  },
  _setInitialPlayer: function(obj) {

    try {
      //THIS WORKS!!!
      AsyncStorage.setItem('player', JSON.stringify(obj), () => {
        AsyncStorage.getItem('player', (err, result)=>{
          console.log("Player");
          console.log(JSON.parse(result));
        });
      });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },
});

// Layout for labels and text fields


/* Not Currently supporting birthdays
var DatePicker = React.createClass({
  render: function() {
    if (Platform.OS === 'ios') {
      return (
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          maximumDate={new Date(Date.now())}
          onDateChange={(date) => this.setState({date})}
        />
      )
    }
    else {
      <TouchableWithoutFeedback
        onPress={this.showDatePicker.bind(this, 'max', {
          date: this.state.maxDate,
          maxDate: new Date(Date.now()),
        })}>
        <Text>Select a Date</Text>
      </TouchableWithoutFeedback>
    }
  }
})
*/

var styles = StyleSheet.create({
  // Height bound necessary for ScrollView to work as expected
  screen: {
    height: windowSize.height,
    flex: 1,
  },
  image_container: {
    height: 200 * _cvals.dscale,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 60 * _cvals.dscale,
    width: 120 * _cvals.dscale,
    height: 120 * _cvals.dscale,
  },
  date_picker_container: {
    alignItems: 'center',
    flex: 1,
  },
  input_container: {
    height: windowSize.height
  },
  input: {
    height: 40 * _cvals.dscale,
    fontSize: _cvals.standard_text,
    padding: (Platform.OS === 'ios') ? 10 * _cvals.dscale : 0
  },
  input_row: {
    paddingTop: 5 * _cvals.dscale,
  },
  selector: {
    paddingBottom: 5 * _cvals.dscale,
  },
  whiteFont: {
    color: "#FFF"
  },
  blackFront: {
    color: "#000"
  },
})

module.exports = SignUpPage;
