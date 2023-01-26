import { useEffect } from 'react';
import { Card } from './Cards';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';

function PublicFeed(props) {
  useEffect(() => {
    props.onPublicPostsLoaded()
    props.onAllUsersLoaded()
  }, []);
  return (
    <>
      <Card publicPosts={props.posts} allUsers={props.allUsers} />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPublicPostsLoaded: () => dispatch(actionCreators.fetchPublicPosts()),
    onAllUsersLoaded: () => dispatch(actionCreators.fetchAllUsers())
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    allUsers: state.allUsers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicFeed)

