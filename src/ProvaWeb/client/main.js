import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import ProfilePage from '../imports/ui/ProfilePage.jsx';
//import LoginPage from '../imports/ui/loginpage.jsx';
//import RecordPage from '../imports/ui/RecordPage.js';

Meteor.startup(() => {
  render(<ProfilePage />, document.getElementById('render-target'));
});