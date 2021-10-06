

import React, { useState, useEffect } from 'react';

import AllMail from './AllMail';





function GetMail() {

  //useEffect is hook that allows component to use state and must be imported
  //games will bevalue of state
  //setGames is function that will update the state
  const [mail, setMail] = useState([])

  //getAllGames is a function that will fetch json from api then puts it in the state
  // it was made just to clean up the useEffect hook/ looks better
  useEffect(() => { getMail() }, [])

  const getMail = () => {
    const name = localStorage.getItem('name')
    fetch(`https://lit-ravine-06265.herokuapp.com/api/getmail/${name}`)
      .then(response => response.json())
      .then(mail => {
        console.log(mail)
        setMail(mail)
      })
  }



  return (
    <div>
      <AllMail mail={mail} />

    </div>
  )

}


export default GetMail
