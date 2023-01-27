import { useEffect, useState } from 'react';
import { timeSince } from '../utils/utils.js';
import Avatar from 'react-avatar';
import { FaRegComment, FaBars } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import Cookies from 'js-cookie';

function Comments({ post }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState()
  const currentUser = Cookies.get('name')
  const currentUserId = Cookies.get('user_Id')
  const [count, setCount] = useState(0)
  let total = 0;

  useEffect(() => {
    getComments()
  }, [count]);

  const handlePopUp = (id) => {
    document.getElementById(`delete-comment${id}`).classList.toggle('show-delete-comment')
  }

  const openComments = (event) => {
    document.getElementById('add-post').classList.remove('add-post-popup')
    let close = document.getElementsByClassName('swap');
    for (let i = 0; i < close.length; i++) {
      close[i].classList.remove('show-comments');
    }
    setCount(count + 1)
    event.currentTarget.nextSibling.classList.toggle('show-comments');
  }

  const closeMe = (event) => {
    event.currentTarget.parentElement.classList.remove('show-comments')
  }

  const handleAddComment = (event) => {
    setNewComment({
      userId: currentUserId,
      spare: currentUser,
      pic: Cookies.get('profile_pic'),
      [event.target.name]: event.target.value
    })
  }

  const postComment = (post) => {
    fetch(`/api/addcomment${post.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)

    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          setCount(count + 1)
        }
      })
    document.getElementById(`comment-input${post.id}`).value = ""
  }

  const getComments = () => {
    fetch(`/api/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(comments => {
        setComments(comments)
      })
  }

  const handleCommentDelete = (comment) => {
    fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        getComments()
        document.getElementById(`comment${comment.id}`).classList.add('hide-comment-delete-btn')
      })
  }

  const myComments = comments.map(comment => {
    const dateCreated = new Date(comment.createdAt);
    let deleteCommentBtn;
    comment.userId === currentUserId ?
      deleteCommentBtn = 'show-comment-delete-btm'
      :
      deleteCommentBtn = 'hide-comment-delete-btn';
    let commentImage;
    if (comment.postId === post.id) {
      total++
    };
    comment.pic === "invalid" ?
      commentImage = <Avatar name={comment.spare} round={true} size={150} />
      :
      commentImage = <Avatar src={comment.pic} className="rounded" />
    return (
      <div key={comment.id} id={`comment${comment.id}`} className={comment.postId} style={comment.postId !== post.id ? { display: 'none' } : { display: 'block' }} >
        <div className="comment-image">
          {commentImage}
          <span className="commenter">{comment.spare}</span>
          <span className="time-since">{timeSince(dateCreated)}</span>
        </div>
        
        <div className='comment'>
          <span className='comment-text'>
            {comment.comment}
          </span>
          <FaBars className={`comment-burger ${deleteCommentBtn}`} onClick={ () => handlePopUp(comment.id)} />
        </div> 
        <div id={`delete-comment${comment.id}`} className={`delete-comment ${deleteCommentBtn}`} type='submit' onClick={() => handleCommentDelete(comment)}>Delete</div>
        </div>
    )
  })

  return (
    <>
      <div className='comment-total' onClick={(e) => openComments(e, post)} >
        <FaRegComment className='white comment-icon' />
        <span>{total}</span>
      </div>
      <div className='swap hide'>
        <MdClose className='comment-close' onClick={closeMe} />
        <input id={`comment-input${post.id}`} className='textbox comment-textbox' type="text" name="comment" onChange={handleAddComment} placeholder="Enter Comment" autoComplete='off'/>
        <button type='submit' onClick={() => postComment(post)} className="btn comment-btn">Submit</button>
        <div className='comment-box'>
          {myComments}
        </div>

      </div>
    </>
  )
}

export default Comments