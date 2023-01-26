import { Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import  "./App.css"

function Logout(props) {
    const token = Cookies.get('token');
    Cookies.remove('token')
    Cookies.remove('name')
    Cookies.remove('user_Id')
    Cookies.remove('user') //cloudinary
    Cookies.remove('profile_pic')
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