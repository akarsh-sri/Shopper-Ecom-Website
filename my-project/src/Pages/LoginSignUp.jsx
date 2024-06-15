import React from 'react'
import './CSS/LoginSignUp.css'
import { useState } from 'react'

const LoginSignUp = () => {

  const [st, setst] = useState("Login");
  const [form, setform] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changeHandler = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  const login = async () => {
    // console.log("login");
    let resData;
    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }).then((res) => res.json()).then((data) => resData = data);

    if (resData.success) {
      localStorage.setItem('auth-token', resData.token);
      window.location.replace('/');
    } else {
      alert(resData.error);
    }
  }

  const signup = async () => {
    // console.log("signup");
    let resData;
    await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }).then((res) => res.json()).then((data) => resData = data);

    if (resData.success) {
      localStorage.setItem('auth-token', resData.token);
      window.location.replace('/');
    } else {
      alert(resData.error);
    }

  }

  return (
    <div className='loginsignup'>
      <div className="loginsignupcontainer">
        <h1>{st}</h1>
        <div className="field">
          {st === "Sign Up" ? <input type="text" onChange={changeHandler} value={form.username} name='username' placeholder='Your Name' /> : <></>}
          <input type="email" onChange={changeHandler} value={form.email} name='email' placeholder='Email Address' />
          <input type="password" onChange={changeHandler} value={form.password} name='password' placeholder='Password' />
        </div>
        <button onClick={() => st === "Login" ? login() : signup()}>Continue</button>
        {st === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span className='cursor-pointer' onClick={() => { setst("Login") }}>Login</span></p> : <p className='loginsignup-login'>Create an Account? <span className='cursor-pointer' onClick={() => { setst("Sign Up") }}>Click Here</span></p>}
        <div className="agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing , I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignUp