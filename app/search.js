var React = require('react');
var ReactDOM = require('react-dom');
var PlayerRow = require('./parts/playerrow');
// Bootstrap components
var Form = require('react-bootstrap/lib/Form');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');

var PlayerRow = require('./parts/playerrow');

import './styles/menu.css'
import _cvals from './constants/customvals'

import * as Player from './modules/player';


var Search = React.createClass({
  getInitialState: function() {
    return {
      players: [],
      searching: false,
      query: "",
    };
  },

  render:function() {
    return (
      <div style={styles.body}>
        <p style={styles.title}> Search Players</p>
        <Form inline>
          <FormControl
                    type="text"
                    style={styles.input}
                    onChange={this.handleChange}
                    placeholder="Player Name"
          />
          <Button style={styles.submitButton} onClick={this.search}>
            Search
          </Button>
        </Form>
        <hr style={styles.hline}/>
        <div>
          <p style={styles.title}> Results </p>
          {this.state.players.map(function(playerid, i) {
            console.log(playerid)
            return (
              <PlayerRow playerid={playerid} key={i}/>
            )
          })}
        </div>
      </div>
    );
  },
  handleChange(e) {
    this.setState({ query: e.target.value });
    this.setState({players:[]})
  },

  search: function() {
    // don't initiate two searches
    if (this.state.searching == true) {
      return
    }
    // don't search empty input
    if (this.state.query.length == 0) {
      return
    }
    this.setState({searching: true})
    Player.searchPlayers(this.state.query, this.update)
  },

  update: function(players) {
    this.setState({players: []})
    this.setState({players: players})
    this.setState({searching: false})
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
    marginRight: 15,
  },
}

export default Search;