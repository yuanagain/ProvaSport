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
var PlayerPage = require('./screens/playerpage')
var RecordPage = require('./screens/recordpage')
var NewsFeedPage = require('./screens/newsfeedpage')
var CreationPage = require('./screens/creationpage')
var MorePage = require('./screens/morepage')
var SignUpPage = require('./screens/signuppage')

var _cvals = require('./styles/customvals.js')

class ProvaSport extends Component {

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
            selected={this.state.selectedTab === 'create'}
            renderIcon={() => <Image style={styles.icon}
              source={scheduleIcon}
            />}
            renderSelectedIcon={() => <Image source={scheduleIcon} style={styles.selectedIcon}/>}
            onPress={() => {this.onTabPress('create', this.refs.createRef)}}
            >
            <Navigator
              ref='createRef'
              initialRoute={{name: 'CreationPage', component: CreationPage}}
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
              initialRoute={{name: 'RecordPage', component: RecordPage,  }}
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
              initialRoute={{name: 'PlayerPage', component: PlayerPage, passProps: {mode: 'root'} }}
              renderScene={(route, navigator) =>    {
                if (route.component) {
                return React.createElement(route.component, {  ...route.passProps, navigator, route } );
                }
              }}
            />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'more'}
            renderIcon={() => <Image style={styles.icon}
              source={listsIcon}
            />}
            renderSelectedIcon={() => <Image source={listsIcon} style={styles.selectedIcon}/>}
            onPress={() => {this.onTabPress('more', this.refs.moreRef)}}
            >
            <Navigator
              ref='moreRef'
              initialRoute={{name: 'MorePage', component: MorePage, passProps: {logout: ()=>this.logout()} }}
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

  logout() {
    this.setState({
        selectedTab: 'login'
    });
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

AppRegistry.registerComponent('ProvaSport', () => ProvaSport);
