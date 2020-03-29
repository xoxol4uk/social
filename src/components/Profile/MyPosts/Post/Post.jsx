 import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
               <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/4_avatar-512.png" />
                {props.message}
                	<div>
                		<span>Like:</span>{props.likesCount}
                	</div>
              </div>
    )
}

export default Post;