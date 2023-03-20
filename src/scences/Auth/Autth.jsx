import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../actions/AuthAction';
import FormData from'form-data'
import axios from 'axios'

const LoginPage = ({ loginRequest, loginSuccess, loginFailure, errorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    var data = new FormData();
    data.append('username',username );
    data.append('password',password);
    
  
    // loginRequest();
  
    var config = {
      method: 'post',
      url: 'http://localhost:5000/user/login',
     
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}
// const mapStateToProps = state => {
//   const isAuthenticated = state.auth.isAuthenticated;
//   return {
//     isAuthenticated
//   };}

export default connect(null, { loginRequest, loginSuccess, loginFailure })(LoginPage);
