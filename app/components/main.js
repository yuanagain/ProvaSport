import React from 'react';
import ReadDOM from 'react-dom'
import Menu from './menu';
import Newsfeed from './newsfeed';
import Profile from './profile';
import Bracket from './bracket';

import './styles/menu_styles.css';

import TeamBrick from './parts/teambrick';
import MatchBrick from './parts/matchbrick';

//<Menu items = {['HOME', 'PROFILE', 'MATCHES', 'TOURNAMENTS', 'ABOUT']}/>,

//ReactDOM.render(<Menu items = {['HOME', 'PROFILE', 'MATCHES', 'TOURNAMENTS', 'ABOUT']}/>, document.getElementById('root'));

ReactDOM.render(<TeamBrick/>, document.getElementById('root'));

