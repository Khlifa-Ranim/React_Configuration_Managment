import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignInUser, logout,addUser } from "../../redux/UserSlices/AuthSlice";
import styled from "styled-components";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [formErrors,setFromErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);

  const isAuthenticated = useSelector((state) => state.AuthStore.isAuthenticated);
  console.log(isAuthenticated);
  const navigate=useNavigate();

  const notify=()=>{
    toast(" LOGIN Succès 👌")
   }
  const LoginHandle = () => {

    setFromErrors(validate(username, password));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && username.trim() !== '' && password.trim() !== '') {

    console.log(username, password);
    dispatch(SignInUser({ username, password }));
    dispatch(addUser());
    notify(); // display toast notification
    setTimeout(() => navigate("/dashboard"), 100); // redirect after 3 seconds


  };
  }

  
  const validate = (username, password) => {
    const errors = {};
    const usernamePattern = /^[a-zA-Z]{3,50}$/; // pattern to check if username only contains letters and is between 3 to 50 characters long
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/; // pattern to check if password has at least one uppercase, one lowercase, one digit, one special character, and is between 8 to 50 characters long
  
    if (!username) {
      errors.username = "Le nom d'utilisateur est requis.";
    } else if (!usernamePattern.test(username)) {
      errors.username = "Les noms d'utilisateur doivent comporter entre 3 et 50 caractères et ne peuvent contenir que des lettres.";
    }
  
    if (!password) {
      errors.password = "Le mot de passe est requis.";
    } 
    // else if (!passwordPattern.test(password)) {
    //   errors.password = "Les mots de passe doivent comporter entre 8 et 50 caractères et doivent inclure au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial tel que !@#$%^&*.";
    // }
  
    return errors;
  };
  

useEffect(() => {
  if (Object.keys(formErrors).length > 0 && isSubmit) {
    console.log(formErrors);
  }
}, [formErrors, isSubmit]);

  const LogoutHandle = () => {
    dispatch(logout);
  };
  return (
    <div className="body">
      <div className="MainContainer">
        <h2 className="WelcomeText">welcome to Login</h2>
        <div className="InputContainer">
          <label>Username:</label>
          <input
            className="Input"
            type="text"
            placeholder="Entrer Votre Nom"
            value={username}
            onChange={(e) => {
              const { name, value } = e.target;
              setUsername(value);
              setFromErrors({...formErrors, [name]: value});
            }}         
             />
           <p style={{color: "black", fontSize: "10px", fontWeight: "bold",fontFamily: "Arial",marginLeft:"12px",textTransform: "none"}}>{formErrors.username}</p>

          <label>Password:</label>
          <input
            className="Input"
            type="password"
            placeholder="Entrer Votre Password"

            value={password}
            onChange={(e) => {
              const { name, value } = e.target;
              setPassword(value);
              setFromErrors({...formErrors, [name]: value});
            }}/>
       <p style={{color: "black", fontSize: "10px", fontWeight: "bold",fontFamily: "Arial",marginLeft:"12px"}}>{formErrors.password}</p>

        </div>

        <div className="InputContainer">
        </div>
        <div className="HorizontalRule"></div>

        <div className="ButtonContainer">
          <button className="Button" onClick={LoginHandle} type="submit">
            Login
          </button>
        </div>
        {/* <button  onClick={LogoutHandle} type="submit">Logout</button> */}

      </div>
    </div>
  );
}

export default Login;
