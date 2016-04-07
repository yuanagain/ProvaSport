'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

// Tab Bar Icons
var homeIcon = require('./assets/home.png')
var scheduleIcon = require('./assets/schedule.png')
var clusterIcon = require('./assets/cluster.png')
var profileIcon = require('./assets/profile.png')
var listsIcon = require('./assets/lists.png')

// Screens and View Navigation Routes
var LoginPage = require('./screens/loginpage')
var ProfilePage = require('./screens/profilepage')
var RecordPage = require('./screens/recordpage')
var NewsFeedPage = require('./screens/newsfeedpage')
var ContractsScreen = require('./screens/contractspage')
var SettingsPage = require('./screens/settingspage')
var SignUpPage = require('./screens/signup')

var _cvals = require('./styles/customvals.js')

class BlueSport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'login'
    };
  }

  render() {
    if (this.state.selectedTab == 'login') {
      return (
        <Navigator
          style={styles.wrapper}
          initialRoute={{name: 'LoginPage', component: LoginPage, passProps:{navToHomeFunc: this.navToHomeFunc.bind(this)}}}
          renderScene={(route, navigator) =>    {
            if (route.component) {
              return React.createElement(route.component, {...route.passProps, navigator, route } );
            }
          }}
        />
      )
    }

    else {
      return (
        <TabNavigator
          selected={this.state.selectedTab}
          tabBarStyle={styles.tabBarStyle}>
          <TabNavigator.Item
            //title="Home"
            selected={this.state.selectedTab === 'home'}
            renderIcon={() => <Image style={styles.icon}
              source={homeIcon}
            />}
            renderSelectedIcon={() => <Image source={homeIcon} style={styles.selectedIcon}/>}
            onPress={() => {this.onTabPress('home', this.refs.homeRef)}}
            >
            <Navigator
              ref='homeRef'
              initialRoute={{name: 'NewsFeedPage', component: NewsFeedPage}}
              renderScene={(route, navigator) => {
                if (route.component) {
                  return React.createElement(route.component, {...route.passProps, navigator, route});
                }
              }}
            />
          </TabNavigator.Item>
          <TabNavigator.Item
            //title="Contracts"
            selected={this.state.selectedTab === 'contracts'}
            renderIcon={() => <Image style={styles.icon}
              source={scheduleIcon}
            />}
            renderSelectedIcon={() => <Image source={scheduleIcon} style={styles.selectedIcon}/>}
            onPress={() => {this.onTabPress('contracts', this.refs.contractsRef)}}
            >
            <Navigator
              ref='contractsRef'
              initialRoute={{name: 'ContractsScreen', component: ContractsScreen}}
              renderScene={(route, navigator) =>    {
                if (route.component) {
                  return React.createElement(route.component, { ...this.props, ...route.passProps, navigator, route } );
                }
              }}
            />
          </TabNavigator.Item>

          <TabNavigator.Item
            //title="Record"
            selected={this.state.selectedTab === 'record'}
            renderIcon={() => <Image style={styles.icon}
              source={clusterIcon}
            />}
            renderSelectedIcon={() => <Image source={clusterIcon} style={styles.selectedIcon}/>}
            onPress={() => {this.onTabPress('record', this.refs.recordRef)}}
            >
            <Navigator
              ref='recordRef'
              initialRoute={{name: 'RecordPage', component: RecordPage}}
              renderScene={(route, navigator) =>    {
                if (route.component) {
                return React.createElement(route.component, {  ...route.passProps, navigator, route } );
                }
              }}
            />
          </TabNavigator.Item>

          <TabNavigator.Item
            //title="Profile"
            selected={this.state.selectedTab === 'profile'}
            renderIcon={() => <Image style={styles.icon}
              source={profileIcon}
            />}
            renderSelectedIcon={() => <Image source={profileIcon} style={styles.selectedIcon}/>}
            onPress={() => {this.onTabPress('profile', this.refs.profRef)}}
            >
            <Navigator
              ref='profRef'
              initialRoute={{name: 'ProfilePage', component: ProfilePage}}
              renderScene={(route, navigator) =>    {
                if (route.component) {
                return React.createElement(route.component, {  ...route.passProps, navigator, route } );
                }
              }}
            />
          </TabNavigator.Item>

          <TabNavigator.Item
            //title="Settings"
            selected={this.state.selectedTab === 'settings'}
            renderIcon={() => <Image style={styles.icon}
              source={listsIcon}
            />}
            renderSelectedIcon={() => <Image source={listsIcon} style={styles.selectedIcon}/>}
            onPress={() => {this.onTabPress('settings', this.refs.settingsRef)}}
            >
            <Navigator
              ref='settingsRef'
              initialRoute={{name: 'SettingsScreen', component: SettingsPage}}
              renderScene={(route, navigator) =>    {
                if (route.component) {
                return React.createElement(route.component, {  ...route.passProps, navigator, route } );
                }
              }}
            />
          </TabNavigator.Item>
        </TabNavigator>
      )
    }
  }

  onTabPress(tab, navRef) {
    if (this.state.selectedTab !== tab) {
      this.setState({
        selectedTab: tab
      });
    } else if (this.state.selectedTab === tab) {
      navRef.popToTop();
    }
  }

  navToHomeFunc() {
    this.setState({selectedTab: 'home'})
  }

  signUpFunc() {
    this.setState({selectedTab: 'signUp'})
  }

}

const styles = StyleSheet.create({
  icon: {
    height: 27,
    width: 27,
  },
  selectedIcon: {
    height: 27,
    width: 27,
    tintColor: _cvals.skorange,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabBarStyle: {
    backgroundColor: _cvals.skblue,
  },
});

AppRegistry.registerComponent('BlueSport', () => BlueSport);
