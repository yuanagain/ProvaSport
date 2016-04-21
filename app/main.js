import React, {Component} from 'react';
import {render} from 'react-dom';
import './menu_styles.css';
import Menu from './menu';
import Newsfeed from './newsfeed';

render(<Menu />, document.getElementById('root'));
render(<Newsfeed />, document.getElementById('root'));
