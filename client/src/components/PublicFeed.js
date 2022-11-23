import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Navbar from './Navbar';
import Avatar from 'react-avatar';
import { FcLike } from 'react-icons/fc';
import { FaRegComment } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import { TbArrowsMaximize } from "react-icons/tb";
import "./App.css";
import { timeSince } from '../utils/utils.js'

function PublicFeed(props) {
  const [count, setCount] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState([])
  const [users, setUsers] = useState()
  const currentUser = localStorage.getItem('name')
  const currentUserId = localStorage.getItem('user_Id')
  useEffect(() => {
    props.onThingsLoaded()
    getComments()
  }, [count])

  const toggleBody = event => {
    document.getElementById('overlay').classList.toggle('hide-overlay')
    event.currentTarget.parentElement.classList.toggle('show')
    event.currentTarget.getElementById('post-body').classList.toggle('grow')
  }

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
    console.log("test", currentUser)
    setNewComment({
      userId: currentUserId,
      spare: currentUser,
      [event.target.name]: event.target.value
    })
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
          setCount(count + 1)
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
    fetch(`https://lit-ravine-06265.herokuapp.com/api/comments/${comment.userId}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        getComments()
        setCount(count + 1)
      })
  }

  const handleFeedback = event => {
    let id = event.currentTarget.id
    let score;
    score = event.currentTarget.nextSibling.innerHTML
    event.currentTarget.nextSibling.innerHTML = parseInt(score) + 1
    fetch(`https://lit-ravine-06265.herokuapp.com/api/update/${id}`, {
      method: 'PUT'
    }).then(response => response.json())
  }

  
  const thingItems = props.things.map(thing => {
    let total = 0;
    const dateCreated = new Date(thing.createdAt)
    console.log("DATE", timeSince(dateCreated))

    const myComments = comments.map(comment => {
      // console.log(comment.userId)
      if (comment.postId === thing.id) {
        total++
      }
      return (
        <div key={comment.id} className={comment.postId} style={comment.postId != thing.id ? { display: 'none' } : { display: 'block' }} >
          <div className="yellow">
            <Avatar src={`https://i.pravatar.cc/150?img=${comment.userId - 68}`} round={true} size={30} />
            <span className="spare">{comment.spare}</span>
          </div>
          <div className='comment'>{comment.comment}</div>
          {/* <button type='submit' onClick={() => handleCommentDelete(comment)} className="">Delete</button> */}
        </div>
      )
    })
    return (
      <div key={thing.id} className="grid-item">
        <TbArrowsMaximize className="white maximize" onClick={(e) => toggleBody(e, thing)} />
        <div className="avatar-container">
          <Avatar src={`https://i.pravatar.cc/150?img=${thing.user_id - 68}`} round={true} size={150} />
          <div className="bold white">
            <span className='user-name'>{thing.priority}</span><br />
            <span className="title yellow">{thing.contactNumber}</span>
          </div>
        </div>
        <div className='post-body' id='post-body' >
          <span className='post-title'>
            {thing.name}
          </span><br />
          {thing.link ?
            <a rel={'external'} target="_blank" href={`${thing.link}`} className="post-link">Try it out</a>
            : ""}
            <br />
          <span className="off-white">{timeSince(dateCreated)}</span>
          <p className='post-description'>
            {thing.description}
          </p>
        </div>
        <div className='feedback'>
          <div className="likes">
            <FcLike onClick={handleFeedback} className="heart" id={thing.id} />
            <span className='score' id={thing.score}>{thing.score}</span>
          </div>
          {total}
          <FaRegComment onClick={(e) => openComments(e, thing)} className='white comment-icon' />
          <div className='switch hide'>
            <MdClose className='comment-close' onClick={closeMe} />
            <input className='textbox comment-textbox' type="text" name="comment" onChange={handleAddComment} placeholder="Enter Comment" />
            <button type='submit' onClick={() => postComment(thing)} className="btn comment-btn">Submit</button>
            <div className='comment-box'>
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
      <aside id="overlay" className="overlay hide-overlay"></aside>
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

