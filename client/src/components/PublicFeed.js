import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Navbar from './Navbar';
import Avatar from 'react-avatar';
import { FcLike } from 'react-icons/fc';
import { FaRegComment } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import "./App.css"

function PublicFeed(props) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState([])

  useEffect(() => {
    props.onThingsLoaded()
  }, [])

  const toggleBody = event => {
    event.currentTarget.classList.toggle('show')
  }

  const openComments = (event, thing) => {
    let close = document.getElementsByClassName('switch');
    for (let i = 0; i < close.length; i++) {
      close[i].classList.remove('show-comments');
    }
    event.currentTarget.nextSibling.classList.toggle('show-comments');
    getComments()
  }

  const handleAddComment = (e) => {
    setNewComment({ [e.target.name]: e.target.value })
  }

  const postComment = (thing) => {
    fetch(`https://lit-ravine-06265.herokuapp.com/api/addcomment${thing.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)

    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          getComments()
        }
      })
  }

  const getComments = () => {
    fetch(`https://lit-ravine-06265.herokuapp.com/api/comments`, {
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
    fetch(`https://lit-ravine-06265.herokuapp.com/api/comments/${comment.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        getComments()
      })
  }

  const handleFeedback = event => {
    let id = event.currentTarget.id
    let score = event.currentTarget.nextSibling.innerHTML
    event.currentTarget.nextSibling.innerHTML = parseInt(score) + 1
    fetch(`https://lit-ravine-06265.herokuapp.com/api/publicthings/${id}`, {
      method: 'PUT'
    }).then(response => response.json())
  }



  const thingItems = props.things.map(thing => {
    const myComments = comments.map(comment => {
      return (
        <div key={comment.id} className={comment.postId} style={comment.postId != thing.id ? { display: 'none' } : { display: 'block' }} >
          <div>{comment.comment}</div>
          <button type='submit' onClick={() => handleCommentDelete(comment)} className="">Delete</button>
        </div>
      )
    })
    return (
      <div key={thing.id} className="grid-item">
        <div className="avatar-container">
          <Avatar src={`https://i.pravatar.cc/150?img=${thing.id - 98}`} />
          <div className="bold white">
            {thing.priority}
          </div>
        </div>
        <div className='post-body' onClick={toggleBody}>{thing.name}<p> {thing.description}</p></div>
        {/* <a rel={'external'} target="_blank" href={`${thing.link}`} className="thingTitle">{thing.name}</a> */}
        <div className='feedback'>
          <div className="likes">
            <FcLike onClick={handleFeedback} className="heart" id={thing.id} />
            <span className='score' id={thing.score}>{thing.score}</span>
          </div>
          <FaRegComment onClick={(e) => openComments(e, thing)} className='white comment-icon' />
          <div className='switch hide'>
            <MdClose />
            <input type="text" name="comment" onChange={handleAddComment} placeholder="Enter Comment" />
            <button type='submit' onClick={() => postComment(thing)} className="">Submit</button>
            <div>
              {myComments}
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    <>
      <Navbar />
      {/* <div className="feed-logo">
      <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" width={200} height={150}/>
      </div> */}
      <div className="grid-container">
        {thingItems}
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onThingsLoaded: () => dispatch(actionCreators.fetchThings())
  }
}

const mapStateToProps = (state) => {
  return {
    things: state.things
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PublicFeed);

