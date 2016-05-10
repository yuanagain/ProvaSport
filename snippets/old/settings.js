'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button_Native = require('react-native-button');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} = React;

var _const = require('../libs/constants')
var PopoverSelector = require('../bigparts/popoverselector')

var GameScoreRow_subco = require('../parts/gamescorerow_subco')
var DynamicList = require('../bigparts/dynamiclist')

import * as _ctools from '../libs/customtools.js'

var RowOfChildren = React.createClass({


  render: function() {
    var createRowOfChildren = (rowdata) => <ChildView id={rowdata['id']}
                                            name={rowdata['name']}
                                            key={_ctools.randomKey()} />;
    return (
      <View>
        <View>

        </View>
        <View style={styles.childrow}>
            {this.props.vector.map(createRowOfChildren)}
        </View>

      </View>
    );
  },

});


var ChildView = React.createClass({

  render: function() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.child}>
          <Text style={styles.childText}>{this.props.name}</Text>
          <Text style={styles.childText}>{"Index= "}</Text>
          <Text style={styles.childText}>{this.props.id}</Text>
        </View>
      </TouchableOpacity>
    );
  },
  onPress: function() {
    console.log("childview tapped")
  }
});

var SettingsScreen = React.createClass({

  getInitialState: function() {
    return (
      {
        SomeData: [  [{'id': 1, 'name': "name1"},
                      {'id': 2, 'name': "name2"},
                      {'id': 3, 'name': "name3"}],
                     [{'id': 4, 'name': "name4"},
                      {'id': 5, 'name': "name5"},
                      {'id': 6, 'name': "name6"}],
                     [{'id': 7, 'name': "name7"},
                      {'id': 8, 'name': "name8"},
                      {'id': 9, 'name': "name9"}], ]
      }
    )
  },

  render: function() {

    var createRowOfViews = (rowdata) => <RowOfChildren vector={rowdata}
                                                key={_ctools.randomKey()}/>;

    return (
      <View style={styles.container}>

        <View style={styles.container2}>


          {this.state.SomeData.map(createRowOfViews)}

        </View>
      </View>
    );
  },

  renderRow: function(score) {
    return (
      <GameScoreRow_subco
        val1={score[0]}
        val2={score[1]}
      />
    )
  }


});

var styles = StyleSheet.create({
  container2: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 0,
    backgroundColor: 'transparent',
    margin: 20,
    marginTop: 100,
    width: 400
  },
  container: {
    marginTop: 100,
  },
  childText: {
    marginHorizontal: 20
  },
  child: {
    flexDirection: 'column',
    width: 100,
    marginLeft: -0.5,
    marginTop: -0.5,
    height: 60,
    borderWidth: 1,
  },
  childrow: {
    flexDirection: 'row'
  },
  prof_pic_container: {
    marginTop: 20
  },
  prof_pic_image: {
    flex: 1,
    width: windowSize.width,
    height: windowSize.width,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

module.exports = SettingsScreen;
