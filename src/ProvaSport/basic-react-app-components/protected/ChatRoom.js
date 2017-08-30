import React, { Component } from 'react'
import * as firebase from "firebase"
import { displayMessages, submitMessagesBackend } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/helpers/auth.js'

export default class ChatRoom extends Component {

  constructor(props, context){
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
        message: '',
        messages: []
    }
  }

  componentDidMount(){
    const matchKey = this.props.matchkey
  //  const blank = []
     firebase.database().ref(`messages/${this.props.matchkey}/`).on('value', (snapshot)=> {
    //
    // //const currentMessages = snapshot.val()
    const currentMessages = snapshot.val()
  //  blank.push(currentMessages)

  // need to put finishing touches on this
  //  const currentMessages = displayMessages(matchKey)
  //  console.log(currentMessages)

      if (currentMessages != null){
        this.setState({
          messages: currentMessages
        })
      }
   })
  }

  updateMessage(event){
  //  console.log('updateMessage')
    this.setState({
      message: event.target.value
    })
  }

  submitMessage(event){
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    }
    submitMessagesBackend(nextMessage, this.props.matchkey)
  }

  render(){

    const currentMessage = this.state.messages.map((message, i) => {

    return (
      <li key={message.id}>{message.text}</li>
    )
    })

    return(
      <div>
        <ol>
        {currentMessage}
        </ol>
      <label>Message</label>
      <br />
      <input onChange={this.updateMessage} type="text" placeholder="Message" />
      <br />
      <button onClick={this.submitMessage}>Write a message...</button>
      </div>
)
}
}
