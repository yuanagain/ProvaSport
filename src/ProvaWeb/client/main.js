import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import LoginPage from '../imports/ui/loginpage.jsx';
import RecordPage from '../imports/ui/RecordPage.jsx';

Meteor.startup(() => {
  render(<RecordPage />, document.getElementById('render-target'));
});