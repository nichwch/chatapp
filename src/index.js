import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

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
      <ul className = "message=list">
      {this.props.messages.map(message => {
        return (
          <li key={message.id}>
          <div>
          {message.senderID}
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
