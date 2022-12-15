import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Redirect(props) {
    const history = useHistory();
    useEffect(() => {
        const timer = setTimeout(() =>  history.push('/feed'), 3000);
      }, []);
    return (
        <div className='redirect'>
        <div className='highlight'>
            We are adding your post!!!!
        </div>
        </div>
    )
}

export default Redirect