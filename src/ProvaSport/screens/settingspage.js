'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var WideButton = require('../smallparts/widebutton');

var DynamicList = require('../bigparts/dynamiclist')
var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
import * as _ctools from '../libs/customtools.js'
import * as _clogic from '../libs/customlogic.js'

var PopoverSelector = require('../bigparts/popoverselector')
var SimpleRow = require('../smallparts/simplerow')
var Header = require('../parts/header')
var AddImageIcon = require('../assets/add.png')
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var TextField = require('../smallparts/textfield')


import * as Player from '../modules/player'
import * as User from '../modules/userdata'
import * as _settings from '../modules/settings'

var Bracket = require('../bigparts/bracket')

var {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Platform,
} = React;

var SettingsPage = React.createClass({

  getInitialState: function() {

    return (
      {
        user: User.default_user,
        name: "",
        player: Player.default_player,
        profImage: AddImageIcon,
        country: [],
        sports: [],
      }
    );
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
        //Upload(source).then(resp=>)
        this.setState({
          profImage: source
        });
      }
    );
  },
  render: function() {
    var {
      name,
      loginFunction,
      navigator,
      ...props
    } = this.props;

    var settings = _settings.getSettings()
    return (

    <View style={styles.container}>
      <View>
        <Header title={"SETTINGS"}
                mode={'nav'}
                navigator={this.props.navigator} />
        <ScrollView style={_cstyles.body_container}>
          <View style={styles.image_container}>
            <TouchableOpacity onPress={this.showImagePicker}>
              <Image source={this.state.profImage} style={styles.avatar}/>
            </TouchableOpacity>
          </View>

          <PopoverSelector
            title={'Sports'}
            items={settings.sports}
            navigator={this.props.navigator}
            selection={this.state.sports}
            harvest={(sports) => this.setSport(sports)}
          />

          <View style={_cstyles.section_divider_line}></View>

          <PopoverSelector
            title={'Country'}
            items={settings.countries}
            maxSelect={1}
            selection={this.state.country}
            navigator={this.props.navigator}
            harvest={(country) => this.setState({country})}
          />

          <View style={_cstyles.section_divider_line}></View>

          <SimpleRow
            title={'Password'}
            value={"Change"}
            onPress={this.toChangePassword} />

          <View style={_cstyles.divider_line}/>
        </ScrollView>

      </View>

      <View style={_cstyles.buttons_container}>
        <WideButton
          text="Save Changes"
          onPress={this.setSport}
          />
      </View>
    </View>
    );
  },

  toChangePassword() {
    var ChangePasswordPage = require('../screens/changepasswordpage')
    this.props.navigator.push({
      id: "ChangePasswordPage",
      component: ChangePasswordPage,
      passProps: {
        navigator: this.props.navigator,
      }
    })
  },

  componentDidMount: function() {
    AsyncStorage.getItem('player', (error, response)=>{
      this.setState({player: response})
    })
    AsyncStorage.getItem('user', (error, response)=>{
      this.setState({playerid: response.playerid})
    })

    console.log(_clogic.createTrace(4))
    var matches = [
      {
        status: 4,
        teams: [0, 1],
        scores: [[1, 2]],
      },

      {
        status: 2,
        teams: [2, 'BYE'],
        scores: [[2, 1]],
      },

      {
        status: 4,
        teams: [4, 5],
        scores: [[1, 2]],
      },

      {
        status: 2,
        teams: ['BYE', 7],
        scores: [],
      },

      {
        status: 0,
        teams: ['TBD', 'TBD'],
        scores: [],
      },

      {
        status: 0,
        teams: ['TBD', 'TBD'],
        scores: [],
      },

      {
        status: 0,
        teams: ['TBD', 'TBD'],
        scores: [],
      },

    ]
    console.log(_clogic.update_matches(matches))
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
  changeCountry() {
    this.state.player.country = this.state.country;
    Player.setPlayer(this.state.playerid, this.state.player)
  },
  setSport(selection) {
    var player = this.state.player;
    console.log("PLAYER");
    console.log(player);
    //NOW set up earnings
    player.earnings.forEach(function(sportKey) {
      //if earnings does not have new Sport add
      if (selection.indexOf(sportKey) == -1)
      {
        player.earnings[sportKey] = {
          cash: 0,
          xp: 0,
          trophies: -1
        };
      }
      //keep sport's earnings for later?
      else {

      }
    })
    //player.sports = selection;
    Player.setPlayer(this.state.playerid, player)
    setAsyncP(player)
  },
  setAsyncP(playerobj) {
    AsyncStorage.setItem('player', playerobj, (err, resp)=>{
      console.log(resp)
    })
  },
  getAsyncP(){
    AsyncStorage.setItem('player', (err, resp)=>{
      return resp;
    })
  }

});



var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
  },
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

module.exports = SettingsPage;
