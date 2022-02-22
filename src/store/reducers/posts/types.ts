import { IPost } from "../../../models/IPost";


export interface PostsState {
  data: IPost[],
  isLoading: boolean,
  hasError: string | null,
  hasAddPostError: string | null,
  isAdding: boolean | null
}

export enum PostsActionTypes {
  SET_LOADING_POSTS = 'SET_LOADING_POSTS',
  SET_POSTS = 'SET_POSTS',
  SET_ERROR_POSTS = 'SET_ERROR_POSTS',
  SET_ADDING_POST = 'SET_ADDING_POST',
  SET_ADD_POST_ERROR = 'SET_ADD_POST_ERROR',
}

export interface SetLoadingAction {
  type: PostsActionTypes.SET_LOADING_POSTS,
  payload: boolean
}

export interface SetAddingAction {
  type: PostsActionTypes.SET_ADDING_POST,
  payload: boolean
}

export interface SetPostsAction {
  type: PostsActionTypes.SET_POSTS,
  payload: IPost[]
}

export interface SetErrorAction {
  type: PostsActionTypes.SET_ERROR_POSTS,
  payload: string
}

export interface SetAddPostErrorAction {
  type: PostsActionTypes.SET_ADD_POST_ERROR,
  payload: string | null
}

export type PostsAction =
  SetLoadingAction
  | SetPostsAction
  | SetErrorAction
  | SetAddingAction
  | SetAddPostErrorAction
