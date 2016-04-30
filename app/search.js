var React = require('react');
var ReactDOM = require('react-dom');
var PlayerRow = require('./parts/playerrow');
// Bootstrap components
var Form = require('react-bootstrap/lib/Form');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');

import './styles/menu.css'
import _cvals from './constants/customvals'


var SearchBox = React.createClass({
  getInitialState: function() {
    return {
      query: "",
    };
  },

  render:function() {
      return (
        <div style={styles.body}>
          <p style={styles.title}> Search Players, Teams </p>
          <Form inline>
            <FormControl
                    type="text"
                    style={styles.input}
                    value={this.state.query}
                    placeholder="Player, Team Name"
                    onChange={this.search}
            />
            <Button type="submit" style={styles.submitButton} onClick={this.search}>
              Search
            </Button>
          </Form>
          <hr style={styles.hline}/>
        </div>
      );
    }
});

var SearchResults = React.createClass({
  getInitialState: function() {
    return {

    };
  },

  render:function() {
      return (
        <div style={styles.body}>
          <p style={styles.title}> Results </p>
          <PlayerRow/>
        </div>
      );
    }
});

var Search = React.createClass({
  getInitialState: function() {
    return {

    };
  },

  render:function() {
      return (
        <div style={styles.body}>
          <SearchBox/>
          <SearchResults/>
        </div>
      );
    }
});

var styles = {
  title: {
    fontSize: 36,
    font: _cvals.mainfont,
    marginTop: 30,
    marginBottom: 20,
  },
  body: {
    margin: 20,
  },
  input: {
    display: 'block-inline',
    height: 40,
    width: 200,
    padding: 5,
    borderRadius: 4,
    paddingRight: 10,
    fontSize: 18,
    fontFamily: _cvals.mainfont,
  },
  submitButton: {
    height: 40,
    width: 100,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: _cvals.skorange,
    marginLeft: 20,
    fontFamily: _cvals.mainfont,
    fontSize: 18,
  },
  hline: {
    marginTop: 40,
  }
}

export default Search;