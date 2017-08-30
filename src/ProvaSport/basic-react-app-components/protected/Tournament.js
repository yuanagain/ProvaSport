import React, { Component } from 'react'
import Maps from './Maps'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'

export default class Tournament extends Component{

  constructor(props){
  super(props)

  this.state = {
  sport: "",                 // Sport of tournament
	date: "",                 // tournament dates
  address: "",           // exact location
	size: "",                  // Number of competitors [4, 8, 12, 16, 32, 64], different for round robin
 	elimination: "",                   // client selects single, double,  round robin, potentially custom
	matchupStyle: "",              // client selects seeded, blind draw
	inviteOnly: false,               //  whether to invite competitors of sport or open for anyone
	invitedPlayers: "",             // Array of all invited players
	championPrize: "",            // Digital and/or real prize for champion
	//confirmedPlayers: []         // array of confirmed players, by userID
	//declinedPlayers: []           // array of players that declined to participate
	teams:  [],                         // array of arrays? Or dynamically create entries in teams object
  // set later
	//tournamentAdmin: user.uid      // Admin of tourney, default the creator
  sports: ""     //for checbox group
  }

  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.sportsChanged = this.sportsChanged.bind(this)
}


handleSubmit(e){
  e.preventDefault()
}

handleChange(e){
  e.preventDefault()
}

sportsChanged(newSports) {
  this.setState({
    sports: newSports
  });
}

onSubmit(e){
  e.preventDefault()
}

render(){
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

//  const chk = {
//     display: 'table-row',
//     width: '100%',
// }

  const matchLabel = {
  //  marginRight: "40px"
  //  color: 'blue',
  //  backgroundImage: 'url(' + imgUrl + ')',
  };

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
  };


  return(

    <div style={divStyle}>

    <h2 style={headerStyle2}> Create a Tournament! </h2>

    <form onSubmit={this.handleSubmit}>
    <label style={matchLabel}>1. Sport</label>
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
    <label style={matchLabel}>2. Date</label>
    <div className="date">
    <DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}
    minDate={moment()}
    maxDate={moment().add(65, "days")}
    placeholderText="Choose a Day" />
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
    <button type="submit" className="btn btn-primary">Confirm Tournament</button>

  </form>
 </div>

  )
}


}
