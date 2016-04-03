'use strict';
var React = require('react-native')
var _cstyles = require('../styles/customstyles.js')
var _cvals = require('../styles/customvals.js')
var Dimensions = require('Dimensions')
var windowSize = Dimensions.get('window')

var PopoverSelector = require('../bigparts/popoverselector')
var Button = require('react-native-button')
var AddImageIcon = require('../assets/add.png')

var ImagePickerManager = require('NativeModules').ImagePickerManager;

var {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  DatePickerIOS,
  TouchableOpacity,
  Alert,
} = React;

// TODO: Datepicker for Android using DatePickerAndroid API calls
// TODO: Implement entry validation
// TODO: Fix image displaying

var SignUpPage = React.createClass({

  getInitialState() {
    return {
      name: '',
      gender: [],
      date: new Date(),
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      profImage: AddImageIcon,
      country: [],
      sports: [],
    }
  },

  onDateChange: function(date) {
    this.setState({date: date});
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
        <View style={_cstyles.header_container}>
          <Text style={_cstyles.title_text}>
            {"Sign Up"}
          </Text>
        </View>
        <ScrollView style={styles.input_container}>
          <View style={styles.image_container}>
            <TouchableOpacity onPress={this.selectPhotoTapped}>
              <Image source={this.state.profImage}/>
            </TouchableOpacity>
          </View>

          <TextField
            label="Username"
            placeholder="username"
            secureTextEntry={false}
            keyboardType='default'
            onChangeText={(username) => this.setState({username})}
          />

          <TextField
            label="Email"
            placeholder="user@email.com"
            secureTextEntry={false}
            keyboardType='email-address'
            onChangeText={(email) => this.setState({email})}
          />

          <TextField
            label="Password"
            placeholder="password"
            secureTextEntry={true}
            keyboardType='default'
            onChangeText={(password) => this.setState({password})}
          />

          <TextField
            label="Confirm Password"
            placeholder="password"
            secureTextEntry={true}
            keyboardType='default'
            onChangeText={(passwordConf) => this.setState({passwordConf})}
          />

          <TextField
            label="Name"
            placeholder="name"
            secureTextEntry={false}
            keyboardType='default'
            onChangeText={(name) => this.setState({name})}
          />

          <View style={styles.input_row}>
            <Text style={_cstyles.section_header_text}>Birthday</Text>
            <View style={styles.date_picker_container}>

            </View>
          </View>
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

          <View style={styles.input_row}>
            <PopoverSelector
              title={'Country'}
              items={['Country1', 'Country2', 'Country3']}
              maxSelect={1}
              navigator={this.props.navigator}
              harvestSelection={(country) => this.setState({country})}
            />
          </View>
          <View style={_cstyles.divider_line}/>

          <View style={styles.input_row}>
            <PopoverSelector
              title={'Sports'}
              items={['Sport1', 'Sport2', 'Sport3']}
              navigator={this.props.navigator}
              harvestSelection={(sports) => this.setState({sports})}
            />
          </View>
          <View style={_cstyles.divider_line}/>

          <Button
            style={_cstyles.wide_button}
            styleDisabled={{color: 'grey'}}
            onPress={this.onSubmit}
          >
          {'Submit'}
        </Button>
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
    if (!this.validUsername()) {
      Alert.alert(
        'Invalid Username',
        'Username must be at least 6 characters long',
        [
          {text: 'OK'},
        ]
      )
    }
    else if (!this.validEmail()) {
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
    else {
      this.props.navToHomeFunc.call()
    }
  },
});



// Layout for labels and text input fields
var TextField = React.createClass({
  render: function() {
    return(
      <View>
        <View style={styles.input_row}>
          <Text style={_cstyles.section_header_text}>{this.props.label}</Text>
            <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder={this.props.placeholder}
              secureTextEntry={this.props.secureTextEntry}
              autoCorrect={false}
              keyboardType={this.props.keyboardType}
              onChangeText={this.props.onChangeText}
            />
        </View>
        <View style={_cstyles.divider_line}/>
      </View>
    );
  }
})

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
    paddingLeft: 10 * _cvals.dscale, 
  },
  input_row: {
    paddingTop: 10 * _cvals.dscale,
    paddingLeft: 10 * _cvals.dscale,
  },
  whiteFont: {
    color: "#FFF"
  },
  blackFront: {
    color: "#000"
  },

})

module.exports = SignUpPage;