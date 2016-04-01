'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var TeamRow = require('../parts/teamrow')
var SimpleRow = require('../smallparts/simplerow')
var DynamicList = require('../bigparts/dynamiclist')
var TeamBlock = require('../smallparts/teamblock')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image
} = React;

var MatchPage = React.createClass({
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
      <Header title={"MATCH"}
              mode={'nav'}
              navigator={this.props.navigator} />
      <ScrollView style={styles.container}
                  contentContainerStyle={styles.content}>

        <SimpleRow title={"Date"} value={"3/12/2016"} />
        <View style={_cstyles.section_divider_line} ></View>

        <SimpleRow title={"Sport"} value={"Badminton"} />
        <View style={_cstyles.section_divider_line} ></View>

        <SimpleRow title={"Location"} value={"MBBC"} />
        <View style={_cstyles.section_divider_line} ></View>

        <TeamBlock title={"Team 1"} value={"Won"}
                    navigator={this.props.navigator}/>

        <TeamRow navigator={this.props.navigator} />

        <View style={_cstyles.section_divider_line} ></View>

        <TeamBlock title={"Team 2"} value={"Lost"}
                    navigator={this.props.navigator}/>

        <TeamRow navigator={this.props.navigator} />
        
        <View style={_cstyles.section_divider_line} ></View>

        <SimpleRow title={"Scores"} value={""} />
        <DynamicList
          items={this.props.match['scores']}
          magic={'scores_fixed'}
          />

        <View style={_cstyles.section_divider_line} ></View>

      </ScrollView>
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
})

module.exports = MatchPage;
