import { useState } from 'react';
import Form from '../form';
import axios from 'axios';

const SignInForm = () => {

    //State that holds the signInInfo data
    const [signinInfo, setSignIn] = useState({
        email: "",
        password: ""
    })

    //Function that fires the setSignIn function that finds the key if its there and updates the values.
    const handleInput = (info, value) => {
        setSignIn({...signinInfo, [info]: value})
    }

    //Function that runs when the button is submitted and runs the sendData fetch function with the signInInfo state object data sent through it.
    const handleSubmit = (event) => {
        event.preventDefault();
        sendData(signinInfo);
        setSignIn({email: "", password: ""});
    }

    //Fetch call to verify to check if the username and password match. If it matches then run jwtCheck function
    const sendData = (loginInformation) => {
        axios({
            method: 'post',
            url: '/api/users/signin',
            headers: { 
                "Content-type": "application/json"
            },
            data: { 
                email: loginInformation.email,
                password: loginInformation.password
            }
        }).then((response) => {
            if(response.data.message === 'Invalid'){
                alert('Invalid Username or Password');
            } else {
                localStorage.setItem("token", response.data.token)
                jwtCheck();
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    //Fetch call to verify that the token is the same if it is redirects to dashboard.
    const jwtCheck = () => {
        axios({
            method: 'get',
            url: '/api/users/getUsername',
            headers: { 
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => { 
            console.log(response)
            if(response.data.isLoggedIn === true) {
                window.location.assign('/dashboard')
            } else {
                console.log('Token verification did not pass')
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    return(
        <Form 
            signUpInfo = {signinInfo}
            handleInput = {handleInput}
            handleSubmit = {handleSubmit}
        />
    )
}

export default SignInForm;