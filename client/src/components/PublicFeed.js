import { useEffect } from 'react';
import Card from './Card';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';



function PublicFeed(props) {
  useEffect(() => {
    props.onThingsLoaded()
}, []);

  return (
    <>
      <Navbar />
      <Card things={props.things}/>
      {/* <div className="feed-logo">
      <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" width={200} height={150}/>
      </div> */}
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


export default connect(mapStateToProps, mapDispatchToProps)(PublicFeed)

