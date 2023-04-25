import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import style from "./Login.module.css";


const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
 

  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      //Create user

    //   createUserWithEmailAndPassword(auth, email, password)
        
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res.user);
        setLoading(true);
        navigate('/login',{state:{email:email,password:password}})
     
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className={style.formContainer}>
    <div className={style.formWrapper}>
      <span className={style.logo}>ToDo List</span>
      <span className={style.title}>Register</span>
        <form onSubmit={handleSubmit}>
          {/* <input required type="text" placeholder="username" /> */}
          <input required type="email" placeholder="email"  />
          <input required type="password" placeholder="password"  />
          <button disabled={loading}>Sign up</button>
          {loading && "SignIn please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
