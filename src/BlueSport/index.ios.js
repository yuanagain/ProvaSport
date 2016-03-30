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

var LoginPage = require('./screens/loginpage')

var ProfScreen = require('./navroots/profileroot')
var RecordPageRoot = require('./navroots/recordpageroot')
var HomeScreen = require('./navroots/homescreenroot')
var ContractsScreen = require('./navroots/contractsroot')
var SettingsRoot = require('./navroots/settingsroot')

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
        <TabNavigator selected={this.state.selectedTab}>
          <TabNavigator.Item
            tabBarStyle={{height: 0,}}
            title='Home'
            selected={this.state.selectedTab === 'home'}
            //badgeText="Home"
            renderIcon={() => <Image style={styles.icon}
              source={require('./assets/home_blue.png')}
            />}
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
            renderIcon={() => <Image style={styles.icon}
              source={require('./assets/timer_blue.png')}
            />}
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
            title="Record"
            selected={this.state.selectedTab === 'record'}
            //badgeText="Profile"
            renderIcon={() => <Image style={styles.icon}
              source={require('./assets/cluster_blue.png')}
            />}
            onPress={() => {
              this.setState({
              selectedTab: 'record'
              });
            }
            }>
            <RecordPageRoot />
          </TabNavigator.Item>
          <TabNavigator.Item
            title="Profile"
            selected={this.state.selectedTab === 'profile'}
            //badgeText="Profile"
            renderIcon={() => <Image style={styles.icon}
              source={require('./assets/profile_blue.png')}
            />}
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
            renderIcon={() => <Image style={styles.icon}
              source={require('./assets/lists_blue.png')}
            />}
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
  tabbar: {
    color: _cvals.skblue
  },
  icon: {
    height: 20,
    width: 20,
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
  tabItem: {
    borderStyle: 'solid',
    borderRadius: 20,
  },
});

AppRegistry.registerComponent('BlueSport', () => BlueSport);
