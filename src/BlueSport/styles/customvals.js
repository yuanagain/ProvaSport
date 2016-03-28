/*
This module contains standard custom styling data for all apps
*/
'use strict';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var React = require('react-native');

const _cvals = {
  mainfont: 'avenir',
  skorange: '#F5A623',
  skblue: '#4A90E2',
  headerTextSize: 24,
  normalTextSize: 20,
  detailTextSize: 14,
  dscale: windowSize.height / 667,
  headerHeight: 70 * this.dscale
}

module.exports = _cvals;
