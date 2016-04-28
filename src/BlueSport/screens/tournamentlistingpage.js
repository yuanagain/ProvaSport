'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')

var SimpleRow = require('../smallparts/simplerow')
var TournamentListingRow = require('../smallparts/tournamentlistingrow')

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

var TournamentListingPage = React.createClass({
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
        tournaments: [],
      }
    )
  },


  render: function() {
    var {
      navigator,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.tournaments)
    //if (this.state.loaded) {
    return (
      <View>
        <Header title={"TOURNAMENTS"}
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
      <View style={styles.container}>
        <TournamentListingRow
           tournamentid={data}
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
    flexDirection: 'column',
    // TODO BOUND HEIGHT HERE
    flex: 1
  },
})

module.exports = TournamentListingPage;
