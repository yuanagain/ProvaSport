// TODO: Add onclick action to submit button, hook to back end
import React from 'react';
import DropdownButton from 'react-bootstrap';

class RecordPage extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div className="container-fluid vertical-center">
          <div className='col-xs-12'>

            <h1 className='ProvaSport'>ProvaSport</h1>
            <h3>Visionary Statement</h3>
            <DropdownButton bsSize="large" title="Large button" id="dropdown-size-large">
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
            <form>
              
              <input type="password" className="form-control" placeholder="Password" name="password"/>
            </form>
            <button className="btn btn-default" type="submit">Sign In</button><br/><br/>
          </div>
        </div>
      );
    }
}

module.exports = RecordPage;