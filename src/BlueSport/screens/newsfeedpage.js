'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var MatchPage = require('./matchpage')

var NewsFeedMatchRow = require('./newsfeedmatchrow')
var PopoverSelect = require('../parts/popoverselect')

var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')

var mainfont = 'avenir'
var skorange = '#F5A623'
var skblue = '#4A90E2'


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView
} = React;

var NewsFeedPage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },
  render: function() {
    console.log("YO")
    var {
      name,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <View style={_cstyles.header_container}>
        <Text style={_cstyles.title_text}>
          {"NEWS"}
        </Text>
        <View style={styles.divider_line}>
      </View>
      </View>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMatchRow}
        style={styles.listView}
      />

      <View style={styles.divider_line}>
      </View>
    </View>
    );
  },

  goBack: function() {
    this.props.navigator.pop()
  },

  renderMatchRow(rowData) {
    return (
        <NewsFeedMatchRow
        onPressFunction={() => this.onButtonPress("TEST")}/>
    )
  },
  onButtonPress(arg) {
    console.log(arg)
    this.props.navigator.push({
      id: "MatchScreen",
      component: MatchPage,
      passProps: {
        matchnum: "matchnum",
      }
    })
  },
});

var styles = StyleSheet.create({
  title_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    fontWeight: 'bold',
    padding: 10
  },
  header_text: {
    color: skblue,
    fontSize: 20,
    fontFamily: mainfont,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  value_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    padding: 10,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    opacity: 1.00,
    marginTop: 0,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    height: 40,
  },
  section_container: {
    width: windowSize.width,
    backgroundColor: 'transparent',
    opacity: 1.0,
  },
  divider_line: {
    backgroundColor: skblue,
    height: 1.2,
    opacity: 0.3,
    width: windowSize.width
  },
  listView: {
    backgroundColor: 'transparent',
  }
})

module.exports = NewsFeedPage;
