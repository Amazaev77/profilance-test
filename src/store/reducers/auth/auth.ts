import {AuthAction, AuthActionTypes, AuthState} from "./types";

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  hasError: null,
  user: null,
  isAdmin: localStorage.getItem('isAdmin') as string,
}

export default function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH: return { ...state, isAuth: action.payload }
    case AuthActionTypes.SET_LOADING_AUTH: return { ...state, isLoading: action.payload }
    case AuthActionTypes.SET_ERROR_AUTH: return { ...state, hasError: action.payload }
    case AuthActionTypes.SET_USER: return { ...state, user: action.payload }
    case AuthActionTypes.SET_IS_ADMIN: return { ...state, isAdmin: action.payload }
    default:
      return state;
  }
}
