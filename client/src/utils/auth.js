import jwt_decode from 'jwt-decode';

//const token = localStorage.getItem('token');
const decoded = jwt_decode;

//Checks if there is a token and also check if the token is expired or not. If its true then continue on if its false redirect them to the sign in page.
const isLoggedIn = (token) => {
    return decoded(token) && !isTokenExpired(token) ? true : false;
}

//Checks if the token is expired or not. Depending you can continue or be forced to log in again.
const isTokenExpired = (token) => {
    if(decoded(token).exp < Date.now() / 1000){
        localStorage.removeItem('token');
        window.location.assign('/');
        return true;
    } else {
        console.log('not expired');
        return false;
    }
}

//Grabs the token from local storage 
const getToken = () => {
    return localStorage.getItem('token');
}

//Removes the token from local storage and redirects back to sign in page.
const isLoggedOut = () => {
    localStorage.removeItem('token');
    window.location.assign('/');
}

export default {isLoggedIn, isTokenExpired, getToken, isLoggedOut}