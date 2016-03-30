/*
This module contains standard custom styling data for all apps
*/
'use strict';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var React = require('react-native');

let _cvals = require('../styles/customvals')

const _const = {
  bignum: 2^32 - 1,
  slength: 75 * _cvals.dscale , 
}



module.exports = _const;
