import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


const Login = () => {
  const history = useHistory();

  const [ credentials, setCredentials ] = useState({
    username: '',
    password: ''
  });

  const handleInput = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/auth/login', credentials)
      .then(res => {
        console.log('POST request for login', res);
        localStorage.setItem('token', res.data.token);
        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err.response);
        alert('Login Failed')
      });

    setCredentials({
      username: '',
      Password: ''
    })
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>

        <label>
          <input 
            type='text'
            name='username'
            value={credentials.username}
            onChange={handleInput}
            placeholder='Username'
          />
        </label>

        <label>
          <input 
            type='password'
            name='password'
            value={credentials.password}
            onChange={handleInput}
            placeholder='Password'
          />
        </label>

        <button onSubmit={handleSubmit}>Log In</button>
      </form>
      
      <h3>Don't have an account? <Link to='/'>Sign up</Link></h3>
    </div>
  )
};

export default Login;