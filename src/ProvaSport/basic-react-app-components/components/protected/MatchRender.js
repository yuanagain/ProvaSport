import React, { Component } from 'react'
import * as firebase from "firebase"
import { ref, firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import ChatRoom from './ChatRoom'

export default class MatchRender extends Component {

  constructor(props){
    super(props)
    this.state = {
      joined: false,
      playerList: []
      }
  this.renderjoin = this.renderjoin.bind(this)
  this.handleJoin = this.handleJoin.bind(this)
  this.removeMatch = this.removeMatch.bind(this)
  }

handleJoin(){
const user = firebaseAuth().currentUser
//console.log("this.props.match.players")
//var players = this.props.match.players.map(function(value, i){
  //  return (
//console.log(this.props.match.players)
const players = this.props.match.players
//this.console.log(players)
const matchID = this.props.match.id
players.push(user.uid)
//console.log(players)

firebase.database().ref(`matches/${this.props.match.id}/`).update({ players: players })

//May need this for other info
ref.child(`users/${user.uid}/account-info/joinedGames/${this.props.match.id}`)
.set({ id: 0
})
//firebase.database().ref(`matches/${this.props.match.id}/players`).push(user.uid)
this.setState({joined: true})
}

handleMessage(){}

removeMatch(e){
       e.preventDefault();
       console.log("Remove Match")

    const players = this.props.match.players


    //can use address for advantage..
    //  make query for all children joined games with people joined,
    // run loop to delete the joined game

    for (var i =0; i < players.length; i++){
      console.log(players[i])
    ref.child(`users/${players[i]}/account-info/joinedGames/${this.props.match.id}`).remove()
}
  // delete the match from firebase
   ref.child(`matches/${this.props.match.id}/`).remove()

   }

renderjoin(e){
  e.preventDefault()

  return <div>  </div>
}

  render(){
  //  console.log("props test")
  //  console.log(this.props.match.id)
    const user = firebaseAuth().currentUser.uid
    let button = null

    if( this.props.match.creator === user) {
      button = <div> Your match </div>
    }
     else if (this.props.match.players.includes(user)) {
      button = <div> You Joined the match </div>
    } else if(this.props.match.creator !== user){
      button = <button onClick={this.handleJoin} className="btn btn-primary">Join Match</button>
    }
    // else{
    //   button = <button />
    // }

    let matchRemark = null

    if (this.props.match.creator === user.uid){
      matchRemark = ' Your Match '
    }
    else if (this.state.joined){
      matchRemark = ' You Joined this Match! '
    }

    return(
      <div className="col-sm-12">
        <div className="panel panel-white post panel-shadow">
          <div className="post-heading">
            <div className="pull-left image">
              <img className="img-circle avatar" src="http://placehold.it/48x48" alt=""/>
            </div>
            <div className="pull-right "><button onClick={this.removeMatch} className="fa fa-remove">Cancel Match</button></div>
            <div className="pull-left meta">
              <div className="title h5">
               <h4>  <strong> {this.props.match.creatorName} </strong> made a Match </h4>
               <br/>
               {matchRemark}
              </div>
              <h6 className="text-muted time">An hour ago</h6>
              </div>
            </div>
          </div>
          <div className="col-md-12 post-description">
          <br/>
            <h3>  {this.props.match.sport} </h3>
            <br/>
            <h3> Level: {this.props.match.skill} </h3>
            <br/>
            <h3> Date: {this.props.match.date} </h3>
            <br/>
            <h3> Players: {this.props.match.players.length} </h3>
            <br/>
            </div>
            {button}
            <div className="actions">

              <a href="#" className="btn btn-default stat-item"></a>

              <a onClick={this.renderjoin}  href="#" className="btn btn-default stat-item">
                               <i className="fa fa-thumbs-up icon"></i>
                           </a>
        </div>
        <ChatRoom matchkey={this.props.match.id}/>
      </div>



    )

  }
}
