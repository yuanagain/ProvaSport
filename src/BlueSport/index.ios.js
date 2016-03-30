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

// Screens
var LoginPage = require('./screens/loginpage')
var ProfScreen = require('./screens/profileRoot')
var RecordPage = require('./screens/recordpage')
var RecordPageRoot = require('./screens/recordpageroot')
var HomeScreen = require('./screens/homescreenRoot')
var ContractsScreen = require('./screens/contractsRoot')
var SettingsRoot = require('./screens/settingsRoot')

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
              loginFunction={() => this.loginFunc()} />
    }

    else {
      return (
        <TabNavigator 
          selected={this.state.selectedTab}
          tabBarStyle={styles.tabBarStyle}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            renderIcon={() => <Image style={styles.icon} source={homeIcon}
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

  loginFunc() {
    console.log("GOING HOME")
    this.setState({selectedTab: 'home'})
  }
}


const styles = StyleSheet.create({

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
  selectedIcon: {
    tintColor: _cvals.skorange,
  },
});

AppRegistry.registerComponent('BlueSport', () => BlueSport);
