var React = require('react');
var ReactDOM = require('react-dom');

import './styles/menu.css'
import _cvals from './constants/customvals'
import {Link} from 'react-router';

// Header
var Menu = React.createClass({
  getInitialState: function() {
    return {
      focused: 0,
    };
  },

  render: function() {
    var self = this;
    var activeLink = {backgroundColor: '#F5A623'}
    return (
      <div id="header_container" style={wrapper}>
        <div id="logo">
          <p style={logo}>PROVASPORT</p>
        </div>
        <div id = "menu" style={menu}>
          <ul style={menuItems}>
            <Link to="/home" activeStyle={activeLink}><li>Home</li></Link>
            <Link to="/search" activeStyle={activeLink}><li>Search</li></Link>
            <Link to="/about" activeStyle={activeLink}><li>About</li></Link>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
});



// Styling
var wrapper = {
  height: 50,
  backgroundColor: _cvals.skblue,
  margin: 'auto',
  padding: 10,
  flex: 1,
  marginLeft: -70,
  marginTop: -70,
  width: 1250,
};
var logo = {
  height: 50,
  backgroundColor: _cvals.skblue,
  float: 'left',
  flex: 2,
  color: '#FFFFFF',
  font: 'Avenir',
  textAlign: 'left',
  paddingBottom: 0,
  paddingTop: 3,
  paddingLeft: 18,
  paddingRight: 8,
  fontSize: 40,
  fontWeight: 200,
  margin: 0,
};
var menu = {
  height: 50,
  backgroundColor: _cvals.skblue,
  flex: 10,
  paddingTop: 5,
  fontSize: 17.5,
  fontWeight: 'lighter',
  margin: 0,
};
var menuItems = {
  display: 'inline-block',
  margin: 0,
}
var newsfeed = {
  backgroundColor: 'red',
};

export default Menu;