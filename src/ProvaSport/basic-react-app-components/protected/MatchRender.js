import React, { Component } from 'react'
import { firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import ChatRoom from './ChatRoom'
import { removeMatchBackend, joinMatch } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/helpers/auth.js'

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
const players = this.props.match.players
const matchID = this.props.match.id
// Writes data to backend
joinMatch(user, players, matchID)
this.setState({joined: true})
}

handleMessage(){}

removeMatch(e){
       e.preventDefault();
       console.log("Removing Match")
    const players = this.props.match.players
    // Call to firebase
    removeMatchBackend(players)
   }

renderjoin(e){
  e.preventDefault()
  return <div> No function yet </div>
}

  render(){
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
