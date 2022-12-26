import { Redirect } from "react-router-dom";
import  "./App.css"

function Logout(props) {
    const token = localStorage.getItem('token');
        fetch('http://127.0.0.1:8080/api/logout', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }).then(localStorage.clear())
    return (
        <Redirect to='/' />
    )
}

export default Logout