import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/AuthAction';


const initialState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };
  
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: null
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }

    default:
      return state;
  }
}

export default authReducer;
