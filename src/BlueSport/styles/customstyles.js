'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Platform,
} = React;

let _cvals = require('./customvals')

var CustomStylesDefault = StyleSheet.create({
  title_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    marginBottom: (Platform.OS === 'ios') ? 0 : _cvals.headerHeight / 8,
  },
  section_header_text: {
    color: 'black',
    fontSize: 26 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingHorizontal: 10 * _cvals.dscale,
  },
  header_text: {
    color: 'black',
    fontSize: 23 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingHorizontal: 8 * _cvals.dscale,
    marginBottom: (Platform.OS === 'ios') ? 0 : 4 * _cvals.dscale,
  },
  standard_text: {
    color: 'black',
    fontSize: 20 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
  },
  detail_text: {
    color: 'black',
    fontSize: 16 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
  },
  light_text: {
    color: 'grey',
    fontSize: 12 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
  },
  header_container: {
    height: _cvals.headerHeight,
    width: windowSize.width,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: _cvals.skblue,
    justifyContent: 'space-between',
  },
  buttons_container: {
    width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 0,
    backgroundColor: 'transparent',
  },
  wide_button: {
    color: 'white',
    //height: windowSize.height * 1 / 10,
    //width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    fontSize: 24 * _cvals.dscale,
    textAlign: 'center',
    backgroundColor: _cvals.skorange,
    width: windowSize.width,
    padding: 6 * _cvals.dscale,
    fontFamily: 'avenir',
    shadowRadius: 4 * _cvals.dscale,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: -1}
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    // marginVertical: 0.5,
    width: windowSize.width
  },
  section_divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    marginVertical: 0.5 ,
    width: 2 * windowSize.width,
    marginLeft: -100 * _cvals.dscale,
  },
  indented_container: {
    marginLeft: 40 * _cvals.dscale,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body_container: {
    marginLeft: (Platform.OS === 'ios') ? 0 : _cvals.stdmargin,
  },
  centeredText: {
    textAlign: 'center',
  },
  centering_wrap: {
    justifyContent: 'center',
    width: 60 * _cvals.dscale
  },
  close: {
    height: 20 * _cvals.dscale,
    width: 20 * _cvals.dscale
  },
  add: {
    height: 30 * _cvals.dscale,
    width: 30 * _cvals.dscale
  },
  vline: {
    width: 1,
    backgroundColor: 'black',
  },
  hline: {
    height: 1,
    backgroundColor: 'black',
  },
  left_arrow: {
    height: 28 * _cvals.dscale,
    width: 28 * _cvals.dscale,
    marginLeft: 12 * _cvals.dscale,
    marginTop: (Platform.OS === 'ios') ? 0 : _cvals.headerHeight / 10,
  },
  right_arrow: {
    height: 28 * _cvals.dscale,
    width: 28 * _cvals.dscale,
    marginRight: 15 * _cvals.dscale,
  },
})

var chooseStyle = function() {

  if (true)
    return CustomStylesDefault
}

var CustomStyles = chooseStyle()

module.exports = CustomStyles;
