'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var SelectionRow = require('./selectionrow')

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView
} = React;

var RecipeListing = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return { 
      dataSource: ds.cloneWithRows(this.props.items),
      selected: this.props.selection
    };
  },
  render: function() {
    var {
      name,
      confirmSelection,
      ...props
    } = this.props;
    console.log(this.props.items)
    return (
    <View style={styles.container}>
      <View style={styles.body_container}>
        <View style={_cstyles.header_container}>
          <Text style={styles.title_text}>
            {this.props.title}
          </Text>
          <View style={styles.divider_line}>
          </View>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderListingRow}
          style={styles.listView}
        />

        <View style={styles.divider_line}>
        </View>
      </View>
      <View style={styles.buttons_container}>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.confirmSelection}
          >
          {'Confirm Selection'}
        </Button>
      </View>
    </View>
    );
  },

  componentDidMount: function() {
    console.log(windowSize.height)
  },

  confirmSelection: function() {
    this.props.confirmSelection(this.state.selected)
  },

  renderListingRow(rowData) {
    return (
        <SelectionRow
        onSelect={this.onSelect}
        onDetail={this.onDetail}
        name={rowData['name']}
        selected={this.isSelected(rowData)}
        description_text={rowData['descr']}
        />
    )
  },

  isSelected: function(rowData) {
    if (this.state.selected.indexOf(rowData['name']) == -1) return false;
    return true;
  },

  onSelect: function(name) {
    // if not contained in selection
    if (this.state.selected.indexOf(name) == -1) {
      this.state.selected.push(name)
    }
    // if already contained in selection
    else {
      var index = this.state.selected.indexOf(name)
      this.state.selected.splice(index, 1)

    }
    console.log(this.state.selected)
  },

  onDetail: function(name) {
    console.log(name)
  },

  goBack: function() {
    this.props.navigator.pop()
  }
});

var styles = StyleSheet.create({
  title_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingTop: 30 * _cvals.dscale,
    paddingBottom: 5,
  },
  header_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginVertical: 5 * _cvals.dscale,
  },
  value_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: _cvals.mainfont,
    padding: 10,
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
  header_container: {
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: _cvals.skkellygreen,
    height: _cvals.headerHeight,
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
    button: {
      color: 'white',
      //height: windowSize.height * 1 / 10,
      //width: windowSize.width,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      fontSize: 28 * _cvals.dscale,
      textAlign: 'center',
      backgroundColor: _cvals.sknavy,
      width: windowSize.width,
      padding: 5,
      fontFamily: _cvals.mainfont,
      shadowRadius: 4,
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowOffset: {width: 0, height: 3}
    },
})

module.exports = RecipeListing;
