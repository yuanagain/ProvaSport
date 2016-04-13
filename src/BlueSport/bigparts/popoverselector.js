'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var PopoverSelect = require('./popoverselect')
import * as _ctools from '../libs/customtools.js'
import * as _rowRenders from '../smallparts/popoverselectrowrenders'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ListView
} = React;

var defaultRenderRow = function(rowText) {
  console.log('running')
  return (
    <View>
      <View style={default_styles.rowContainer}>
        <Text style={_cstyles.section_header_text}>
          {rowText + ' '}
        </Text>
      </View>
    </View>
  )
}

var PopoverSelector = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var mode = 'normal'
    if (this.props.maxSelect == 1 || this.props.mode == 'single') {
      mode = 'single'
    }

    var renderSelector = this.props.renderSelector
    var selectorRenderMode = 'normal'
    if (renderSelector == null) {
      renderSelector = () => this.defaultRenderSelector()
      selectorRenderMode = 'default'
    }

    var renderRow = this.props.renderRow
    if (this.props.magic == 'player') {
      renderRow = _rowRenders.playerRenderRow
    }

    
    return {
      /* NOTE SELECTION PASSED IN ARE OBJECTS, SELECTION
      USED INTERNALLY ARE INDICES
      */
      selection: _ctools.selectionNeedles(this.props.items, this.props.selection),
      mode: mode,
      renderSelector: renderSelector,
      accesses: 0,
      renderRow: renderRow
    };
  },

  getDefaultProps: function() {
    return {
      title: "Select",
      mode: 'normal',
      items: [],
      selection: [],
      minSelect: 0,
      maxSelect: Infinity,
      harvest: harvest_default,
      selectedStyle: { backgroundColor: _cvals.skbluelight },
      renderSelector: null,
      renderRow: _rowRenders.defaultRenderRow,
      magic: 'none'
    };
  },

  render: function() {
    var {
      title,
      mode,
      renderSelector,
      items,
      harvest,
      harvestArgs,
      renderRow,
      selection,
      minSelect,
      maxSelect,
      navigator,
      selectedStyle,
      ...props
    } = this.props;

    if (this.state.selectorRenderMode == 'normal') {
      return (
        <TouchableOpacity onPress={this.enterSelector}>
          {this.state.renderSelector()}
        </TouchableOpacity>
      );
    }
    else {
      var selectionText = "Select"

      if (this.state.selection.length > 0) {
        selectionText = this.props.items[this.state.selection[0]]
      }

      if (this.state.selection.length > 1) {
        selectionText += ', ' + this.props.items[this.state.selection[1]]
      }

      if (this.state.selection.length > 2) {
        selectionText += ', ...'
      }

      if (this.props.magic == 'player') {
        selectionText = "Edit Team"
        if (this.state.selection.length < 1) {
          selectionText = "Select Team"
        }
      }

      if (selectionText.length > 23) {
        selectionText = selectionText.substr(0, 20) + '...'
      }
      selectionText += ' '

      return (
        <TouchableOpacity onPress={this.enterSelector}>
          <View style={styles.defaultRenderSelector}>
            <Text style={_cstyles.header_text}>
              {this.props.title}
            </Text>
            <Text style={[_cstyles.standard_text,
                          {color: _cvals.skblue,
                           marginRight: 15 * _cvals.dscale}]}>
              {selectionText}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  },

  // to force view re-render
  update: function() {
  },

  enterSelector: function() {
    this.props.navigator.push({
      id: "PopoverSelect",
      component: PopoverSelect,
      passProps: {
        style: this.props.style,
        title: this.props.title,
        items: this.props.items,
        harvest: this.harvest,
        renderRow: this.state.renderRow,
        selection: this.state.selection,
        minSelect: this.props.minSelect,
        maxSelect: this.props.maxSelect,
        navigator: this.props.navigator,
        selectedStyle: this.props.selectedStyle,
        mode: this.state.mode,
        update: this.update,
        magic: this.props.magic
      }
    })
  },

  harvest: function(selection) {
    this.setState({selection: selection})
    var iselect = _ctools.traceIndices(this.props.items,
                                            this.state.selection)
    if (this.props.harvestArgs == undefined) {
      this.props.harvest(iselect)
    }
    else {
      this.props.harvest(iselect, this.props.harvestArgs)
    }
    this.props.navigator.pop()
  },

  defaultRenderSelector: function() {
    var selectionText = "Select"

    if (this.state.selection.length == 1) {
      selectionText = this.state.selection[0]
    }

    if (this.state.selection.length > 1) {
      selectionText = this.state.selection[0] + ',...'
    }

    return (
      <View style={styles.defaultRenderSelector}>
        <Text style={_cstyles.section_header_text}>
          {this.props.title }
        </Text>
        <Text style={[_cstyles.standard_text,
                      {color: _cvals.skblue,
                       marginRight: 15 * _cvals.dscale}]}>
          {selectionText}
        </Text>
      </View>
    )
  },

});

function harvest_default(selection) {
  //console.log("SELECTION: " + String(selection))
}

var styles = StyleSheet.create({
  selected_style: {
    // opacity: 0.5,
    backgroundColor: _cvals.skbluelight
  },
  defaultRenderSelector: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    margin: 0,
  },
  body_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    marginTop: 0,
  },
  section_container: {
    width: windowSize.width,
    backgroundColor: 'transparent'
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

var default_styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    margin: 5 * _cvals.dscale,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

})

module.exports = PopoverSelector;
