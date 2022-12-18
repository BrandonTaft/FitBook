import { useEffect, useState } from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import Avatar from 'react-avatar';
import { FaRegComment } from 'react-icons/fa';
import { MdClose } from "react-icons/md";

function Comments({post}) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState()
    const currentUser = localStorage.getItem('name')
    const currentUserId = localStorage.getItem('user_Id')
    const [count, setCount] = useState(0)
    let total = 0;

    useEffect(() => {
        getComments()
        return () => {
          setComments([]); //clean up
        };
      }, [count]);

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dxbieon3u',
          invalidate: true
        }
      });
    
    const openComments = (event) => {
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
          pic: localStorage.getItem('bio'),
          [event.target.name]: event.target.value
        })
      }
    
      const postComment = (post) => {
        fetch(`http://127.0.0.1:8080/api/addcomment${post.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
    
        }).then(response => response.json())
          .then(result => {
            if (result.success) {
              getComments()
              setCount(count + 1)
            }
          })
          document.getElementById(`comment-input${post.id}`).value = ""
      }
    
      const getComments = () => {
        fetch(`http://127.0.0.1:8080/api/comments`, {
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
    fetch(`http://127.0.0.1:8080/api/comments/${comment.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        getComments()
        setCount(count + 1)
      })
  }

      const myComments = comments.map(comment => {
        let deleteCommentBtn;
        comment.userId === currentUserId ?
        deleteCommentBtn = 'show-comment-delete-btm'
        :
        deleteCommentBtn = 'hide-comment-delete-btn';
        const myCommentImage = cld.image(comment.userId);
        let commentImage;
        if (comment.postId === post.id) {
          total++
        };
        const theImage = localStorage.getItem('profile_pic')
        comment.pic === "invalid" ?
        commentImage = <Avatar src={theImage} className="rounded" />
        :
        commentImage = <Avatar name={comment.spare} round={true} size={150} />;
  
        return (
          <div key={comment.id} className={comment.postId} style={comment.postId !== post.id ? { display: 'none' } : { display: 'block' }} >
            <div className="yellow comment-image">
            {commentImage}
              <span className="spare">{comment.spare}</span>
            </div>
            <div className='comment'>{comment.comment}</div>
            <button className={`btn ${deleteCommentBtn}`} type='submit' onClick={() => handleCommentDelete(comment)}>Delete</button>
          </div>
        )
      })

    return(
        <>
         {total}
          <FaRegComment onClick={(e) => openComments(e, post)} className='white comment-icon' />
          <div className='swap hide'>
            <MdClose className='comment-close' onClick={closeMe} />
            <input id = {`comment-input${post.id}`} className='textbox comment-textbox' type="text" name="comment" onChange={handleAddComment} placeholder="Enter Comment" />
            <button type='submit' onClick={() => postComment(post)} className="btn comment-btn">Submit</button>
            <div className='comment-box'>
              {myComments}
            </div>

          </div>
        </>
    )
}

export default Comments