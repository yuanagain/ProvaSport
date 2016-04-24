import React from 'react';
import ReadDOM from 'react-dom'
import Menu from './menu';
import Newsfeed from './newsfeed';
import Profile from './profile';
import Bracket from './bracket';
import RoundRobin from './roundrobin';

import TeamBrick from './parts/teambrick';
import MatchBrick from './parts/matchbrick';
import PlayerBrick from './parts/playerbrick';
import TeamSquare from './parts/teamsquare';

ReactDOM.render(<Menu items = {['HOME', 'PROFILE', 'MATCHES', 'TOURNAMENTS', 'ABOUT']}/>, document.getElementById('root'));
//ReactDOM.render(</>, document.getElementById('root'));

