import React, { Component } from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'
import CreateMatch from './createMatch'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import matchFeed from './matchFeed'
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-bootstrap-time-picker';
import Maps from './Maps'
import ImageUpload from './ImageUpload'
import { saveMatch } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/helpers/auth.js'

export default class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      matchKey: '',
      time: 0,
      mapDataAddress: null,
      mapDataLat: null,
      mapDataLng: null,
      newProfile: {
        sports : null,
        startDate: moment(),
        formatDate: null,
        User: null
      }
    }
     this.handleChange = this.handleChange.bind(this);
     this.handleTimeChange = this.handleTimeChange.bind(this);
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

  handleChange(date){

    //console.log(formatDate)
     this.setState({startDate: date,
                    formatDate: date.format("MM/DD/YYYY")
     });
  }

  handleTimeChange(time) {
  //  console.log(time);     // <- prints "3600" if "01:00" is picked
    this.setState({ time });
  }

  myCallback = (dataFromMaps) => {
      //  [...we will use the dataFromChild here...]
    //  console.log(dataFromMaps.address)
      this.setState({mapDataAddress: dataFromMaps.address,
                     mapDataLat: dataFromMaps.lat,
                     mapDataLng: dataFromMaps.lng
      })
    }

  handleSubmit = (e) => {
    e.preventDefault()

    const matchData =  {
    sport: this.sport.value,
    gameDate: this.state.formatDate,
    skill: this.skill.value,
    matchTime: this.state.time,
    mapDataAddress: this.state.mapDataAddress,
    mapDataLat: this.state.mapDataLat,
    mapDataLng: this.state.mapDataLng
}

  firebaseAuth().onAuthStateChanged(function(user) {
if (user) {

// External function, handles upload to firebase
saveMatch(matchData, user)


} else {
// No user is signed in. Cannot perform upload.
}
});
}

  render () {

    return (
      <div>
      <div>
      <h1> Welcome!</h1>
      <h2> Please fill in your profile so we can instantly
        match you with games near you! </h2>

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
      <br />

      <ImageUpload />

      <br />
      <matchFeed  />
      <li><NavLink to="/protected/matchFeed">Match Feed</NavLink></li>
            <Route path="/protected/matchFeed" component={matchFeed}/>

      <div>

      </div>


      <Router>
      <div>
  
           </div>
           </Router>

                <h2> Create a Match: </h2>
           <form onSubmit={this.handleSubmit}>
           <label>Sport</label>
           <div className="form-group">
           <select id="sport" ref={(sport) => this.sport = sport}>
           <option disabled value>Sport</option>
           <option value="Tennis">Tennis</option>
           <option value="Badminton">Badminton</option>
           <option value="Basketball">Basketball</option>
           <option value="Soccer">Soccer</option>
           <option value="Softball">Softball</option>
           </select>

           </div>
           <label>Date</label>
           <div className="date">
           <DatePicker
           selected={this.state.startDate}
           onChange={this.handleChange}
           minDate={moment()}
           maxDate={moment().add(65, "days")}
           placeholderText="Choose a Day" />
           </div>

           <br/>
           <label> Match Start Time </label>
           <TimePicker onChange={this.handleTimeChange} value={this.state.time}
                                                    start="6:00" end="23:30"/>

           <br/>
           <Maps callbackFromParent={this.myCallback}/>

           <label>Skill Level</label>
           <div className="form-group">
           <select id="skill" ref={(skill) => this.skill = skill}>
           <option disabled value>Skill</option>
           <option value="Beginner">Beginner</option>
           <option value="Intermediate">Intermediate</option>
           <option value="Advanced">Advanced</option>
           </select>
           <br />
           <br />
           <button type="submit" className="btn btn-primary">Create</button>
           <br />
           </div>
         </form>

      </div>
    )
  }
}
