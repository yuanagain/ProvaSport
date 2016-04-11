var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')

var PlayerBrick = require('../parts/playerbrick')
var PlayerRow = require('../smallparts/playerrow')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ListView
} = React;

var defaultRenderRow = function(rowText) {
  return (
    <View>
      <View style={default_styles.rowContainer}>
        <Text style={_cstyles.section_header_text}>
          {rowText}
        </Text>
      </View>
    </View>
  )
}

var playerRenderRow = function(playerid) {
  return (
      <View>
        <PlayerRow playerid={playerid} />
      </View>
  )
}

var default_styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    margin: 5 * _cvals.dscale,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})


module.exports = {defaultRenderRow, playerRenderRow};