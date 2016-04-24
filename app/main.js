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

var data = [
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'James Smith', loser: 'Jen Johnson', result: 'beat', sport: 'tennis', date: 'April 20, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Johnny Jones', loser: 'Jackie Anderson', result: 'lost to', sport: 'squash',  date: 'April 18, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Josh Watson', loser: 'Jill Jameson', result: 'tied', sport: 'soccer', date: 'April 16, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
  {winner: 'Jessie Wang', loser: 'Joe Arnolds', result: 'beat', sport: 'tennis', date: 'April 10, 2016', score_a: '5 4 3 2 1', score_b: '1 2 3 4 5', pic_a: 'http://facebook.github.io/react/img/logo_og.png', pic_b: 'http://facebook.github.io/react/img/logo_og.png'},
];

//ReactDOM.render(<Menu items = {['HOME', 'PROFILE', 'MATCHES', 'TOURNAMENTS', 'ABOUT']}/>, document.getElementById('root'));
ReactDOM.render(<Newsfeed data={data}/>, document.getElementById('root'));

