/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  View
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
var ProfScreen = require('./navroots/profileroot')
var RecordPageRoot = require('./navroots/recordpageroot')
var HomeScreen = require('./navroots/homescreenroot')
var ContractsScreen = require('./navroots/contractsroot')
var SettingsRoot = require('./navroots/settingsroot')
var SignUpPageRoot = require('./navroots/signuproot')

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
      return <LoginPage 
                navToHomeFunc={() => this.navToHomeFunc()} 
                signUpFunction={() => this.signUpFunc()} />
    }

    if (this.state.selectedTab == 'signUp') {
      return <SignUpPageRoot navToHomeFunc={() => this.navToHomeFunc()} />
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
            onPress={() => {
              this.setState({
                selectedTab: 'home'
              });
              }
            }>
            <HomeScreen/>
          </TabNavigator.Item>
          <TabNavigator.Item
            //title="Contracts"
            selected={this.state.selectedTab === 'contracts'}
            renderIcon={() => <Image style={styles.icon}
              source={scheduleIcon}
            />}
            renderSelectedIcon={() => <Image source={scheduleIcon} style={styles.selectedIcon}/>}
            onPress={() => {
              this.setState({
              selectedTab: 'contracts'
              });
            }
            }>
            <ContractsScreen/>
          </TabNavigator.Item>
          <TabNavigator.Item
            //title="Record"
            selected={this.state.selectedTab === 'record'}
            renderIcon={() => <Image style={styles.icon}
              source={clusterIcon}
            />}
            renderSelectedIcon={() => <Image source={clusterIcon} style={styles.selectedIcon}/>}
            onPress={() => {
              this.setState({
              selectedTab: 'record'
              });
            }
            }>
            <RecordPageRoot />
          </TabNavigator.Item>
          <TabNavigator.Item
            //title="Profile"
            selected={this.state.selectedTab === 'profile'}
            renderIcon={() => <Image style={styles.icon}
              source={profileIcon}
            />}
            renderSelectedIcon={() => <Image source={profileIcon} style={styles.selectedIcon}/>}
            onPress={() => {
              this.setState({
              selectedTab: 'profile'
              });
            }
            }>
            <ProfScreen user={"Placeholder"}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            //title="Settings"
            selected={this.state.selectedTab === 'settings'}
            renderIcon={() => <Image style={styles.icon}
              source={listsIcon}
            />}
            renderSelectedIcon={() => <Image source={listsIcon} style={styles.selectedIcon}/>}
            onPress={() => {
              this.setState({
              selectedTab: 'settings'
              });
            }
            }>
            <SettingsRoot />
          </TabNavigator.Item>
        </TabNavigator>
        )
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
  iconTitle: {
    tintColor: _cvals.skorange,
  },
  wrapper: {
    flex: 1,
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
