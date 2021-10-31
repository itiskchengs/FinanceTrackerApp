import React, { useState } from 'react';

const Form = () => {
  //Setting useState to create an object where it houses the signup information
  const [signupInfo, setSignUp] = useState({
    email: '',
    password: '',
  });

  //Set state to an empty array. This will later on hold all the emails and passwords that are submitted.
  const [allSignUpInfo, setAllSignUp] = useState([]);

  //When this function runs on the onchange in the form. It will find the object key and set the new value for that value.
  const handleInput = (info, value) => {
    //Spread in the old information and then add the new infromation over it. 
    setSignUp({ ...signupInfo, [info]: value });
  }

  //This function is ran when the user submits the form. 
  const handleSubmit = (event) => {
    event.preventDefault();
    //Grabs everything in allSignUpInfo and then also add the signupInfo object to the array. 
    const updatedForms = [...allSignUpInfo, signupInfo]
    //Calls the setter to add updatedForms information.
    setAllSignUp(updatedForms);
    //Resets form inputs.
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

/* INSERT MANY
db.animals.insertMany(
  [
    {
    "name": "Hero",
    "type": "tiger",
    age: 45,
    caged: true
    },
    {
      "name": "George",
      "type": "monkey",
      age: 23,
      caged: false
    },
    {
      "name": "Monker",
      "type": "whale",
      age: 70,
      caged: false
    }
  ]
)
*/

/* UPDATE ONE
db.animals.updateOne(
 { _id: ObjectId("617ca02713c141e98419e152")},
 {$set: {"name": "Bourto"}}
)

db.animals.updateOne(
  { _id: ObjectId("617ca02713c141e98419e152")},
  {$set: {"type": "shark"}}
)
*/

/*UPDATE MANY
db.animals.updateMany(
  {caged: {$eq: false}},
  {$set: {"caged": true}}
)
*/

/*DELETE ONE
db.animals.deleteOne(
  {_id: ObjectId("617ca02713c141e98419e152")},
)
*/

/*DELETE MANY
db.animals.deleteMany(
  {age: {$gt: 10}}
)
*/