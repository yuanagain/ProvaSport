'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var ScoreRow = require('../parts/scorerow')
var PayoutRow = require('../parts/payoutrow')
var _cvals = require('../styles/customvals')

var mainfont = _cvals.mainfont
var skorange = '#F5A623'
var skblue = '#4A90E2'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var MatchPage = React.createClass({
  getInitialState: function() {
    return (
      {
        username: '',
        password: '',
      }
    );
  },
  render: function() {
    var {
      name,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <View style={styles.header_container}>
        <Text style={styles.header_text}>
          Match on 9/12/2015
        </Text>
      </View>

      <View style={styles.section_container}>
        <Text style={styles.title_text}>
          Teams
        </Text>
      </View>

      <View style={[styles.columns_container, {marginVertical: -15}]}>
        <View style={styles.column_container_left}>
          <Text style={styles.value_text}>
            {"Team 1"}
          </Text>
        </View>
        <View style={styles.column_container_right}>
          <Text style={styles.value_text}>
            {"Team 2"}
          </Text>
        </View>
      </View>

      <View style={styles.columns_container}>
        <View style={styles.column_container_left}>
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>

        <View style={styles.column_container_right}>
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
      </View>

      <View style={styles.divider_line}>
      </View>
      <View style={styles.columns_container}>
        <View style={styles.column_l_l}>
          <Text style={styles.title_text}>
            Sport
          </Text>
        </View>
        <View style={styles.column_r_r}>
          <Text style={styles.value_text}>
            Tennis
          </Text>
        </View>
      </View>

      <View style={styles.divider_line}>
      </View>
      <View style={styles.section_container_left}>
        <View style={styles.section_header}>
          <Text style={styles.title_text}>
            Payout
          </Text>
        </View>
      </View>

      <PayoutRow row_name="Team 1" payouts={[2400, 140]} />
      <PayoutRow row_name="Team 2" payouts={[1400, 100]} />

      <View style={styles.divider_line}>
      </View>

      <View style={styles.section_container_right}>
        <View style={styles.section_header}>
          <Text style={styles.title_text}>
            Scores
          </Text>
        </View>
      </View>
      <ScoreRow row_name="Game 1" scores={[21, 14]} />
      <ScoreRow row_name="Game 2" scores={[15, 21]} />
      <ScoreRow row_name="Game 3" scores={[21, 12]} />

      <View style={styles.divider_line}>
      </View>
    </View>
    );
  },
});

var styles = StyleSheet.create({
  title_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    fontWeight: 'bold',
    padding: 10
  },
  header_text: {
    color: 'white',
    fontSize: 34,
    fontFamily: mainfont,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  value_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    padding: 10,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    opacity: 1.00,
    margin: 0,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: skblue,
    height: 120
  },
  section_container: {
    width: windowSize.width,
    backgroundColor: 'transparent',
    opacity: 1.0,
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 2,
    opacity: 0.3,
    width: windowSize.width
  },

  column_container_right: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  column_container_left: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  column_r_r: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  column_l_l: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,

  },
  prof_pic_image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 5
  },
  left_align: {
    flexDirection: 'row',
    flex: 0,
  },
  right_align: {
    flexDirection: 'row',
    flex: 0,
  },
  columns_container: {
    flexDirection: 'row',
    flex: 0,
    width: windowSize.width,
  },
})

module.exports = MatchPage;
