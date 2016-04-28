import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Menu from './menu';
import Newsfeed from './newsfeed';
import Profile from './profile';
import Bracket from './bracket';
import RoundRobin from './roundrobin';
import About from './about';
import Matches from './matches';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Menu}>
      <IndexRoute component={Newsfeed}/>
      <Route path="/home" component={Newsfeed}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/matches" component={Matches}/>
      <Route path="/tournamentsBrack" component={Bracket}/>
      <Route path="/tournamentsRR" component={RoundRobin}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('root'))
