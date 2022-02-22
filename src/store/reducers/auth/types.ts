import {IUser} from "../../../models/IUser";

export interface AuthState {
  isAuth: boolean
  isLoading: boolean
  hasError: string | null
  user: IUser | null
  isAdmin: boolean | string
}

export enum AuthActionTypes {
  SET_AUTH = 'SET_AUTH',
  SET_LOADING_AUTH = 'SET_LOADING_AUTH',
  SET_USER = 'SET_USER',
  SET_ERROR_AUTH = 'SET_ERROR_AUTH',
  SET_IS_ADMIN = 'SET_IS_ADMIN'
}

export interface SetLoadingAction {
  type: AuthActionTypes.SET_LOADING_AUTH,
  payload: boolean
}

export interface SetAuthAction {
  type: AuthActionTypes.SET_AUTH,
  payload: boolean
}

export interface SetErrorAction {
  type: AuthActionTypes.SET_ERROR_AUTH,
  payload: string | null
}

export interface SetUserAction {
  type: AuthActionTypes.SET_USER,
  payload: IUser | null
}

export interface SetIsAdminAction {
  type: AuthActionTypes.SET_IS_ADMIN,
  payload: boolean
}

export type AuthAction =
  SetAuthAction
  | SetLoadingAction
  | SetErrorAction
  | SetUserAction
  | SetIsAdminAction

