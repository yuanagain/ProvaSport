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
import Tournament from './Tournament'

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

    const divStyle = {
      display: 'block',
      textAlign: 'center',
      background: "#eee",
      padding: "5px",
      margin: "5px",
      //width: "550px",
      //justifyContent: 'center'
      //alignItems: 'flex',
      //justifyContent: 'flex',
      //alignSelf: 'flex',
    //  color: 'blue',
    //  backgroundImage: 'url(' + imgUrl + ')',
    };

    const divCheckbox = {
      textAlign: 'center',
      display: 'table',
      //justifyContent: 'center',
    //  float: 'left',
      display: 'inlineBlock',
    //  marginRight: '155px'
      //margin: '0 auto'
    }

    const checkboxLabel =  {
      //display: 'table-row'
      display: 'inlineBlock'
  }

  //  const inputLen = {
  //     display: 'table-row',
  //     width: '100%',
  // }

    const matchLabel = {
    //  marginRight: "40px"
    //  color: 'blue',
    //  backgroundImage: 'url(' + imgUrl + ')',
    };

    const stdInput = {
    width: '200px',
  //  display: 'inlineBlock',
    //textAlign: 'center',
    //border: '1px'
    //solid #000
    padding: '5px'
  }

    const headerStyle2 = {
      color: 'white',
      background: "SteelBlue",
      textAlign: 'center',
      padding: "13px",
      margin: "5px",
      width: "5256x"
    };

    const checkbox = {
  //    padding: "100px",
      margin: "5px",
  //  display: 'table-row',
  display: 'inlineBlock',
    width: '100%',
//    width: '200px'
    };


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


           <div style={divStyle}>

           <h2 style={headerStyle2}> Create a Match! </h2>

           <form onSubmit={this.handleSubmit}>
           <label style={matchLabel}>1. Sport</label>
           <div className="form-group">
           <select style={stdInput} id="sport" ref={(sport) => this.sport = sport}>
           <option disabled value>Sport</option>
           <option value="Tennis">Tennis</option>
           <option value="Badminton">Badminton</option>
           <option value="Basketball">Basketball</option>
           <option value="Soccer">Soccer</option>
           <option value="Softball">Softball</option>
           </select>

           </div>

           <div style={divCheckbox} >
           <label style={checkboxLabel}>2. Date</label>
           <DatePicker
           style={stdInput}
           selected={this.state.startDate}
           onChange={this.handleChange}
           minDate={moment()}
           maxDate={moment().add(65, "days")}
           placeholderText="  Choose a Day..." />
<br/>
           <label style={checkboxLabel}>3. Match Start Time </label>
           <TimePicker  onChange={this.handleTimeChange}
           value={this.state.time}
           start="6:00" end="23:30"/>
           </div>

           <br/>
           <Maps callbackFromParent={this.myCallback}/>
           <br/>

           <label style={matchLabel}> 4. Preferred Opponent Skill Level</label>

           <CheckboxGroup
              name="preferred opponent skill level"
              value={this.state.sports}
              onChange={this.sportsChanged.bind(this)}>
                 <div style={divCheckbox}>
                  <label style={checkboxLabel}><Checkbox style={checkbox} value="Beginner"/> Beginner</label>
                  <label style={checkboxLabel}><Checkbox style={checkbox} value="Intermediate"/> Intermediate</label>
                  <label style={checkboxLabel}><Checkbox style={checkbox} value="Advanced"/> Advanced</label>
                     </div>
                </CheckboxGroup>
                <br/>
           <button type="submit" className="btn btn-primary">Create Match</button>


         </form>
</div>
         <Tournament />
</div>


    )
  }
}
