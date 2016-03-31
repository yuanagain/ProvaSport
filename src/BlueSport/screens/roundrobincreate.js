'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var Button_Native = require('react-native-button');
//var PlayerData = require('../playerdata')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;




var RoundRobinCreate = React.createClass({
  getInitialState: function() {
    return {
      username: "Round Robin Create"
    }
  },
  render: function() {
    var {
      ...props
    } = this.props;
    var PlayerData = ["http://www.huffingtonpost.com/contributors/margaret-bangs/headshot.jpg",
      "http://www.huffingtonpost.com/contributors/james-cave/headshot.jpg",
      "http://s.huffpost.com/contributors/jackie-nguyen/headshot.jpg",
      "http://s.huffpost.com/contributors/will-lanier/headshot.jpg"]
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
        <View >
          {PlayerData.map(createRowOfPlayers)}
        </View >
        <View >
          {PlayerData.map(createColumnOfPlayers)}
        </View >
        <View >
          {PlayerData.map(createRowOfViews)}
        </View >
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

var RowView = React.createClass({
shouldComponentUpdate: function(nextProps, nextState) {
  return false;
},
render: function() {
  return (
    <View style={styles.row_style}>
      <Text>this.props.text</Text>
    </View>
  );
}
});

var createRowOfViews = (text) => <RowView text={text} />;

var PlayerRow = React.createClass({
shouldComponentUpdate: function(nextProps, nextState) {
  return false;
},
render: function() {
  return (
    <View style={styles.row_prof_pic_container}>
      <Image style = {styles.prof_pic}
      source = {this.props.text}/>
    </View>
  );
}
});

var createRowOfPlayers = (text) => <PlayerRow source={text} />;




var PlayerColumn = React.createClass({
shouldComponentUpdate: function(nextProps, nextState) {
  return false;
},
render: function() {
  return (
    <View style={styles.column_prof_pic_container}>
      <Text>this.props.text</Text>
    </View>
  );
}
});

var createColumnOfPlayers = (text) => <PlayerColumn text={text} />;







var styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
  },
  header_container: {
    margin: 10,
    backgroundColor: 'black',
    width: windowSize.width,
    height: windowSize.height / 10, 
  },
  header_pic: {
    margin: 0,
    width: windowSize.width,
    height: windowSize.height / 11,
  },
  header_text: {
    color: 'black',
    fontSize: 30,
    //fontFamily: mainfont,
    padding: 10,
  },
  row_prof_pic_container: {
    //flex-wrap: nowrap,
    //justify-content: flex-start,
    backgroundColor: 'red',
    flexDirection: 'row',
    height: windowSize.width / 10,
  },
  column_prof_pic_container: {
    //flex-wrap: nowrap,
    //justify-content: flex-start,
    backgroundColor: 'red',
    flexDirection: 'column',
    width: windowSize.width / 6,
  },
  prof_pic: {
    width: windowSize.width / 6,
    height: windowSize.width / 6,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  row_style: {
    flexDirection: 'row',
    width: windowSize.width,
    height: windowSize.width / 10
  },
  match : {
    padding: 0.1,
    width: windowSize.width / 10,
    height : windowSize. width / 10,
  },
  submission_container: {

    justifyContent: 'flex-end',
  },
  bottom_container: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flex: 1,
  }
})

module.exports = RoundRobinCreate;
