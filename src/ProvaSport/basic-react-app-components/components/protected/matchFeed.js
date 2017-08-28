import React, { Component } from 'react'
import * as firebase from "firebase"
import { firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import MatchRender from './MatchRender'
//import ChatRoom from './ChatRoom'

export default class matchFeed extends Component {

  constructor(props){
    super(props)
    this.state = {
        allMatches: [],
        User: ''
    }
  }

componentDidMount(){

  console.log('Did Mount')
  const user = firebaseAuth().currentUser

  this.setState({User: user})

  //console.log(this.state.User.uid)
  firebase.database().ref(`matches/`).on('value', (snapshot)=> {

  //  var matchesInfo = []
    var matches = snapshot.val()
    //console.log('allmatches')
    //console.log(matches)

    var keys = []
    var keys = Object.keys(matches)
        console.log(keys)

        for (var i =0; i < keys.length; i++) {
          //var id = matches[k].key
          //console.log(id)
          var k = keys[i];
        //  var match = matches[k];
          var skill = matches[k].skill;
          var sport = matches[k].sport;
          var date = matches[k].gameDate;
          var creator_query = matches[k].creator;
          var players = matches[k].players;
          var creator_first_name = matches[k].creator_first_name;
          var creator_last_name = matches[k].creator_last_name;

    //console.log(skill)
    //console.log(sport)
  //  console.log(date)
  console.log('players')
    console.log(players)

    var nextMatch = {
      id: k,
      skill: skill,
      sport: sport,
      date:  date,
      players: players,
      creator: creator_query,
      creatorName: creator_first_name + " " + creator_last_name
    }
    //console.log('nextMatch')
    //console.log(nextMatch)

    var allMatches = this.state.allMatches.slice()
    //console.log('allMathces')
    //console.log(this.state.allMatches)
    //console.log('runMathces')
    //console.log(allMatches)

    allMatches.push(nextMatch)
    //console.log(allMatches)
    this.setState({ allMatches: allMatches})
    //console.log('pushed and set')
    //console.log(this.state.allMatches)

}

})
}

  render(){
  //  console.log('This.state.User')
  //  console.log(this.state.User)
  //  console.log('this.state.allMatches')
  //  console.log(this.state.allMatches)

    // const posts = this.state.allMatches.map(function(record){
    //   return <MatchRender key={record.id} match={record} />

      const posts = this.state.allMatches.map((match, i) => {
        console.log(match.players)
        return <MatchRender key={match.id} match={match} />
      // return (
      //   <li key={match.id}>{match.skill}
      //   {match.sport}
      //   {match.date}
      //   </li>
      // )


    //  var messages = this.
   })
//  console.log('testpost')
//  var testpost = this.state.allMatches
  //console.log('testpost')
//  console.log(testpost)
  //  console.log(posts)


    return(

       <div>  Local Matches

       { posts }

          </div>

)
}
}
