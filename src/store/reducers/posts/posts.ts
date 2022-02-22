import {PostsAction, PostsActionTypes, PostsState} from "./types";

const initialState: PostsState = {
  data: JSON.parse(localStorage.getItem('posts') as string) || [],
  isLoading: false,
  hasError: null,
  hasAddPostError: null,
  isAdding: null,
}

export default function postsReducer (state = initialState, action: PostsAction) {
  switch (action.type) {
    case PostsActionTypes.SET_LOADING_POSTS: return { ...state, isLoading: action.payload }
    case PostsActionTypes.SET_POSTS: return { ...state, data: action.payload }
    case PostsActionTypes.SET_ERROR_POSTS: return { ...state, hasError: action.payload }
    case PostsActionTypes.SET_ADD_POST_ERROR: return { ...state, hasAddPostError: action.payload }
    case PostsActionTypes.SET_ADDING_POST: return { ...state, isAdding: action.payload }
    default:
      return state;
  }
}
