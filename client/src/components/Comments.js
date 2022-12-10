import { useEffect, useState } from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import Avatar from 'react-avatar';
import { FaRegComment } from 'react-icons/fa';
import { MdClose } from "react-icons/md";

function Comments({thing}) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState()
    const currentUser = localStorage.getItem('name')
    const currentUserId = localStorage.getItem('user_Id')
    const [count, setCount] = useState(0)
    let total = 0;

    useEffect(() => {
        getComments()
      }, [count]);

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dxbieon3u',
          invalidate: true
        }
      });
    
    const openComments = (event) => {
        let close = document.getElementsByClassName('switch');
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
    
      const postComment = (thing) => {
        fetch(`http://127.0.0.1:8080/api/addcomment${thing.id}`, {
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
          document.getElementById(`comment-input${thing.id}`).value = ""
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
      const myComments = comments.map(comment => {
        const myCommentImage = cld.image(comment.userId);
        let commentImage;
        if (comment.postId === thing.id) {
          total++
        };
  
        comment.pic === "true" ?
        commentImage = <AdvancedImage cldImg={myCommentImage} className="rounded" />
        :
        commentImage = <Avatar src={`https://i.pravatar.cc/150?img=${comment.userId - 68}`} round={true} size={150} />;
  
        return (
          <div key={comment.id} className={comment.postId} style={comment.postId !== thing.id ? { display: 'none' } : { display: 'block' }} >
            <div className="yellow comment-image">
            {commentImage}
              <span className="spare">{comment.spare}</span>
            </div>
            <div className='comment'>{comment.comment}</div>
            {/* <button type='submit' onClick={() => handleCommentDelete(comment)} className="">Delete</button> */}
          </div>
        )
      })

       // const handleCommentDelete = (comment) => {
  //   fetch(`http://127.0.0.1:8080/api/comments/${comment.userId}`, {
  //     method: 'DELETE'
  //   }).then(response => response.json())
  //     .then(result => {
  //       getComments()
  //       setCount(count + 1)
  //     })
  // }

    return(
        <>
         {total}
          <FaRegComment onClick={(e) => openComments(e, thing)} className='white comment-icon' />
          <div className='switch hide'>
            <MdClose className='comment-close' onClick={closeMe} />
            <input id = {`comment-input${thing.id}`} className='textbox comment-textbox' type="text" name="comment" onChange={handleAddComment} placeholder="Enter Comment" />
            <button type='submit' onClick={() => postComment(thing)} className="btn comment-btn">Submit</button>
            <div className='comment-box'>
              {myComments}
            </div>

          </div>
        </>
    )
}

export default Comments