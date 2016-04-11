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

var LoadingPage = require('../screens/loadingpage')

import * as Match from '../modules/match'

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
        match: Match.default_match,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        matchid: 0,
      }
    )
  },


  render: function() {
    var {
      team,
      match,
      navigator,
      ...props
    } = this.props;


    //if (this.state.loaded) {
      return (
        <View>
          <Header title={"MATCH"}
                  mode={'nav'}
                  navigator={this.props.navigator} />
          <ScrollView style={styles.container}
                      contentContainerStyle={styles.content}>
            <View style={_cstyles.body_container}>
              <SimpleRow title={"Date"} value={""+(new Date(this.state.match.datetime)).toDateString()} />
              <View style={_cstyles.section_divider_line} ></View>

              <SimpleRow title={"Sport"} value={this.state.match.sport} />
              <View style={_cstyles.section_divider_line} ></View>

              <SimpleRow title={"Location"} value={this.state.match.location} />
              <View style={_cstyles.section_divider_line} ></View>

              <TeamBlock title={"Team 1"}
                         teamid={this.state.match.teams[0]}
                         value={""}
                         navigator={this.props.navigator}/>

              <TeamRow navigator={this.props.navigator} />

              <View style={_cstyles.section_divider_line} ></View>

              <TeamBlock title={"Team 2"}
                         teamid={this.state.match.teams[1]}
                         value={""}
                         navigator={this.props.navigator}/>

              <TeamRow navigator={this.props.navigator} />

              <View style={_cstyles.section_divider_line} ></View>

              <SimpleRow title={"Scores"} value={""} />
              <DynamicList
                items={this.state.match.scores}
                magic={'scores_fixed'}
                />

              <View style={_cstyles.section_divider_line} ></View>
            </View>
          </ScrollView>
        </View>
      );
    //}

    // else {
    //   return (
    //     <LoadingPage navigator={this.props.navigator}/>
    //   );
    // }
  },

  fetchMatch: function(data) {
    this.state.match = data
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Match._GetMatch(this.props.matchid, this.fetchMatch)

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
