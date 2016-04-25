var React = require('react');
var ReactDOM = require('react-dom');

import './styles/menu_styles.css'
import {Link} from 'react-router';

// Header
var Menu = React.createClass({
  getInitialState: function() {
    return {
      focused: 0,
      width: window.innerWidth,
    };
  },
  updateDimensions: function() {
    this.setState({width: $(window).width()});
  },
  componentWillMount: function() {
    this.updateDimensions();
  },
  componentDidMount: function() {
    window.addEventListener("resize", this.updateDimensions);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  clicked: function(index) {
    this.setState({
      focused: index,
    });
  },
  render: function() {
    var self = this;
    var activeLink = {backgroundColor: '#F5A623'}
    return (
      <div id="header_container" style={Object.assign({width: this.state.width}, wrapper)}>
        <div id="logo">
          <p style={logo}>PROVASPORT</p>
        </div>
        <div id = "menu" style={menu}>
          <ul>
            <Link to="/home" activeStyle={activeLink}><li>Home</li></Link>
            <Link to="/profile" activeStyle={activeLink}><li>Profile</li></Link>
            <Link to="/matches" activeStyle={activeLink}><li>Matches</li></Link>
            <Link to="/tournaments" activeStyle={activeLink}><li>Tournaments</li></Link>
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
  backgroundColor: '#4A90E2',
  margin: 'auto',
  padding: 10,
  flex: 1,
  marginLeft: -60,
  marginTop: -60,
};
var logo = {
  height: 50,
  backgroundColor: '#4A90E2',
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
};
var menu = {
  height: 50,
  backgroundColor: '#4A90E2',
  flex: 10,
  paddingTop: 5,
  fontSize: 17.5,
  fontWeight: 'lighter',
};
var newsfeed = {
  backgroundColor: 'red',
};

export default Menu;