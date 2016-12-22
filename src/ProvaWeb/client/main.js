import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import ProfilePage from '../imports/ui/ProfilePage.jsx';
 
Meteor.startup(() => {
  render(<ProfilePage />, document.getElementById('render-target'));
});