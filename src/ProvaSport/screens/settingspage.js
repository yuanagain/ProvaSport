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

var Bracket = require('../bigparts/bracket')

var {
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
        country: null,
        sports: null,
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
        Upload(source)
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
            items={['Tennis', 'Badminton', 'Squash', 'Basketball', 'Soccer']}
            navigator={this.props.navigator}
            selection={this.state.sport}
            harvest={this.setSport}
          />
          <View style={_cstyles.section_divider_line}></View>
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

          

          <View style={[styles.input_row, styles.selector]}>
            <PopoverSelector
              title={'Country'}
              items={['USA', 'Canada', 'Great Britain']}
              maxSelect={1}
              navigator={this.props.navigator}
              harvest={(country) => this.setState({country})}
            />
          </View>

          <View style={_cstyles.divider_line}/>
        </ScrollView>

      </View>

      <View style={_cstyles.buttons_container}>
        <WideButton
          text="Save Changes"
          onPress={this.loginFunction}
          />
      </View>
    </View>
    );
  },

  setSport: function(selection) {
    this.setState({sport: selection})
  },

  componentDidMount: function() {
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
