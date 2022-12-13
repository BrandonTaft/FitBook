import { useEffect } from 'react';
import { Card } from './Cards';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';



function PublicFeed(props) {
  useEffect(() => {
    props.onPublicPostsLoaded()
  }, []);
  return (
    <>
      <Card publicPosts={props.posts} />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPublicPostsLoaded: () => dispatch(actionCreators.fetchPublicPosts())
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PublicFeed)

