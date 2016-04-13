'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
import * as _ctools from '../libs/customtools.js'

var MyProfilePage = React.createClass({

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
      loginFunction,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View>
        <Header title={"PROFILE"}
                navigator={this.props.navigator} />
      </View>
      <ScrollView styles={[styles.scroll, {height: windowSize.width}]}
                  contentContainerStyle={styles.content} >
        <Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
               style={styles.pic} />

       <SimpleRow
         title={'Name'}
         value={'Player Name'}/>

       <View style={_cstyles.section_divider_line}></View>

       <SimpleRow
         title={'Nationality'}
         value={'USA'}/>

       <View style={_cstyles.section_divider_line}></View>

       <SimpleRow
         title={'Level'}
         value={'23'}/>

       <View style={_cstyles.section_divider_line}></View>

        <PayoutSection
          title={'Earnings'}
          earnings={{'cash': 13000, 'xp': 13000}}
        />

        <PayoutSection
          title={'\tTennis'}
          mode={'plus'}
          earnings={{'cash': 1000, 'xp': 1000}}
        />

        <PayoutSection
          title={'\tSoccer'}
          mode={'plus'}
          earnings={{'cash': 12000, 'xp': 12000}}
        />

        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow
          title={'Sports'}
          value={'Tennis, Soccer, Lacrosse'}/>

        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow
          title={'Location'}
          value={'Princeton, NJ'}/>

        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow
          title={'Teams'}
          value={'None'}/>

        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow title={"Recent Matches"} value={"4"} />

        <View style={styles.matches}>
          <MatchList
            navigator={this.props.navigator}
          />
        </View>

        <View style={_cstyles.section_divider_line} ></View>
        <View style={{height: 50 * _cvals.dscale, width: windowSize.width}}>
        </View>

      </ScrollView>

      <View style={_cstyles.buttons_container}>
      </View>
    </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
  },
  pic: {
    width: windowSize.width,
    height: windowSize.width,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'grey',
    // width: windowSize.width,
    height: 300,
  },
  contentContainerStyle: {
    flex: 1,
  },
  matches: {
    height: 200 * _cvals.dscale
  }
})


module.exports = MyProfilePage;
