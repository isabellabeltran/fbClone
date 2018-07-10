import React from 'react'; 
import { Form, Button } from 'semantic-ui-react';
import io from 'socket.io-client';
import './index.css';

class Chat extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      currentMsg: '',
      messages: [],
      msg: '',
    };
    this.socket = io('http://localhost:3000');
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage(event) {
    this.socket.emit('new-message', {message: this.state.currentMsg, user: this.props.user});
  }

  handleCurrentMsg(e) {
    this.setState({currentMsg: e.target.value});
  }

  componentDidMount() {
    this.props.changePage('chat');
    const context = this; 
    this.socket.on('receive-message', (msg) => {
      let messages = context.state.messages; 
      messages.push(`${msg.user.toUpperCase()}:  ${msg.message}`);
      this.setState({messages: messages});
    });
  }

  render() {
    return (
      <div>
        <div className='message-box'>
          {
            this.state.messages.length > 0 ? 
              (
                this.state.messages.map(msg =>
                  <div className='each-message'> 
                    {msg}
                  </div>
                ))
              :
              (
                null
              )
          }
        </div>
        <div className='send-msg'>
          <Form onSubmit={this.submitMessage} >
            <Form.Group>
              <Form.Input width={14} type='text' name='msg' onChange={this.handleCurrentMsg.bind(this)} />
              <Button className='send-button' type='submit'>Send</Button>
            </Form.Group> 
          </Form>
        </div>
      </div>
    );
  }
}

export default Chat; 