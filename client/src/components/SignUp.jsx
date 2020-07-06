import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const history = useHistory();

  const [user, setUser ] = useState({
    username: '',
    password: '',
  })

  const handleInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/auth/register', user)
      .then(res => {
        console.log('POST request for signup', res);
        history.push('/login');
      })
      .catch(err => {
        console.log(err.response);
        alert('Sign Up Failed')
      });

    setUser({
      username: '',
      password: '',
    })
  }

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>

        <label>
          <input 
            type='text'
            name='username'
            value={user.username}
            onChange={handleInput}
            placeholder='Username'
          />
        </label>

        <label>
          <input 
            type='password'
            name='password'
            value={user.password}
            onChange={handleInput}
            placeholder='Password'
          />
        </label>

        <button onSubmit={handleSubmit}>Sign Up</button>
      </form>

      <h3>Have an account? <Link to='/login'>Log in</Link></h3>
    </div>
  )
}

export default SignUp;