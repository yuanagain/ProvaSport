'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var ScoreRowRecord = require('./scorerowrecord')
var PopoverSelect = require('./popoverselect')

var GameScoreRow = require('../parts/gamescorerow')
var GameScoreRowAdd = require('../parts/gamescorerowadd')

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var PopoverSelector = require('../bigparts/popoverselector')
import * as _ctools from '../libs/customtools.js'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Modal,
} = React;

var dummyselections = [
  {'name': '1', 'descr': 'Description 1'},
  {'name': '2', 'descr': 'Description 2'},
  {'name': '3', 'descr': 'Description 3'},
  {'name': '4', 'descr': 'Description 4'},
  {'name': '5', 'descr': 'Description 5'},
  {'name': '6', 'descr': 'Description 6'},
  {'name': '7', 'descr': 'Description 7'},
  {'name': '8', 'descr': 'Description 8'},
  {'name': '9', 'descr': 'Description 9'},
]


var items = ["Item 1", "Item 2"];

var RecordPage = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => this.rowChanged(r1, r2)})
    return (
      {
        item: "Select Item",
        isVisible: false,
        username: '',
        password: '',
        scoreData: [(21, 5), (10, 21), (21, 12)],
        dataSource: ds.cloneWithRows([[21, 5], [10, 21], [21, 12]]),
        selectedSport: "None Selected",
        selectedContract: "None Selected",
        selectedTeam1: [],
        selectedTeam2: [],
        selection: [],

        SomeData: [{'key': 1, 'scores': [21,  2]},
                   {'key': 2, 'scores': [11, 21]},
                   {'key': 3, 'scores': [12, 21]},
                   {'key': 4, 'scores': [11, 14]}]
      }
    );
  },
  render: function() {
    var {
      name,
      loginFunction,
      ...props
    } = this.props;

    var createRowOfViews = (data) => <GameScoreRow index={data['key']}
                                                   val1={data['scores'][0]}
                                                   val2={data['scores'][1]}
                                                   kill={this.deleteGame}
                                                   key={_ctools.randomKey()}/>;

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

        <TouchableOpacity style={styles.button} onPress={() => this.gotoPopoverSelect(dummyselections)}>
          <Text style={_cstyles.section_header_text}>{this.state.item}</Text>
        </TouchableOpacity>
        <View style={_cstyles.divider_line}>
        </View>

        <View>
          <Text style={_cstyles.section_header_text}>{"Contract"}</Text>
        </View>
        <View style={_cstyles.divider_line}>
        </View>

        <GameScoreRow index={1} val1={10} val2={11} />
        <GameScoreRowAdd onIconPress={this.addGame} />

        <View>
          <Text style={_cstyles.section_header_text}>{"Sport"}</Text>
        </View>
        <View style={_cstyles.divider_line}>
        </View>

        <View>
          <Text style={_cstyles.section_header_text}>{"Team 1"}</Text>
        </View>
        <View style={_cstyles.divider_line}>
        </View>

        <PopoverSelector
          items={['text1', 'text2', 'text3']}
          renderRow={ (rowData) => <Text>{rowData}</Text> }
          navigator={this.props.navigator}
          selection={[]}
        />

        <View>
          <Text style={_cstyles.section_header_text}>{"Team 2"}</Text>
        </View>
        <View style={_cstyles.divider_line}>
        </View>

        <View>
          <Text style={_cstyles.section_header_text}>{"Scores"}</Text>
        </View>
        <View >
          {this.state.SomeData.map(createRowOfViews)}
        </View>

      </View>
      <View style={_cstyles.buttons_container}>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.props.loginFunction}
          >
          {'Record'}
        </Button>
      </View>
    </View>
    );
  },

  goBack: function() {
    this.props.navigator.pop()
  },

  gotoPopoverSelect: function(items) {
    this.props.navigator.push({
      id: "PopoverSelect",
      component: PopoverSelect,
      passProps: {
        title: 'select stuff',
        goBack: this.goBack,
        confirmSelection: this.confirmSelection,
        items: items,
        selection: this.state.selection,
      }
    })
  },

  deleteGame: function(index) {
    console.log('deleting')

    // reorder states
    for (var i = 0; i < this.state.SomeData.length; i++) {

      if (this.state.SomeData[i]['key'] == index) {

        this.state.SomeData.splice(i, 1)
        var SomeData = this.state.SomeData

        this.setState({SomeData: SomeData})

        return;
      }
    }
  },

  addGame: function(scores) {
    console.log("adding game")
    console.log(scores)
  },

  onSelect: function(name) {
    console.log(name)
    this.props.navigator.push({
      id: "Select",
      component: PopoverSelect,
      passProps: {
        name: name,
        imageLink: 'http://facebook.github.io/react/img/logo_og.png',
        descr: "Description Text",
        goBack: this.goBack,

      }
    })
  },

  confirmSelection(selected) {
    this.selected_1 = selected
    console.log("confirming selection")
    this.goBack()
  },

  renderRow(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  updateGames: function() {

  },

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
  score_values: {
    flexDirection: 'row'
  },
  game_title: {
    width: 120
  }
})

module.exports = RecordPage;

//
// var ScoreRow = React.createClass({
//   shouldComponentUpdate: function(nextProps, nextState) {
//     return false;
//   },
//   render: function() {
//     var {
//       key,
//       index,
//       scores,
//       kill,
//       ...props
//     } = this.props;
//
//     return (
//       <View style={[_cstyles.indented_container,]}>
//         <View style={styles.game_title}>
//           <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
//             {"Game " + String(this.props.index)}
//           </Text>
//         </View>
//
//         <View style={styles.score_values}>
//           <View style={[_cstyles.centering_wrap, ]}>
//             <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
//               {this.props.scores[0]}
//             </Text>
//           </View>
//           <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
//             {'-'}
//           </Text>
//           <View style={[_cstyles.centering_wrap, ]}>
//             <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
//               {this.props.scores[1]}
//             </Text>
//           </View>
//         </View>
//
//         <View style={[_cvals.centering_wrap, {marginRight: 20}]}>
//           <TouchableOpacity
//             style={{backgroundColor: 'transparent'}}
//             onPress={()=>this.props.kill(this.props.index)} >
//
//             <Image source={require('../assets/close.png')} style={_cstyles.close} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// });
