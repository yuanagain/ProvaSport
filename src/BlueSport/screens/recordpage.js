'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var WideButton = require('../smallparts/widebutton');

// var ScoreRowRecord = require('./scorerowrecord')

// var PopoverSelect = require('./popoverselect')
var DynamicList = require('../bigparts/dynamiclist')
var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var PopoverSelector = require('../bigparts/popoverselector')
var Header = require('../parts/header')
import * as _ctools from '../libs/customtools.js'
var SimpleRow = require('../smallparts/simplerow')
var TextField = require('../smallparts/textfield')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Modal,
} = React;

var blank_form = {   
        isVisible: false,      
        name: "",
        location: "",
        contract: ["Default"],
        sport: [],
        teams: [[],[],],
        scores: [],
      }

var items = ["Item 1", "Item 2"];

var RecordPage = React.createClass({

  getInitialState: function() {
  
    return (
      this.props.form
    );
  },

  getDefaultProps: function() {
    return ({
      mode: '',
      form: blank_form
    })
  },

  render: function() {
    var {
      name,
      loginFunction,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View style={{height: 400 *_cvals.dscale}} >
        <Header title={"RECORD"}
                mode={this.props.mode}
                navigator={this.props.navigator} />

        <View style={_cstyles.body_container}>
          <TextField
            label="Match Name"
            placeholder="Optional"
            keyboardType='default'
            onChangeText={(name) => this.setName(name)}
          />

          <TextField
            label="Location"
            placeholder="Optional"
            keyboardType='default'
            onChangeText={(location) => this.setLocation(location)}
          />

          <PopoverSelector
            title={'Contract'}
            items={['Default']}
            navigator={this.props.navigator}
            selection={this.state.contract}
            mode={'single'}
            harvest={this.setContract}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <PopoverSelector
            title={'Sport'}
            items={['Tennis', 'Badminton', 'Squash', 'Basketball', 'Soccer']}
            navigator={this.props.navigator}
            selection={this.state.sport}
            harvest={this.setSport}
            mode={'single'}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <PopoverSelector
            title={'Team 1'}
            magic={'player'}
            items={[0, 1]}
            navigator={this.props.navigator}
            selection={this.state.teams[0]}
            harvest={this.setTeams}
            harvestArgs={0}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <PopoverSelector
            title={'Team 2'}
            magic={'player'}
            items={[0, 1]}
            navigator={this.props.navigator}
            selection={this.state.teams[1]}
            harvest={this.setTeams}
            harvestArgs={1}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <SimpleRow
            title={'Scores '}
            value={''}/>

          <ScrollView style={{height: 130 * _cvals.dscale}}>
            <DynamicList
              items={this.state.scores}
              magic={'scores'}
              harvest={this.setScores}
              />
          </ScrollView>
        </View>
      </View>
        <View style={_cstyles.buttons_container}>
          <WideButton
            text="Record"
            onPress={()=>this.submit()}
            />
        </View>

    </View>
    );
  },


  setName: function(name) {
    if (true) {
      this.setState({name})
    }
  },

  setLocation: function(location) {
    if (true) {
      this.setState({location})
    }
  },
  

  reset: function() {
    this.setState({ selectedSport: ["Tennis"] })
    this.setState({ teams: [[],[]] })
    this.setState({ scores: [] })
    this.setState({ contract: ['Default'] })

        //     selectedSport: ["None Selected"],
        // selectedContract: ["None Selected"],
        // selectedTeam1: [],
        // selectedTeam2: [],
        // contract: ['Default'],
        // scores: [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],],
        // teams: [[],[],]
  },

  renderRow: function(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  setTeams: function(team, index) {
    this.state.teams[index] = team
    this.setState({teams: this.state.teams})
  },

  setScores: function(scores) {
    this.setState({scores: scores})
  },

  submit: function() {
    console.log("SUBMITTING")
  }


});



var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
  },
})

module.exports = RecordPage;
