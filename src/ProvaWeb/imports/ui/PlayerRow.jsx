// TODO: Add onclick action to submit button, hook to back end
import React from 'react';
import {Popover, 
        Tooltip, 
        Modal, 
        Button, 
        OverlayTrigger} 
        from 'react-bootstrap';

class PlayerRow extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div className="container-fluid vertical-center">
            <img className="img-fluid center-block" alt="Responsive image" src = "/images/Logo.png"/>
            <h1 className='ProvaSport'>ProvaSport</h1>
            <h3>Visionary Statement</h3>
        </div>
      );
    }
}

module.exports = LoginPage;