'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var _cvals = require('../styles/customvals')


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var mainfont = 'avenir'
var rowheight = 60 * _cvals.dscale


// SHARED FORMATTING.
// TODO: make univeral
var lightgreen = "#7ED321"
var mainfont = 'avenir'
var skblue = '#4A90E2'

var RecipeListingRow = React.createClass({
  getInitialState: function() {
    return (
      {
        status: 0,
        selected: this.props.selected,
        selectedStyle: this.getSelectionStyle(this.props.selected)
      }
    );
  },
  render: function() {
    var {
      name,
      description_text,
      onPressDetailFunction,
      onSelect,
      onDetail,
      thumbnailStyle,
      ...props
    } = this.props;

    return (
      <View >
        <View style={[styles.container, this.state.selectedStyle]}>
          <View style={[styles.thumbnail_container, this.state.selectedStyle]}>
            <TouchableHighlight onPress={() => this.onSelect()}>
              <Image
                source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                style={styles.thumbnail}
              />
            </TouchableHighlight>
          </View>
          <TouchableOpacity onPress={() => this.onDetail()}>
            <View style={[styles.content_container]}>
              <Text
              style={styles.name_text}>
                {this.props.name}
              </Text>
              <Text style={styles.description_text}>
                {this.props.description_text}
              </Text>
            </View>
          </TouchableOpacity >
        </View>
        <View style={styles.divider_line}>
        </View>
      </View>
    );
  },

  onSelect: function() {
    if (this.state.selected) {
      this.props.onSelect(this.props.name)
      this.setState({selectedStyle: {}, selected: false})
    }
    else {
      this.props.onSelect(this.props.name)
      this.setState({selectedStyle: styles.selectedStyle, selected: true})
    }
    return
  },

  getSelectionStyle: function(selected) {
    if (selected) return styles.selectedStyle
    return {}
  },

  onDetail: function() {
    this.onSelect()
    // this.props.onDetail(this.props.name)
  }
});

var styles = StyleSheet.create({
  description_text: {
    color: 'black',
    fontSize: 14 * _cvals.dscale,
    fontFamily: mainfont,
  },
  name_text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24 * _cvals.dscale,
    fontFamily: mainfont,
  },
  column_r_r: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  container: {
    flexDirection: 'row',
    height: rowheight,
    width: windowSize.width
  },
  columns_container: {
    flexDirection: 'row',
    flex: 0,
    width: windowSize.width,
  },
  content_container: {
    margin: 5,
    height: rowheight,
    width: windowSize.width * 3 / 5
  },
  thumbnail_container: {
    height: rowheight
  },
  selectedStyle: {
    opacity: 0.5,
    backgroundColor: _cvals.skblue
  },
  thumbnail: {
    height: rowheight,
    width: rowheight,
    borderRadius: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  thumbnail_selected: {
    height: rowheight,
    width: rowheight,
    borderRadius: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    width: windowSize.width
  },
})

module.exports = RecipeListingRow;
