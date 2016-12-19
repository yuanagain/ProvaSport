import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import LoginPage from '../imports/ui/loginpage.jsx';
 
Meteor.startup(() => {
  render(<LoginPage />, document.getElementById('render-target'));
});