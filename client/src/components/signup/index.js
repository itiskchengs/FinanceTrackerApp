import { useState, useEffect } from 'react';
import Form from '../form/index';
//import axios from 'axios';

const SignUpForm = () => {
    const [signupInfo, setSignUp] = useState({
        email: "",
        password: ""
    })
    const [allSignUpInfo, setAllSignUp] = useState([]);

    const handleInput = (info, value) => {
        setSignUp({...signupInfo, [info]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedForms = [...allSignUpInfo, signupInfo]
        setAllSignUp(updatedForms);
        setSignUp({email: '', password: ''});
    }

    return(
        <Form 
            signUpInfo={signupInfo}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
        />
    )

}

export default SignUpForm;