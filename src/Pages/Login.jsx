import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import style from "./Login.module.css";

const Login = (props) => {
 const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState(props.location?.state?.email || '');
  const [password, setPassword] = useState(props.location?.state?.password || '');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
   
    const userCredential = signInWithEmailAndPassword(auth, email, password)
    
        // Signed in
        console.log(userCredential.user);
        navigate("/");

    }catch(error) {
        const errorMessage = error.message;
        console.log(errorMessage)
        setErr(true)
    }
  };
  console.log(email,password);
  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <span className={style.logo}>ToDo List</span>
        <span className={style.title}>LogIn</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder={'email'}   value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          <input type="password" placeholder={'password'}   value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          <button>Sign in</button>
          {err && <span>Something went wrong.</span>}
          <p>You don't have an account? <Link to="/register"> Register</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
