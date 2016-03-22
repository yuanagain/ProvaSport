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
  View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

var LoginScreen = require('./screens/login')
var ProfScreen = require('./screens/profileRoot')
var RecordScreen = require('./screens/recordscreen')
var HomeScreen = require('./screens/homescreenRoot')
var ContractsScreen = require('./screens/contractsRoot')
var SettingsScreen = require('./screens/settingsRoot')



class BlueSport extends Component {


constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'contracts'
    };
  }

  render() {
    return (
      <TabNavigator selected={this.state.selectedTab}>
        <TabNavigator.Item
          tabBarStyle={{height: 0,}}
          title='Home'
          selected={this.state.selectedTab === 'home'}
          //badgeText="Home"
          onPress={() => {
            this.setState({
              selectedTab: 'home'
            });
            }
          }>
          <HomeScreen/>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="Contracts"
          selected={this.state.selectedTab === 'contracts'}
          //badgeText="Profile"
          onPress={() => {
            this.setState({
            selectedTab: 'contracts'
            });
          }
          }>
          <ContractsScreen/>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="Profile"
          selected={this.state.selectedTab === 'profile'}
          //badgeText="Profile"
          onPress={() => {
            this.setState({
            selectedTab: 'profile'
            });
          }
          }>
          <ProfScreen user={"Placeholder"}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="Settings"
          selected={this.state.selectedTab === 'settings'}
          //badgeText="Profile"
          onPress={() => {
            this.setState({
            selectedTab: 'settings'
            });
          }
          }>
          <SettingsScreen/>
        </TabNavigator.Item>
      </TabNavigator>
      )
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
  tabItem: {
    borderStyle: 'solid',  
    borderRadius: 20,
  },
});

AppRegistry.registerComponent('BlueSport', () => BlueSport);
