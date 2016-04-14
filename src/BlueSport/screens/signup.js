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

import * as User from '../modules/userdata'

var {
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
      name: '',
      gender: null,
      date: new Date(),
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      profImage: AddImageIcon,
      country: null,
      sports: null,
    }
  },

  showImagePicker: function() {
    var options = {
      title: 'Select Avatar',
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
        <ScrollView style={styles.input_container}>
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
              onChangeText={(name) => this.setState({name})}
            />

            <TextField
              label="Last Name "
              placeholder="Last Name"
              secureTextEntry={false}
              keyboardType='default'
              onChangeText={(name) => this.setState({name})}
            />
            <View style={_cstyles.divider_line}/>

            <View style={styles.input_row}>
            <PopoverSelector
                title={'Gender'}
                items={['Male', 'Female']}
                maxSelect={1}
                navigator={this.props.navigator}
                harvestSelection={(gender) => this.setState({gender})}
              />
            </View>
            <View style={_cstyles.divider_line}/>


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

            <View style={[styles.input_row, styles.selector]}>
              <PopoverSelector
                title={'Sports'}
                items={['Tennis', 'Basketball', 'Soccer', 'Squash',
                        'Badminton', 'Football', 'Baseball', ]}
                navigator={this.props.navigator}
                harvest={(sports) => this.setState({sports})}
              />
            </View>
            <View style={_cstyles.divider_line}/>
          </View>
          <WideButton
            text={"Submit"}

            onPress={this.onSubmit}
          />
        </ScrollView>
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

  validName() {
    return (this.state.name.length >= 1)
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
    else if (!this.validName()) {
      Alert.alert(
        'Invalid Name',
        'Name field must not be left blank',
        [
          {text: 'OK'},
        ]
      )
    }
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
      var callback = this.props.navToHomeFunc;
      var email = this.state.email;
      var pass = this.state.password;

      (User.createUser(email, pass)).then(function(value) {
        console.log("USERID:   "+value);
      }).then(callback).catch(function () {
        console.log("Creation Failed");
      });
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
