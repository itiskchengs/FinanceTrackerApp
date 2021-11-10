import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
    let decoded = jwt_decode;
    console.log(jwt_decode(token))

    
    const isTokenExpired = (token) => {
        if(decoded(token).exp < Date.now() / 1000){
            localStorage.removeItem('token');
            window.location.assign('/');

        } else {
            console.log('not expired');
        }
    }

    isTokenExpired(token);

    return(
        <h1>Hello World</h1>
    )
}

export default Profile;