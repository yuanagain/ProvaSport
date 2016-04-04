'use strict';

var _const = require('./constants')

var isNumeric = function (n) {
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
  var indexedItems = []
  for (var i = 0; i < items.length; i++) {
    indexedItems.push({'index': i, 'item': items[i]})
  }
  return indexedItems
}

var stripIndex = function(indexedItems) {
  var items = []
  for (var i = 0; i < indexedItems.length; i++) {
    items.push(indexedItems[i]['item'])
  }
}

var indexOf = function(haystack, needle) {
  for (var i = 0; i < haystack.length; i++) {
      if (needle == haystack[i]) { return i }
  }
  return -1
}

var contains = function(haystack, needle) {
  return (indexOf(haystack, needle) != -1)
}

var inRange = function(n, min, max) {
  if (n > max) { return false }
  if (n < min) { return false }
  return true
}

/*
takes list of indices, recovers corresponding list
of items
*/
var traceIndices = function(haystack, indices) {
  var items = []
  for (var i = 0; i < indices.length; i++) {
    items.push(haystack[indices[i]])
  }
  return items
}

/*
takes list of item, recovers corresponding list
of indices
*/
var selectionNeedles = function(haystack, needles) {
  var indices = []
  for (var i = 0; i < needles.length; i++) {
    var index = indexOf(haystack, needles[i])
    indices.push(i)
  }
  return indices
}

var randomKey = function() {
  return Math.random(1, _const.bignum)
}

module.exports = {indexOf, supplementIndex, contains, inRange,
                  traceIndices, isValidScore, randomKey,
                  selectionNeedles};
