import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  const [ users, setUsers ] = useState([]);
  const history = useHistory();

  const getUsers = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  };

  const logout = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/auth/logout')
      .then(res => {
        console.log(res);
        localStorage.removeItem('token');
        history.push('/login');
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, [])
  
  return (
    <div className='dashboard'>
      <button onClick={logout}>Log Out</button>
      {
        users.map((user, index) => {
          return <div key={index} >
            <h2>ID: {user.id}</h2>
            <h2>USERNAME: {user.username}</h2>
          </div>
        })
      }
    </div>
  )
}

export default Dashboard;