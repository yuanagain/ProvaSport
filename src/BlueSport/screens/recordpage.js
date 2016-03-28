'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var ScoreRowRecord = require('./scorerowrecord')

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ListView,
  Modal,
} = React;


var ScoreRow = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.scoreRow}>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
});

var createRowOfViews = (text) => <ScoreRow text={text} />;

var RecordPage = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => this.rowChanged(r1, r2)})
    return (
      {
        username: '',
        password: '',
        scoreData: [(21, 5), (10, 21), (21, 12)],
        dataSource: ds.cloneWithRows([[21, 5], [10, 21], [21, 12]])
      }
    );
  },
  render: function() {
    var {
      name,
      loginFunction,
      ...props
    } = this.props;
    var SomeData = ["hello1", "hello2"]

    return (
    <View style={styles.container}>
      <View>
        <View style={_cstyles.header_container}>
          <Text style={_cstyles.title_text}>
            {"RECORD ACTIVITY"}
          </Text>
        </View>

        <View style={styles.divider_line}>
        </View>

        <View >
          {SomeData.map(createRowOfViews)}
        </View>

      </View>

      <View style={_cstyles.buttons_container}>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.props.loginFunction}
          >
          Record
        </Button>
      </View>
    </View>
    );
  },

  renderRow(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  updateScores: function() {

  },

  rowChanged: function(r1, r2) {
    // for (var i in r1) {
    //   if (i != r1[key]) return false
    // }
    for (var i = 0; i < r1.length; i++) {
      if (r1[i] != r2[i]) return true
    }
    return false
  }
});



var styles = StyleSheet.create({
  title_text: {
    color: 'white',
    fontSize: 30,
    fontFamily: _cvals.mainfont,
    padding: 10
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
    margin: 0,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: _cvals.skblue,
    height: 120
  },
  inputs_container: {
    width: windowSize.width,
    //height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7bafea',
    opacity: 1.0,
  },
  buttons_container: {
    width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 0,
    backgroundColor: 'transparent',
  },
  white_line: {
    backgroundColor: 'white',
    height: 2,
    opacity: 0.3,
    width: windowSize.width
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width:320,
    height:480,
  }
})

module.exports = RecordPage;
