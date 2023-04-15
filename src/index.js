




// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css'; 
// import App from './App';
// import {BrowserRouter}from"react-router-dom";
// import { Provider} from 'react-redux';
// import store from "./redux-store/store"
// import { AuthProvider } from "react-auth-kit";
// import Cookies from 'js-cookie';


// // Check if there's an existing token in the cookie and set it as the default token
// const defaultToken = Cookies.get('token');

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <AuthProvider
//       authType={"cookie"}
//       authName={"token"}
//       cookieDomain={window.location.hostname}
//       cookieSecure={false}
//       defaultToken={defaultToken}
//       // Set the token in the cookie when it changes
//       onTokenChange={(token) => Cookies.set('token', token)}
//       // isAuthenticated={isAuthenticated}
//     >
//       <React.StrictMode>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </React.StrictMode>
//     </AuthProvider>
//   </Provider>,
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
import {BrowserRouter}from"react-router-dom";
import { Provider} from 'react-redux';
import store from "./store"




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider  store={store}>
  
      <React.StrictMode>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </React.StrictMode>
  
  </Provider>,
);