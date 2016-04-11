'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var SimpleRow = require('../smallparts/simplerow')

var MatchList = require('../bigparts/matchlist')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image
} = React;

var FriendsPage = React.createClass({
  getInitialState: function() {
    return (
      {

      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        match: {'Team1': "Team 1", "Team2": "Team 2",
                'scores': [[21,12], [13,21], [21,6]],
                'sport': 'Badminton', }
      }
    )
  },
  render: function() {
    var {
      match,
      navigator,
      ...props
    } = this.props;

    return (
    <View>
      <Header title={"TEAM"}
              mode={'nav'}
              navigator={this.props.navigator} />
      
        <ScrollView style={styles.container}
                    contentContainerStyle={styles.content}>
          <View style={_cstyles.body_container}>
            <SimpleRow title={"Team Name"} value={"Princeton Tigers"} />
            <View style={_cstyles.section_divider_line} ></View>

            <SimpleRow title={"Sport"} value={"Badminton"} />
            <View style={_cstyles.section_divider_line} ></View>

            <SimpleRow title={"Location"} value={"MBBC"} />
            <View style={_cstyles.section_divider_line} ></View>

            <SimpleRow title={"Members"} value={"3"} />
            <SimpleRow navigator={this.props.navigator} />

            <View style={_cstyles.section_divider_line} ></View>
            <SimpleRow title={"Recent Matches"} value={"4"} />

            <View style={styles.matches}>
              <MatchList
                navigator={this.props.navigator}
              />
            </View>

            <View style={_cstyles.section_divider_line} ></View>
          </View>
        </ScrollView>
      </View>
    </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    width: windowSize.width,
    flexDirection: 'column',
    // TODO BOUND HEIGHT HERE
    flex: 1
  },
  content: {
    flex: 1,
    width: windowSize.width,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
  section: {

  },
  matches: {
    height: 200 * _cvals.dscale
  }
})

module.exports = FriendsPage;
