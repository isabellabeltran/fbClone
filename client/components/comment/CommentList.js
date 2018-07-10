import React from 'react';
import Comment from './Comment.js';

const CommentList = (props) => {
  return (
    <div>
      {props.comments.map((comment, i) => <Comment comment={comment} key={i} />)}
    </div>
  );
};

export default CommentList;