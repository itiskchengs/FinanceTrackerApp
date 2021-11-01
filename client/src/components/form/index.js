const Form = (props) => {
  const {signUpInfo, handleInput, handleSubmit} = props;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Email" value={signUpInfo.email} onChange={e => handleInput('email', e.target.value)} />
      <input type="text" placeholder="Password" value={signUpInfo.password} onChange={e => handleInput('password', e.target.value)} />
      <input type="submit" value="submit" />
    </form>
  );
};

export default Form;