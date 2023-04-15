
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import "./Auth.css"
// import styled from "styled-components";
// import Input from '../../components/Input'
// import { connect } from 'react-redux';
// import { loginRequest, loginSuccess, loginFailure } from '../../actions/AuthAction';
// import FormData from 'form-data';
// import axios from 'axios';
// import { useSignIn,useAuthUser  } from 'react-auth-kit';
// import Cookies from 'js-cookie';


// const LoginPage = ({ loginRequest, loginSuccess, loginFailure}) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const signIn = useSignIn();
//   // const token = useAuthHeader ();

//   // const token = useSelector((state) => {
//   //   console.log(state); // log the entire state object to check the value of isAuthenticated
//   //   return state.authReducer.isAuthenticated;
//   // });
//   const auth = useAuthUser();

//   const token = Cookies.get("token");
//   const isAuthenticated =
//     auth() &&
//     auth().isLoggedIn &&
//     token;
//   console.log("isAuthenticated:", isAuthenticated);
//   console.log("auth:", auth());
  


//   Cookies.set("token", token);
//   console.log("Cookies:", Cookies.get("token"));
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append('username', username);
//     data.append('password', password);

//     const config = {
//       method: 'post',
//       url: 'http://localhost:5000/user/login',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       withCredentials: true,
//       data: data
//     };

//     axios(config)
//       .then(function (response) {
//         const { token, user } = response.data;
//         signIn({
//           token: token,
//           expiresIn: 3600,
//           tokenType:"Bearer",
//           authState:{username :username}
//         });

//         //loginSuccess(user);
//         loginSuccess({
//           user: user,
//           token: token,
//         });
//       console.log(token)

//       })


//       .catch(function (error) {
//         loginFailure(error.message);
//       });
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.authReducer?.isAuthenticated,
// });


// export default connect(mapStateToProps, { loginRequest, loginSuccess, loginFailure })(LoginPage);







// // import React, { useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import "./Auth.css"
// // import styled from "styled-components";
// // import Input from '../../components/Input'
// // import { connect } from 'react-redux';
// // import { loginRequest, loginSuccess, loginFailure } from '../../actions/AuthAction';
// // import FormData from 'form-data';
// // import axios from 'axios';
// // import { useSignIn,useAuthUser  } from 'react-auth-kit';
// // import Cookies from 'js-cookie';


// // const LoginPage = ({ loginRequest, loginSuccess, loginFailure}) => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const signIn = useSignIn();
// //   // const token = useAuthHeader ();

// //   // const token = useSelector((state) => {
// //   //   console.log(state); // log the entire state object to check the value of isAuthenticated
// //   //   return state.authReducer.isAuthenticated;
// //   // });
// //   const auth = useAuthUser();

// //   const token = Cookies.get("token");
// //   const isAuthenticated =
// //     auth() &&
// //     auth().isLoggedIn &&
// //     token;
// //   console.log("isAuthenticated:", isAuthenticated);
// //   console.log("auth:", auth());
  


// //   Cookies.set("token", token);
// //   console.log("Cookies:", Cookies.get("token"));

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const data = new FormData();
// //     data.append('username', username);
// //     data.append('password', password);

// //     const config = {
// //       method: 'post',
// //       url: 'http://localhost:5000/user/login',
// //       headers: { 
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${isAuthenticated}`
// //       },
// //       withCredentials: true,
// //       data: data
// //     };

// //     axios(config)
// //   .then(function (response) {
// //     const { token, user } = response.data;
// //     signIn({
// //       token: token,
// //       expiresIn: 3600,
// //       tokenType:"Bearer",
// //       authState:{username :username}
// //     });

// //     //loginSuccess(user);
// //     loginSuccess({
// //       user: user,
// //       token: token,
// //     });
// //     console.log(token);
// //     Cookies.set("token", token); // set the token value after receiving a valid token from the server
// //   })
// //   .catch(function (error) {
// //     loginFailure(error.message);
// //   });
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Username:</label>
// //           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
// //         </div>
// //         <div>
// //           <label>Password:</label>
// //           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
// //         </div>
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // const mapStateToProps = (state) => ({
// //   isAuthenticated: state.authReducer?.isAuthenticated,
// // });

// // export default connect( mapStateToProps,{ loginRequest, loginSuccess, loginFailure })(LoginPage);







