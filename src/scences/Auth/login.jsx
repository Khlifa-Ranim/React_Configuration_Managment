import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignInUser, logout, addUser } from "../../redux/UserSlices/AuthSlice";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // added state variables
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); //this ligne permet de n'est pas reload the page when i click on the button
    setShowPassword(!showPassword);
  };

  const isAuthenticated = useSelector(
    (state) => state.AuthStore.isAuthenticated
  );
  console.log(isAuthenticated);
  const navigate = useNavigate();

  const notify = () => {
    toast(" LOGIN Succès 👌");
  };
  const LoginHandle = () => {
    setFromErrors(validate(username, password));
    setIsSubmit(true);

    if (
      Object.keys(formErrors).length === 0 &&
      username.trim() !== "" &&
      password.trim() !== ""
    ) {
      console.log(username, password);
      dispatch(SignInUser({ username, password }));
      // setTimeout(() => navigate("/dashboard"), 100); // redirect after 3 seconds
      dispatch(addUser());
      notify(); // display toast notification
      setTimeout(() => navigate("/dashboard"), 100); // redirect after 3 seconds
    }
  };

  const validate = (username, password) => {
    const errors = {};
    const usernamePattern = /^[a-zA-Z]{3,50}$/; // pattern to check if username only contains letters and is between 3 to 50 characters long
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/; // pattern to check if password has at least one uppercase, one lowercase, one digit, one special character, and is between 8 to 50 characters long

    if (!username) {
      errors.username = "Le nom d'utilisateur est requis.";
    } 
    // else if (!usernamePattern.test(username)) {
    //   errors.username = "Les noms d'utilisateur doivent comporter entre 3 et 50 caractères et ne peuvent contenir que des lettres.";
    // }

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

  return (
    <div className="body">
      <div className="MainContainer">
        <h2 className="WelcomeText">welcome to Login</h2>
        <div className="InputContainer">
          <label>Username:</label>

          <div style={{ position: "relative", display: "inline-block" }}>
            <input
              className="Input"
              type="text"
              placeholder="Enter Your Name"
              value={username}
              onChange={(e) => {
                const { name, value } = e.target;
                setUsername(value);
                setFromErrors({ ...formErrors, [name]: value });
              }}
              style={{ paddingRight: "40px" }}
            />
          </div>

          <p
            style={{
              color: "black",
              fontSize: "10px",
              fontWeight: "bold",
              fontFamily: "Arial",
              marginLeft: "12px",
              textTransform: "none",
            }}
          >
            {formErrors.username}
          </p>

          <label>Password:</label>
          <div className="InputWithButton">
            <input
              className="Input"
              type={showPassword ? "text" : "password"}
              placeholder="Entrer Votre Password"
              value={password}
              onChange={(e) => {
                const { name, value } = e.target;
                setPassword(value);
                setFromErrors({ ...formErrors, [name]: value });
              }}
            />
            <RemoveRedEyeIcon
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
              onClick={togglePasswordVisibility}
            />
            <p
              style={{
                color: "read",
                fontSize: "10px",
                fontWeight: "bold",
                fontFamily: "Arial",
                marginLeft: "12px",
              }}
            >
              {formErrors.password}
            </p>
          </div>
        </div>

        <div className="InputContainer"></div>
        <div className="HorizontalRule"></div>

        <div className="ButtonContainer">
          <button className="Button" onClick={LoginHandle} type="submit">
            Login
          </button>
        </div>
        {/* <button  onClick={LogoutHandle} type="submit">Logout</button> */}
      </div>
    </div>
    // <form className="form card" onSubmit={LoginHandle}>
    //   <div className="card_header">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       width="24"
    //       height="24"
    //     >
    //       <path fill="none" d="M0 0h24v24H0z"></path>
    //       <path
    //         fill="currentColor"
    //         d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
    //       ></path>
    //     </svg>
    //     <h1 className="form_heading">Sign in</h1>
    //   </div>
    //   <div className="field">
    //     <label htmlFor="username">Username</label>
    //     <input
    //       className="input"
    //       placeholder="Username"
    //       type="text"
    //       value={username}
    //       onChange={(e) => {
    //         const { name, value } = e.target;
    //         setUsername(value);
    //         setFromErrors({ ...formErrors, [name]: value });
    //       }}
    //     />

    //     <p
    //       style={{
    //         color: "black",
    //         fontSize: "10px",
    //         fontWeight: "bold",
    //         fontFamily: "Arial",
    //         marginLeft: "12px",
    //         textTransform: "none",
    //       }}
    //     >
    //       {formErrors.username}
    //     </p>
    //   </div>
    //   <div className="field">
    //     <label htmlFor="password">Password</label>
    //     <input
    //       className="input"
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => {
    //         const { name, value } = e.target;
    //         setPassword(value);
    //         setFromErrors({ ...formErrors, [name]: value });
    //       }}
    //     />

    //     <p
    //       style={{
    //         color: "black",
    //         fontSize: "10px",
    //         fontWeight: "bold",
    //         fontFamily: "Arial",
    //         marginLeft: "12px",
    //       }}
    //     >
    //       {formErrors.password}
    //     </p>
    //   </div>
    //   <div className="field">
    //     <button className="button">
    //       Login
    //     </button>
    //   </div>
    // </form>
  );
}

export default Login;
