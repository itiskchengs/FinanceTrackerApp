import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Form from '../form';
import axios from 'axios';

const SignInForm = () => {
    const navigate = useNavigate();

    const [signinInfo, setSignIn] = useState({
        email: "",
        password: ""
    })

    const [allSignInInfo, setAllSignIn] = useState([])

    const handleInput = (info, value) => {
        setSignIn({...signinInfo, [info]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedForms = [...allSignInInfo, signinInfo];
        setAllSignIn(updatedForms);
        console.log(updatedForms);
        sendData(signinInfo);
        setSignIn({email: "", password: ""});
    }

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
            console.log(response);
            if(response.data.message === 'Invalid'){
                alert('Invalid Username or Password');
            } else {
                localStorage.setItem("token", response.data.token)
                console.log('Logged In',response);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        
        axios({
            method: 'get',
            url: '/api/users/getUsername',
            headers: { 
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => { 
            console.log(response)
            //response.data.isLoggedIn ? navigate('/', { state: {from: { pathname: "/profile"}}}) : null
            if(response.data.isLoggedIn === true) {
                //navigate('/profile');
                window.location.assign('/profile');
            } else {
                console.log('Broken')
            }
        })
    }, [])


    return(
        <Form 
            signUpInfo = {signinInfo}
            handleInput = {handleInput}
            handleSubmit = {handleSubmit}
        />
    )
}

export default SignInForm;