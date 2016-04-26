import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Menu from './menu';
import Newsfeed from './newsfeed';
import Profile from './profile';
import Bracket from './bracket';
import RoundRobin from './roundrobin';

// Misc Parts, put here for testing purposes.
import TeamBrick from './parts/teambrick';
import MatchBrick from './parts/matchbrick';
import PlayerBrick from './parts/playerbrick';
import TeamSquare from './parts/teamsquare';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Menu}>
      <IndexRoute component={Newsfeed}/>
      <Route path="/home" component={Newsfeed}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/tournaments" component={Bracket}/>
    </Route>
  </Router>
), document.getElementById('root'))
