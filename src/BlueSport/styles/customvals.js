/*
This module contains standard custom styling data for all apps
*/
'use strict';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var React = require('react-native');
var {Platform} = React

var dscale = windowSize.width / 375
var vscale = windowSize.height / 667
var slength = 75 * dscale

const _cvals = {
  mainfont: 'avenir',
  skorange: '#F5A623',
  skorangelight: '#f9cd86',
  skblue: '#4A90E2',
  skbluelight: '#a6c9f2',
  sklightgreen: "#7ED321",
  headerTextSize: 28 * dscale,
  normalTextSize: 24 * dscale,
  detailTextSize: 18 * dscale,
  dscale: dscale,
  headerHeight: (Platform.OS === 'ios') ? 65 * dscale : 50 * dscale,
  slength: slength,
  bricklength: (slength) * 2.5 - 2,
  brickheight: ((slength) * 3 / 5 - 4 * dscale),
  thumbslength: ((slength) * 3 / 5 - 12 * dscale),
  stdmargin: 8 * dscale,
  timeout: 1000,
}

module.exports = _cvals;
