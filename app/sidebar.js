// Source: http://jsfiddle.net/dannymarkov/vfcfndxj/1/?utm_source=website&utm_medium=embed&utm_campaign=vfcfndxj/show
// Author: Dan Markov
// Date accessed: Sunday, April 10

import './sidebar_styles.css';

var React = require('react');
var ReactDOM = require('react-dom');

// Sidebar
var Sidebar = React.createClass({
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
    return (
      <div style={sidebar}>
        <ul> {
          this.props.items.map(function(m, index) {
            var style = '';
            if (self.state.focused == index) {
              style = 'focused';
            }
            return <li className = {
              style
            }
            onClick = {
              self.clicked.bind(self, index)
            } > {
              m
            } </li>;
          })
        }
        </ul>
      </div>
    );
  }
});

// Dummy dates
var dates = ['April 20, 2016',
             'April 18, 2016',
             'April 13, 2016',
             'April 9, 2016',
             'April 2, 2016',
             'March 31, 2016',
             'March 10, 2016',
             'February 14, 2016',
             'February 13, 2016',
             'February 11, 2016',
             'February 9, 2016',
             'January 31, 2016',
             'January 15, 2016',
             'January 14, 2016',
             'January 13, 2016',
             'January 4, 2016',
             'January 3, 2016',
             'January 2, 2016'];

// Styling
var sidebar = {
  width: 250,
  float: 'left',
  flex: 10,
  backgroundColor: '#E6E6E6',
  fontFamily: 'avenir',
  fontSize: 18,
};
ReactDOM.render(
  <Sidebar items = {dates}/>,
  document.getElementById('newsfeed_container')
);
