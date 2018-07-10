import React from 'react';
import axios from 'axios';

class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  onChange (event) {
    this.setState({
      content: event.target.value
    });
  }

  submitPost(event) {
    var component = this;
    event.preventDefault();
    axios.post('/postFeed', {
      postText: this.state.content,
      idAuthor: component.props.id,
      idWall: component.props.wallId 
    }).then(function(response) {
      component.setState({
        content: ''
      });
      component.props.fetchPostFeed();
    });
  }

  render() {
    return (<div className= "ui segment">
      <form className="ui form">
        <div className="field">
          <label>Post Message</label>
          <textarea placeholder="What's on your mind" rows="3" value={this.state.content} onChange={this.onChange}>
          </textarea>
        </div>
        <div className="field">
          <button className="ui button" role="button" onClick={this.submitPost}>Post</button>
        </div>
      </form>
    </div>);
  }
}

export default PostInput;