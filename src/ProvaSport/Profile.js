import React, { Component } from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
//import { Route, IndexRoute } from 'react-router';

class Profile extends Component {


  constructor(){
    super();
    this.state = {
      newProfile: {
        sports : null,
        age: null
      }
    }
  }

  sportsChanged(newSports) {
    this.setState({
      sports: newSports
    });
  }

  onChange(value) {
    this.setState({
      age: value
    });
    }

render() {
   console.log(this.state.sports);
     console.log(this.state.age);
    return (

      <div>
      <RadioGroup onChange={ this.onChange.bind(this) } horizontal>
              <RadioButton value="18-22">
                18-22
              </RadioButton>
              <RadioButton value="23-27">
                23-27
              </RadioButton>
              <RadioButton value="28-32">
                28-32
              </RadioButton>
              <RadioButton value="33-37">
                33-37
              </RadioButton>
              <RadioButton value="38-42">
                38-42
              </RadioButton>
            </RadioGroup>

            <CheckboxGroup
               name="favoriteSports"
               value={this.state.sports}
               onChange={this.sportsChanged.bind(this)}>
                   <label><Checkbox value="tennis"/> Tennis</label>
                   <label><Checkbox value="badminton"/> Badminton</label>
                   <label><Checkbox value="basketball"/> Basketball</label>
                   <label><Checkbox value="soccer"/> Soccer</label>
                   <label><Checkbox value="softball"/> Softball</label>
                 </CheckboxGroup>
                 <input type="submit" value="Update Profile" />
                 </div>
    );

  }
}

export default Profile;
