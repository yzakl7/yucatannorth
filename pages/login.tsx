import React, { useState } from "react";
import { useAuth } from "../utils/auth/authContext";

function SignInScreen() {
  // const [email, setemail] = useState('')
  // const [password, setpassword] = useState('')
  // const { signin, user, signout } = useAuth()
  // const login = async() => {
  //   const response = await signin(email, password)
  //   console.log({response});
  // }
  return (
    <div>
      {/* <h1> Login </h1>
      <p> 
        { JSON.stringify({user}) }
      </p>
      <input
        value={email}
        onChange={(evt)=> setemail(evt.target.value)}
        type="text"
        placeholder="email"
      />
      <input
        value={password}
        onChange={
          (evt)=> setpassword(evt.target.value)
        }
        type="password"
        placeholder="password"
      />
      <button onClick={login}>login</button>

      <button onClick={signout}>logout</button> */}
    </div>
  );
}

export default SignInScreen;