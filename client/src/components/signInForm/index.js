import React, { useState } from 'react';

const Form = (props) => {
  const [signupInfo, setSignUp] = useState({
    email: '',
    password: '',
  });

  const [allSignUpInfo, setAllSignUp] = useState([]);

  const handleInput = (info, value) => {
    setSignUp({ ...signupInfo, [info]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedForms = [...allSignUpInfo, signupInfo]
    setAllSignUp(updatedForms);
    setSignUp({ email: '', password: '' });
    console.log(signupInfo);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Email" value={signupInfo.email} onChange={e => handleInput('email', e.target.value)} />
      <input type="text" placeholder="Password" value={signupInfo.password} onChange={e => handleInput('password', e.target.value)} />
      <input type="submit" value="submit" />
    </form>
  );
};

export default Form;
