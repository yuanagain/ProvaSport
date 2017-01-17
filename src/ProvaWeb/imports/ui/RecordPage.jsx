// TODO: Add onclick action to submit button, hook to back end
import React from 'react';
import {Jumbotron, 
        ControlLabel, 
        HelpBlock, 
        FormGroup, 
        FormControl, 
        DropdownButton, 
        SplitButton, 
        MenuItem, 
        Popover, 
        Tooltip, 
        Modal, 
        Button, 
        OverlayTrigger} 
        from 'react-bootstrap';

const RecordPage = React.createClass({
    getInitialState() {
      return ({
        sport: "Soccer",
        showModal: false,
        team: "None",
        event: "Auto",
        teamsearch: ""
      })
    },

    close() {
    this.setState({ showModal: false });
    },

    open() {
      this.setState({ showModal: true });
    },

    getValidationState() {
      const length = this.state.teamsearch.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
    },

    handleChange(e) {
      this.setState({ teamsearch: e.target.value });
    },

    render() {

      const popover = (
        <Popover id="modal-popover" title="popover">
          Player Data
        </Popover>
      );

      const tooltip = (
        <Tooltip id="modal-tooltip">
          Player Level
        </Tooltip>
      );

      return (
        
        <div className="container-fluid">
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <p><Button bsStyle="primary">Learn more</Button></p>
          </Jumbotron>
          <div className='col-xs-12'>

            <h1 className='ProvaSport'>ProvaSport</h1>
            <h3>Visionary Statement</h3>

            <DropdownButton title={this.state.sport} pullRight={true} id="bg-justified-dropdown"
                            onSelect={(eventKey) => this.setState({sport: eventKey})}>
              <MenuItem eventKey="Soccer">Soccer</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="Baseball">Baseball</MenuItem>
              <MenuItem eventKey="Tennis">Tennis</MenuItem>
              <MenuItem eventKey="Badminton">Badminton</MenuItem>
            </DropdownButton>

            <DropdownButton title={this.state.event} pullRight={true} id="bg-justified-dropdown"
                            onSelect={(eventKey) => this.setState({event: eventKey})}>
              <MenuItem eventKey="Singles">Singles</MenuItem>
              <MenuItem eventKey="Doubles">Doubles</MenuItem>
              <MenuItem eventKey="3 v. 3">3 v 3</MenuItem>
              <MenuItem eventKey="4 v. 4">4 v 4</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="Freeform">Freeform</MenuItem>
            </DropdownButton>

            <DropdownButton title={this.state.team} pullRight={true} id="bg-justified-dropdown"
                            onSelect={(eventKey) => this.setState({team: eventKey})}>
              <MenuItem eventKey="Princeton">Princeton</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="Harvard">Harvard</MenuItem>
              <MenuItem eventKey="Yale">Yale</MenuItem>
              <MenuItem eventKey="Stanford">Stanford</MenuItem>
            </DropdownButton>

            <button className="btn btn-default" type="submit">Sign In</button><br/><br/>
          </div>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}
          >
            Launch demo modal
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Team Selection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Team 1</h4>

              <form>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationState()}
                >
                  <ControlLabel>Working example with validation</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.teamsearch}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>
              </form>


              <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

              <h4>Tooltips in a modal</h4>
              <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

              <hr />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
})

module.exports = RecordPage;