'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');


var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')

import * as _ctools from '../libs/customtools.js'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ListView
} = React;

var PopoverSelect = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      selection: this.props.selection,
      dataSource: ds.cloneWithRows(_ctools.supplementIndex(this.props.items)),
      validSelection: _ctools.inRange(this.props.minSelect,
                                      this.props.maxSelect,
                                      this.props.selection.length)
    };
  },

  getDefaultProps: function() {
    return {
      title: "Select",
      dataSource: [],
      selection: [],
      minSelect: 0,
      maxSelect: Infinity,
    };
  },

  render: function() {
    var {
      title,
      harvestSelection,
      renderRow,
      selection,
      minSelect,
      maxSelect,
      selectedStyle,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View style={styles.body_container}>
        <View style={_cstyles.header_container}>
          <Text style={_cstyles.title_text}>
            {this.props.title}
          </Text>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.listView}
        />

        <View style={styles.divider_line}>
        </View>
      </View>
      <View style={styles.buttons_container}>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{backgroundColor: 'grey'}}
          onPress={this.harvestSelection}
          disabled={this.validSelection}
          >
          {'Confirm Selection'}
        </Button>
      </View>
    </View>
    );
  },

  inSelectionRange: function() {
    var n = this.state.selection.length
    if (_ctools.inRange(n, this.props.minSelect, this.props.maxSelect)) {
      return true
    }
    return false
  },

  validateSelection: function() {
    this.setState({validSelection: _ctools.inRange(this.props.minSelect,
                                                   this.props.maxSelect,
                                                   this.state.selection.length)})
  },

  harvestSelection: function() {
    var iselect = _ctools.traceIndices(this.props.items,
                                            this.state.selection)
    this.props.harvestSelection(iselect)
  },

  cancelSelection: function() {
    this.props.cancelSelection([])
  },

  toggleSelect: function(index) {
    this.validateSelection()
    var loc = _ctools.indexOf(this.state.selection, index)
    // if already in selection
    if (loc != -1) {
      this.state.selection.splice(loc, 1)
    }
    // if not in selection
    else {
      this.state.selection.push(index)
    }
    this.setState( {selection: this.state.selection} )
    console.log(this.state.selection)
  },

  inSelection: function(index) {
    return _ctools.contains(this.state.selection, index)
  },

  renderRow: function(rowData) {
    return (
      <RowWrapper
        index={rowData['index']}
        selected={_ctools.contains(this.state.selection, rowData['index'])}
        toggleSelect={this.toggleSelect}
        inSelection={this.inSelection}
        rowData={rowData['item']}
        renderRow={this.props.renderRow}
        selectedStyle={this.props.selectedStyle}
        />
    );
  },

  goBack: function() {
    this.props.goBack()
  },
});


var RowWrapper = React.createClass({
  getInitialState: function() {
    var initialStyle = {}
    if (this.props.selected) {
      initialStyle = this.props.selectedStyle
    }
    return {
      selected: this.props.selected,
      style: initialStyle
    };
  },

  render: function() {
    var {
      index,
      selected,
      toggleSelect,
      inSelection,
      renderRow,
      rowData,
      selectedStyle,
      ...props
    } = this.props;

    return (
        <TouchableOpacity
          onPress={this.toggleSelect}
          style={[styles.row, this.state.style]}>
            {this.props.renderRow(rowData)}
        </TouchableOpacity>

    );
  },
  toggleSelect: function() {
    this.props.toggleSelect(this.props.index)
    var selected = this.props.inSelection(this.props.index)
    console.log(selected)
    var new_style = {}
    if (selected) {
      new_style = this.props.selectedStyle
    }

    this.setState({selected: selected, style: new_style})
  },

});

var styles = StyleSheet.create({
  row: {
    height: 40,
    width: 60,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
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

module.exports = PopoverSelect;
