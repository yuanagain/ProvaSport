/*
This module contains standard custom styling data for all apps
*/
'use strict';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var React = require('react-native');

var dscale = windowSize.height / 667
var slength = 75 * dscale

const _cvals = {
  mainfont: 'avenir',
  skorange: '#F5A623',
  skblue: '#4A90E2',
  skbluelight: '#a6c9f2',
  sklightgreen: "#7ED321",
  headerTextSize: 24,
  normalTextSize: 20,
  detailTextSize: 14,
  dscale: dscale,
  headerHeight: 70 * dscale,
  slength: slength,
  bricklength: (slength) * 2.5 - 2,
  brickheight: slength,
  thumbslength: ((slength) * 3 / 5 - 12 * dscale),
  stdmargin: 8 * dscale,
}

module.exports = _cvals;
