import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';

function useGetUsers(props) {
   
        props.onUsersLoaded()
     
      console.log("TEST", props.users)
      return  props.users 
}

const mapDispatchToProps = (dispatch) => {
    return {
      onUsersLoaded: () => dispatch(actionCreators.fetchAllUsers())
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      users: state.users
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(useGetUsers)