'use strict';
var React = require('react-native');
var _cstyles = require('../styles/customstyles.js')
var _cvals = require('../styles/customvals.js')

var DateTimePicker = require('react-native-datetime');
var Button = require('react-native-button');

var {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image
} = React;

var SignUpPage = React.createClass({

  render: function() {
    return (
      <View>
        <View style={_cstyles.header_container}>
          <Text style={_cstyles.title_text}>
            {"Sign Up"}
          </Text>
        </View>
        <View style={styles.image_container}>
          <Text>
            {"Image Picker"}
          </Text>
        </View>
        <ScrollView style={styles.input_container}>
          <View style={styles.input_row}>
            <Text style={_cstyles.standard_text}>Name</Text>
            <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder="Name"
              />
          </View>
          <View style={_cstyles.divider_line}/>
          <View style={styles.input_row}>
            <Text style={_cstyles.standard_text}>Email</Text>
            <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder="user@email.com"
              />
          </View>
          <View style={_cstyles.divider_line}/>
          <View style={styles.input_row}>
            <Text style={_cstyles.standard_text}>Password</Text>
            <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder="Password"
              secureTextEntry={true}
              />
          </View>
          <View style={_cstyles.divider_line}/>
          <View style={styles.input_row}>
            <Text style={_cstyles.standard_text}>Birthday</Text>
            <Button onPress={this.showDatePicker}>showDatePicker</Button>
          </View>
          <View style={_cstyles.divider_line}/>
        </ScrollView>
      </View>
    );
  },

  showDatePicker() {
    var date = this.state.date;
      this.picker.showDatePicker(date, (d)=>{this.setState({date:d});
    });
  },
});

var styles = StyleSheet.create({
  image_container: {
    height: 250 * _cvals.dscale,
    backgroundColor: _cvals.skblue,
  },

  input_container: {
    marginTop: 15 * _cvals.dscale,
  },
  input: {
    height: 40,
    fontSize: _cvals.standard_text,
    paddingLeft: 5 * _cvals.dscale,
  },
  input_row: {
    paddingTop: 15 * _cvals.dscale,
    paddingLeft: 15 * _cvals.dscale,
  },
  whiteFont: {
    color: "#FFF"
  },
  blackFront: {
    color: "#000"
  },

})

module.exports = SignUpPage;