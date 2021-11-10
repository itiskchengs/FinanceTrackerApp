import { useState } from 'react';
import Form from '../form/index';
import axios from 'axios';

const SignUpForm = () => {

    //intiating state and saving object with signup information.
    const [signupInfo, setSignUp] = useState({
        email: "",
        password: ""
    })

    //State that stores all the users information that is submitted.
    const [allSignUpInfo, setAllSignUp] = useState([]);

    //Function that replaces the signUpInfo with the values that are written in the input forms.
    const handleInput = (info, value) => {
        setSignUp({...signupInfo, [info]: value});
    }

    //Function that runs when the user clicks the button and submits. 
    const handleSubmit = (event) => {
        event.preventDefault();
        //takes and adds all the data from allsignupInfo and also adds the signupInfo data in there.
        const updatedForms = [...allSignUpInfo, signupInfo]
        setAllSignUp(updatedForms);
        //Runs the fetch function and uses the information from the varibale updated forms.
        sendData(updatedForms)
        setSignUp({email: '', password: ''});
    }

    //Function that POST fetch data to the mongoDB server.
    const sendData = (updatedForms) => {
        axios.post('/api/users/signup', {
            email: updatedForms[0].email,
            password: updatedForms[0].password
        }).then((response) => {
            console.log('User added',response);
        }).catch((error) => {
            console.log(error);
        });
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