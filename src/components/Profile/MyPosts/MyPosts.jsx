import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field, reset } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';


const MyPosts = React.memo(props => {
    let postsElements = props.posts
        .map( p => <Post message = {p.message} key={p.id} likesCount={p.likesCount} /> );
    

    let onAddPost = (e, dispatch) => {
      props.addPost(e.newPostBody);
      dispatch(reset("profileAddPostForm"));
    }


	return  (
		        <div classmessage={s.postsBlock}>
          <h3>My posts</h3>
            <div>
              <AddPostFormRedux onSubmit={onAddPost} />
            </div>
              <div classmessage={s.posts}>
                  {postsElements}
              </div>
        </div>
		)
});

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
 
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
          <Field component={Textarea} name="newPostBody" placeholder="Post message"
                 validate={[required, maxLength10]} />
      </div>
        <div>
          <button>Add post</button>
        </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({form: "profileAddPostForm"}) (AddPostForm);

export default MyPosts;