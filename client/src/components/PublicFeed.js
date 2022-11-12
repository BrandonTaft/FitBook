import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Navbar from './Navbar';
import Avatar from 'react-avatar';
import { FcLike } from 'react-icons/fc';
import { FaRegComment } from 'react-icons/fa';
import "./App.css"

function PublicFeed(props) {
  const commentRef = useRef(null)
  useEffect(() => {
    props.onThingsLoaded()
  }, [])


  const handlePublicDelete = (thing) => {
    fetch(`https://lit-ravine-06265.herokuapp.com/api/publicthings/${thing.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        props.onThingsLoaded()
      })
  }
  const toggleBody = event => {
    event.currentTarget.classList.toggle('show')
  }

  const openComments = event => {
    event.currentTarget.nextSibling.classList.toggle('show-comments')
  }
  
  const handleAddComment = (e) => {
    commentRef.current = {[e.target.name]: e.target.value}
}

const postComment = () => {
    fetch("https://lit-ravine-06265.herokuapp.com/api/addcomment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentRef.current)
       
    }).then(response => response.json())
        .then(result => {
            if (result.success) {
            }
        })
}

// const getAllGames = () => {
//   const token = localStorage.getItem('jsonwebtoken')

//   fetch('http://localhost:8081/api/videogames', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   })

//     .then(response => response.json())
//     .then(games => {
//       if (games.success === false) {
//         history.push('/')
//       } else {
//         setGames(games)
//       }
//     })
// }

  const handleFeedback = event => {
    let id = event.currentTarget.id
    let score = event.currentTarget.nextSibling.innerHTML
    event.currentTarget.nextSibling.innerHTML = parseInt(score) + 1
    fetch(`https://lit-ravine-06265.herokuapp.com/api/publicthings/${id}`, {
      method: 'PUT'
    }).then(response => response.json())
  }


  const thingItems = props.things.map(thing => {
    const randomNumber = Math.floor(Math.random() * 70) + 1;
    const likes = thing.score
    return (
      <div key={thing.id} className="grid-item">
        <div className="avatar-container">
          <Avatar src={`https://i.pravatar.cc/150?img=${randomNumber}`} />
          <div className="bold white">
            {thing.priority}
          </div>
        </div>
        <div className='post-body' onClick={toggleBody}>{thing.name}<p> {thing.description}</p></div>
        {/* <a rel={'external'} target="_blank" href={`${thing.link}`} className="thingTitle">{thing.name}</a> */}
        <div className='feedback'>
          <FcLike onClick={handleFeedback} id={thing.id} />
          <span id={thing.score}>{likes}</span>

          <FaRegComment onClick={openComments} className='white' />
          <div className='hide'>
            <input className="textbox" type="text" name="comment" onChange={handleAddComment} placeholder="Enter Comment" />
            <button onClick={postComment} className="">Submit</button>
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

