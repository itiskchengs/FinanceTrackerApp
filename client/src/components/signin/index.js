import { useState } from 'react';
import Form from '../form';
import axios from 'axios';

const SignInForm = () => {

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
        setSignIn({email: "", password: ""});
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