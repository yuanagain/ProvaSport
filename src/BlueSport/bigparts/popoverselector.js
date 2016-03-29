'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var PopoverSelect = require('./popoverselect')
import '../libs/customtools.js'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView
} = React;

var PopoverSelector = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      selection: this.props.selection
    };
  },

  getDefaultProps: function() {
    return {
      title: "Select",
      items: [],
      selection: [],
      minSelect: 0,
      maxSelect: Infinity,
      harvestSelection: harvestSelection_default,
      selectedStyle: { opacity: 0.5, backgroundColor: _cvals.skorange },
    };
  },

  render: function() {
    var {
      style,
      title,
      items,
      harvestSelection,
      renderRow,
      selection,
      minSelect,
      maxSelect,
      navigator,
      selectedStyle,
      ...props
    } = this.props;

    return (
      <Button
        style={this.props.style}
        onPress={this.enterSelector}
        >
        {this.props.title}
      </Button>
    );
  },

  enterSelector: function() {
    this.props.navigator.push({
      id: "PopoverSelect",
      component: PopoverSelect,
      passProps: {
        style: this.props.style,
        title: this.props.title,
        items: this.props.items,
        harvestSelection: this.harvestSelection,
        renderRow: this.props.renderRow,
        selection: this.state.selection,
        minSelect: this.props.minSelect,
        maxSelect: this.props.maxSelect,
        navigator: this.props.navigator,
        selectedStyle: this.props.selectedStyle,
      }
    })
  },

  harvestSelection: function(selection) {
    this.props.harvestSelection(selection)
    this.props.navigator.pop()
  },

});

function harvestSelection_default(selection) {
  console.log("SELECTION: " + String(selection))
}

var styles = StyleSheet.create({
  selected_style: {
    opacity: 0.5,
    backgroundColor: _cvals.skorange
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
    margin: 0,
  },
  body_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    opacity: 1.00,
    marginTop: 0,
  },
  section_container: {
    width: windowSize.width,
    backgroundColor: 'transparent',
    opacity: 1.0,
  },
  divider_line: {
    backgroundColor: _cvals.skgreen,
    height: 1.2,
    opacity: 0.3,
    width: windowSize.width
  },
  listView: {
    backgroundColor: 'transparent',
  },
  buttons_container: {
      //height: windowSize.height * 1 / 10,
      width: windowSize.width,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0,
      backgroundColor: 'transparent',
    },
})

module.exports = PopoverSelector;
