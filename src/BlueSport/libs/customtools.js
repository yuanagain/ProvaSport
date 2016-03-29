'use strict';

var React = require('react-native');


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;


var isNumeric = function(n) {
  return (!isNaN(parseFloat(n)) && isFinite(n))
}

var isValidScore = function(n) {
  if (isNumeric(n)) {
    if (n >= 0) {
      return true
    }
  }
  return false
}

var supplementIndex = function(items) {
  indexedItems = []
  for (var i = 0; i < items.length; i++) {
    indexedItems.push({'index': i, 'item': items[i]})
  }
  return indexedItems
}

var stripIndex = function(indexedItems) {
  items = []
  for (var i = 0; i < indexedItems.length; i++) {
    items.push(indexedItems[i]['item'])
  }
}


module.exports = [isNumeric];
