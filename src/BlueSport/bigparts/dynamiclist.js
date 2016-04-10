'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');


var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')

import * as _ctools from '../libs/customtools.js'

/// ProvaSport specific:
var GameScoreRowAdd_subco = require('../parts/gamescorerowadd_subco')
var GameScoreRow_subco = require('../parts/gamescorerow_subco')
var GameScoreRow_fixed = require('../smallparts/gamescorerowfixed')
///

var rowWidth = windowSize.width

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ListView
} = React;

var DynamicList = React.createClass({
  getInitialState: function() {

    var rowRender = this.props.renderRow

    if (this.props.magic == 'scores' ) {
      rowRender = this.renderScore
    }

    if (this.props.magic == 'scores_fixed' ) {
      rowRender = this.renderScore
    }

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      items: this.props.items,
      renderRow: rowRender,
    };
  },

  getDefaultProps: function() {
    return {
      items: [],
      harvest: harvest_default,
      renderRow: (rowdata) => <Text>{rowdata}</Text>
    };
  },

  render: function() {
    var {
      items,
      harvest,
      renderRow,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var AddRow = (
      <View style={styles.buttons_container}>
        <GameScoreRowAdd_subco
          harvest={this.addItem} />
      </View>
    )

    if (this.props.magic == "scores_fixed") {
      AddRow = ( <View></View> )
    }
    return (
    <View style={styles.container}>

      <ListView
        dataSource={ds.cloneWithRows(_ctools.supplementIndex(this.state.items))}
        renderRow={this.renderRow}
        style={styles.listView}
      />
      {AddRow}
    </View>
    );
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({items: nextProps.items})
  },

  renderScore: function(score) {
    return (
      <GameScoreRow_subco
        val1={score[0]}
        val2={score[1]}
      />
    )
  },


  renderRow: function(rowData) {
    return (
      <RowWrapper
        key={rowData['index']}
        item={rowData['item']}
        renderRow={this.state.renderRow}
        magic={this.props.magic}
        removeItem={() => this.removeItem(rowData['index'])}
        />
    );
  },

  harvest: function() {
    this.props.harvest(iselect)
  },

  addItem: function(data) {
      this.state.items.push(data)
      this.setState( {items: this.state.items} )
  },

  removeItem: function(index) {
    this.state.items.splice(index, 1)
    this.setState( {items: this.state.items} )
  }
});

var RowWrapper = React.createClass({
  render: function() {
    var {
      index,
      renderRow,
      item,
      removeItem,
      magic,
      ...props
    } = this.props;

    if (this.props.magic == 'scores_fixed') {
      return (
        <View style={styles.row_container}>
          <View style={styles.leftmost}>
            {this.props.renderRow(this.props.item)}
          </View>

          <TouchableOpacity
                            style={[styles.rightmost, styles.center]}>
                <Image source={require('../assets/close.png')}
                       style={[_cstyles.close, {opacity: 0}]} />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.row_container}>
        <View style={styles.leftmost}>
          {this.props.renderRow(this.props.item)}
        </View>

        <TouchableOpacity onPress={this.props.removeItem}
                          style={[styles.rightmost, styles.center]}>
              <Image source={require('../assets/close.png')}
                     style={_cstyles.close} />
        </TouchableOpacity>
      </View>
    );

  },
  toggleSelect: function() {
    this.props.toggleSelect(this.props.index)
    var selected = this.props.inSelection(this.props.index)
    var new_style = {}
    if (selected) {
      new_style = this.props.selectedStyle
    }
    this.setState({selected: selected, style: new_style})
  },
});


function harvest_default(items) {
}

var styles = StyleSheet.create({
  selected_style: {
    opacity: 0.5,
    backgroundColor: _cvals.skorange
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    margin: 0,
    alignSelf: 'flex-start'
  },
  row_container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start'
  },
  listView: {
    backgroundColor: 'transparent',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftmost: {
    width: rowWidth * 8.5 / 10,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightmost: {
    width: rowWidth * 1.5 / 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

module.exports = DynamicList;
