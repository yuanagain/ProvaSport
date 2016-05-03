'use strict';
var React = require('react-native')
var _cstyles = require('../styles/customstyles.js')
var _cvals = require('../styles/customvals.js')
var Dimensions = require('Dimensions')
var windowSize = Dimensions.get('window')
//var KeyboardAwareScrollView = require('react-native-keyboard-aware-scroll-view')

var {
  StyleSheet,
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
} = React;


var TextField = React.createClass({
  render: function() {
    return(
      <View>
        <View style={styles.input_row}>
          <Text style={_cstyles.section_header_text}>{this.props.label}</Text>
          <TextInput
            ref='input'
            value={this.props.value}
            style={[styles.input, _cstyles.standard_text]}
            placeholder={this.props.placeholder}
            underlineColorAndroid='rgba(0,0,0,0)'
            secureTextEntry={this.props.secureTextEntry}
            autoCorrect={false}
            maxLength={35}
            keyboardType={this.props.keyboardType}
            onChangeText={this.props.onChangeText}
          />
        </View>
        <View style={_cstyles.divider_line}/>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  // Height bound necessary for ScrollView to work as expected
  input_container: {
    height: windowSize.height
  },
  input: {
    height: 50 * _cvals.dscale,
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



module.exports = TextField;
