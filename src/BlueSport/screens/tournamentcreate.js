'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var Button_Native = require('react-native-button');
var PickerExample = require('../screens/buttons/picker');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Picker
} = React;

var PickerItem = Picker.Item;

var SPORTS = {
	name: 'sports',
	sport: ['Basketball', 'Baseball', 'Tennis', 'Badminton', 'Volleyball']
  };

var TournamentCreate = React.createClass({
  getInitialState: function() {
    return {
      username: "Tournament Create",
      sportIndex: '1',
    }
  },

  render: function() {
    var currSport = SPORTS[this.state.sportIndex];
    return (
      <View style={styles.container}>
        <View style={styles.prof_pic_container}>
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
        <View style= {styles.container}>
        <Text>Sport:</Text>
          <Picker
            selectedValue={this.state.currSport}
            key={this.state.sportIndex}
            onValueChange={(sportIndex) => this.setState({currSport: sportIndex})}>
      
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />

          </Picker>
          
          </View>
        <View style = {styles.picker_container}>
          <TextInput
          ref = "tournamentName"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder={'Tournament Name'}
          onChangeText={(tournamentName) => this.setState({tournamentName})}
          value={this.state.tournamentName}
          />
        </View>
        <View style = {styles.container}>
          <TextInput
          ref = "Location"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder={'Location'}
          onChangeText={(Location) => this.setState({Location})}
          value={this.state.Location}
          />
        </View>
        <View style = {styles.container}>
          <TextInput
          ref= "Start"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder={'Start Date'}
          onChangeText={(Start) => this.setState({Start})}
          value={this.state.Start}
          />
        </View>
        <View style = {styles.container}>
          <TextInput
          ref= "End"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder={'End Date'}
          onChangeText={(End) => this.setState({End})}
          value={this.state.End}
          />
        </View>

        
          
        

        <View style = {styles.container}>
          <TextInput
          ref= "Format"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder={'Format'}
          onChangeText={(Format) => this.setState({Format})}
          value={this.state.Format}
          />
        </View>


        <View style={styles.bottom_container}>
          <View style={styles.submission_container}>
            <Button_Native
              style={{borderWidth: 1, borderColor: 'blue'}}
              styleDisabled={{color: 'grey'}}
              containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'orange'}}
                   style={{fontSize: 20, color: 'white'}}
              onPress={this._handlePress_submit_button}>
              Create
            </Button_Native>
          </View>
        </View>
      </View>
    );
  },
  _handlePress_submit_button(event) {
    console.log(this.username)
  },
});

var SportPicker = React.createClass({
  getInitialState: function() {
    return {
      username: "SportPicker"
    }
  },
  render: function() {
    return (
      <PickerExample />
      );
  },
});

var GameData = React.createClass({
  getInitialState: function() {
    return {
      username: "Gamedata"
    }
  },
  render: function() {
    return (
      <View style={styles_gamedata.container}>
        <GameData_row />
      </View>
    );
  },
});

var GameData_row = React.createClass({
  getInitialState: function() {
    return {
      data: 0
    }
  },
  render: function() {
    return (
      <View style={styles_gamedata_row.gamedata_row}>

        <View style={styles_gamedata_row.leftContainer}>
        </View>

        <View style={styles_gamedata_row.centerContainer}>

        </View>

        <View style={styles_gamedata_row.rightContainer}>
        </View>

      </View>
    );
  },
  _handlePress_dummy_button(event) {
    console.log("pressed")
  },
});

var styles_gamedata_row = StyleSheet.create({
  gamedata_row: {
    //width: windowSize.width,
    flexDirection: 'row',
    //flex: 1,
    backgroundColor: 'green',
    width: windowSize.width - 10,
    alignItems: 'center'
  },
  leftContainer: {
    height: 44,   
    width: 44,
    margin: 0,
  },
  centerContainer: {
    backgroundColor: 'red',
    height: 44,
    width: 200,
    alignSelf: 'center'
  },
  rightContainer: {
    height: 44,
    width: 44,
    margin: 0,
  },
})

var styles_gamedata = StyleSheet.create({
  gamedata_row: {
    //width: windowSize.width,
    flexDirection: 'column',
    flex: 0,
    backgroundColor: 'green',
    width: windowSize.width,
  },
  container: {
    marginTop: 20,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
})

var styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',

  },
  prof_pic_container: {

    backgroundColor: 'red',
    flexDirection: 'row',
    height: windowSize.width / 2,
  },
  prof_pic_image: {
    width: windowSize.width / 2,
    height: windowSize.width / 2,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  gamedata_container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'blue',
    height: windowSize.width / 3 * 2,
  },
  submission_container: {

    justifyContent: 'flex-end',
  },
  bottom_container: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flex: 1,
  },
  picker_container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'transparent',
    width: windowSize.width,
  }
})

module.exports = TournamentCreate;
