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
} = React;

// TODO: Datepicker for Android using DatePickerAndroid API calls
// TODO: Implement entry validation
// TODO: Fix image displaying

var SignUpPage = React.createClass({

  getInitialState() {
    return {
      name: '',
      gender: [],
      date: new Date()
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      profImage: AddImageIcon,
      country: [],
      sports: [],
    }
  },

  render: function() {
    var {
      name,
      date,
      navToHomeFunc,
      ...props
    } = this.props;

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
            onChangeText={(username) => this.setState({username})}
          />

          <TextField
            label="Email"
            placeholder="user@email.com"
            onChangeText={(email) => this.setState({email})}
          />

          <TextField
            label="Password"
            placeholder="password"
            onChangeText={(password) => this.setState({password})}
          />

          <TextField
            label="Confirm Password"
            placeholder="password"
            onChangeText={(passwordConf) => this.setState({passwordConf})}
          />

          <TextField
            label="Name"
            placeholder="name"
            onChangeText={(name) => this.setState({name})}
          />

          <View style={styles.input_row}>
            <Text style={_cstyles.section_header_text}>Birthday</Text>
            <DatePickerIOS
              date={this.state.date}
              mode="date"
              onDateChange={(date) => this.setState({date})}
            />
          </View>
          <View style={_cstyles.divider_line}/>

          <View style={styles.input_row}>
          <PopoverSelector
              title={'Gender'}
              items={['Male', 'Female']}
              renderRow={ (rowData) => <Text>{rowData}</Text> }
              navigator={this.props.navigator}
              harvestSelection={(gender) => this.setState({gender})}
            />
          </View>
          <View style={_cstyles.divider_line}/>

          <View style={styles.input_row}>
            <PopoverSelector
              title={'Country'}
              items={['Country1', 'Country2', 'Country3']}
              renderRow={ (rowData) => <Text>{rowData}</Text> }
              navigator={this.props.navigator}
              harvestSelection={(country) => this.setState({country})}
            />
          </View>
          <View style={_cstyles.divider_line}/>

          <View style={styles.input_row}>
            <PopoverSelector
              title={'Sports'}
              items={['Sport1', 'Sport2', 'Sport3']}
              renderRow={ (rowData) => <Text>{rowData}</Text> }
              navigator={this.props.navigator}
              harvestSelection={(sports) => this.setState({sports})}
            />
          </View>
          <View style={_cstyles.divider_line}/>

          <Button
            style={_cstyles.wide_button}
            styleDisabled={{color: 'grey'}}
            onPress={this.props.navToHomeFunc}
          >
          {'Submit'}
        </Button>
        </ScrollView>
      </View>
    );
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
    height: windowSize.height
  },
  image_container: {
    height: 200 * _cvals.dscale,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
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