import React from 'react';
import CommentInput from '../comment/CommentInput.js';
import CommentList from '../comment/CommentList.js';
import moment from 'moment';
import './post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  render() {
    return (
      <div className="post">
        <div className="ui top attached segment">
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src={this.props.post.profilePic}/>
              </a>
              <div className="content">
                <a className="author">{this.props.post.author}</a>
                <br />
                <div className="metadata">
                  <div className="date">{moment(this.props.post.createdAt).fromNow()}</div>
                  <div className="rating">
                    <i className="star icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text">
            {this.props.post.postText}
          </div>
        </div>
        <div className="ui bottom attached segment">
          <CommentInput authorId={this.props.id} postId={this.props.post.id} fetchComments={this.props.fetchPostFeed}/>
          <CommentList comments={this.props.post.comments}/>
        </div>
      </div>
    );
  }
}
 
export default Post;