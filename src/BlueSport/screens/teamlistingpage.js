'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var TeamRow = require('../parts/teamrow')
var SimpleRow = require('../smallparts/simplerow')
var TeamBlock = require('../smallparts/teamblock')

var LoadingPage = require('../screens/loadingpage')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  ListView,
  Image
} = React;

var TeamListingPage = React.createClass({
  getInitialState: function() {
    return (
      {
        data: [] // of teeamids
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        teams: [],
      }
    )
  },


  render: function() {
    var {
      navigator,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.teams)
    //if (this.state.loaded) {
    return (
      <View>
        <Header title={"TEAMS"}
                mode={'nav'}
                navigator={this.props.navigator} />

        <ListView   style={styles.container}
                    renderRow={this.renderRow}
                    dataSource={dataSource}>
        </ListView>
      </View>
    );
  },

  renderRow: function(data) {
    return (
      <View style={styles.row_container}>
        <TeamBlock 
           teamid={data}
           value={""}
           navigator={this.props.navigator}/>

        <View style={_cstyles.section_divider_line} ></View>
      </View>
    )
  },

});

var styles = StyleSheet.create({
  container: {
    width: windowSize.width,
    height: windowSize.height - 120 * _cvals.dscale,
    flexDirection: 'column',
    // TODO BOUND HEIGHT HERE
    flex: 1
  },
  row_container: {
    width: windowSize.width,
    flexDirection: 'column',
    // TODO BOUND HEIGHT HERE
    flex: 1
  },
})

module.exports = TeamListingPage;
