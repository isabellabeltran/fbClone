import React from 'react';
import moment from 'moment';

const Comment = (props) => (<div className="ui comments">
  <div className="comment">
    <a className="avatar">
      <img src={props.comment.profilePic}/>
    </a>
    <div className="content">
      <a className="author">{props.comment.author}</a>
      <div className="metadata">
        <div className="date">{moment(props.comment.createdAt).fromNow()}</div>
      </div>
      <div className="text">{props.comment.textComment}</div>
    </div>
  </div>
</div>
);

export default Comment;