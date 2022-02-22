import {AppDispatch} from "../../index";
import axios from "axios";
import {IUser} from "../../../models/IUser";
import {
  AuthActionTypes,
  SetAuthAction,
  SetErrorAction,
  SetIsAdminAction,
  SetLoadingAction,
  SetUserAction
} from "./types";

export const authActionCreators = {
  setAuth: (payload: boolean): SetAuthAction => ({ type: AuthActionTypes.SET_AUTH, payload }),
  setLoadingAuth: (payload: boolean): SetLoadingAction => ({ type: AuthActionTypes.SET_LOADING_AUTH, payload }),
  setIsAdmin: (payload: boolean): SetIsAdminAction => ({ type: AuthActionTypes.SET_IS_ADMIN, payload }),
  setErrorAuth: (payload: string | null): SetErrorAction => ({ type: AuthActionTypes.SET_ERROR_AUTH, payload }),
  setUser: (payload: IUser | null): SetUserAction => ({ type: AuthActionTypes.SET_USER, payload }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authActionCreators.setLoadingAuth(true))
      const { data } = await axios.get<IUser[]>('./users.json');
      const mockUser = data.find(user => {
        return username === user.username && password === user.password
      })

      if (mockUser) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', mockUser.username);

        dispatch(authActionCreators.setUser(mockUser))
        dispatch(authActionCreators.setAuth(true))

        if (mockUser.isAdmin) {
          dispatch(authActionCreators.setIsAdmin(true))
          localStorage.setItem('isAdmin', `${mockUser.isAdmin}`);
        }

      } else {
        dispatch(authActionCreators.setErrorAuth('Неверный логин или пароль'))
      }
      dispatch(authActionCreators.setLoadingAuth(false))
      dispatch(authActionCreators.setErrorAuth(null))
    } catch (err) {
      dispatch(authActionCreators.setErrorAuth('Произошла ошибка при авторизации'))
      dispatch(authActionCreators.setLoadingAuth(false))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    dispatch(authActionCreators.setUser(null))
    dispatch(authActionCreators.setAuth(false))
    dispatch(authActionCreators.setIsAdmin(false))
  }
}
