import React from 'react';
import axios from 'axios';
import { Input, Form, Button } from 'semantic-ui-react';

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  onChange (event) {
    this.setState({
      content: event.target.value
    });
  }

  submitComment(event) {
    event.preventDefault();
    let component = this;
    axios.post('/comments', {
      postText: component.state.content,
      authorId: component.props.authorId,
      idPost: component.props.postId
    }).then(function(response) {
      component.setState({
        content: ''
      });
      component.props.fetchComments();
    });
  }

  render() {
    return (<div className="ui comments">
      <Form>
        <div className="field">
          <Input placeholder="Share your opinion" value={this.state.content} onChange={this.onChange} />
        </div>
        <div className="field">
          <Button size='small' onClick={this.submitComment}>Comment</Button>
        </div>
      </Form>
    </div>);
  }
}

export default CommentInput;