import React from 'react';
import ReactDOM from 'react-dom';
import Chatkit from '@pusher/chatkit'
import './App.css';

const instanceLocator = "v1:us1:bbd86279-8139-4543-aefa-ea475dade917"
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/bbd86279-8139-4543-aefa-ea475dade917/token"
const username = "nick"
const roomId = 19406025

const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win?"
  },
  {
    senderId: "janedoe",
    text: "who'll win?"
  }
]

class App extends React.Component {

  componentDidMount()
  {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userID: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    })

  chatManager.connect()
  .then(currentUser => {
    this.currentUser = currentUser
    return this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
        this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
        })
    })
})
.catch(err => console.log('error connecting: ', err))
  }
  constructor()
  {
    super();
    this.state = {
      messages:DUMMY_DATA,
    };
  }
  render() {
    return (
      <div className ="app">

        <MessagesList messages = {this.state.messages}/>

      </div>
    );
  }
}
/*
class Title extends React.Component {
  render() {
    //return (

    //);
  }
}
*/

class MessagesList extends React.Component {
  render() {
    return (
      <ul className = "message-list">
      {this.props.messages.map(message => {
        return (
          <li key={message.id}>
            <div>
              {message.senderId}
            </div>
            <div>
              {message.text}
            </div>
          </li>
        )
      })}
      </ul>
    );
  }
}
/*
class SendMessageForm extends React.Component {
  render() {
    //return (

    //);
  }
}
*/


ReactDOM.render(<App />, document.getElementById("root"));
