import React from 'react'
import ReactDOM from 'react-dom'
import Chatkit from '@pusher/chatkit'
import './App.css'

const instanceLocator = "v1:us1:bbd86279-8139-4543-aefa-ea475dade917"
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/bbd86279-8139-4543-aefa-ea475dade917/token"
const username = "nick"
const roomId = 19406025



class App extends React.Component {
  componentDidMount()
  {
    //create a new chatmanager using the parameters we created with the API
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    })

    //connect to the chat room, and subscribe to the messages
    chatManager.connect().then(currentUser => {
          this.currentUser = currentUser
          currentUser.subscribeToRoom({
          roomId: roomId,
          hooks: {
            onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }
  constructor()
  {
    super();
    this.state = {
      messages:[{}],
    };
    this.sendMessage = this.sendMessage.bind(this)

  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    })
  }
  render() {
    return (
      <div className ="app">

        <MessagesList messages = {this.state.messages}/>
        <SendMessageForm sendMessage = {this.sendMessage}/>
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <p class = "Title">Nick's React.js Chat App</p>
    );
  }
}


class MessagesList extends React.Component {
  render() {
    return (
      <ul className = "message-list">
      {this.props.messages.map(message => {
        return (
          <li key={message.Id}>
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

class SendMessageForm extends React.Component {
  constructor()
  {
    super()
    this.state= {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
      return (
        <form
          onSubmit={this.handleSubmit}
          className="send-message-form">
          <input
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Type your message and hit ENTER"
            type="text" />
        </form>
      )
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })
}
}



ReactDOM.render(<App />, document.getElementById("root"));
