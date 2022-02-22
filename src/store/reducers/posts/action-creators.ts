import {IPost} from "../../../models/IPost";
import {AppDispatch, RootState} from "../../index";
import {mockPosts} from "../../../mockData/mockPosts";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import {
  PostsActionTypes,
  SetAddingAction,
  SetAddPostErrorAction,
  SetErrorAction,
  SetLoadingAction,
  SetPostsAction
} from "./types";

export const postsActionCreators = {
  setLoadingPosts: (payload: boolean): SetLoadingAction => ({ type: PostsActionTypes.SET_LOADING_POSTS, payload }),
  setIsAddingPost: (payload: boolean): SetAddingAction => ({ type: PostsActionTypes.SET_ADDING_POST, payload }),
  setPosts: (payload: IPost[]): SetPostsAction => ({ type: PostsActionTypes.SET_POSTS, payload }),
  setErrorPosts: (payload: string): SetErrorAction => ({ type: PostsActionTypes.SET_ERROR_POSTS, payload }),
  setAddPostError: (payload: string | null): SetAddPostErrorAction => ({ type: PostsActionTypes.SET_ADD_POST_ERROR, payload }),
  getPosts: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(postsActionCreators.setLoadingPosts(true))
      // get запрос
      const data = JSON.parse(localStorage.getItem('posts') as string) as IPost[] || mockPosts;

      dispatch(postsActionCreators.setPosts(data))
      dispatch(postsActionCreators.setLoadingPosts(false))
    } catch (err) {
      dispatch(postsActionCreators.setErrorPosts('Произошла ошибка при загрузке данных'))
      dispatch(postsActionCreators.setLoadingPosts(false))
    }
  },
  search: (value: string) => async (dispatch: AppDispatch) => {
    dispatch(postsActionCreators.setLoadingPosts(true))

    // должен происходить запрос на сервер c search параметром

    const filteredData = mockPosts.filter(item => {
      return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    });

    dispatch(postsActionCreators.setPosts(filteredData))

    dispatch(postsActionCreators.setLoadingPosts(false))
  },
  approvePost: (id: string | number) => async (dispatch: AppDispatch) => {
    dispatch(postsActionCreators.setLoadingPosts(true))

    // должен происходить запрос на сервер для изменения элемента

    const posts = JSON.parse(localStorage.getItem('posts') as string) as IPost[] || mockPosts

    const editedData = posts.map(item => {
      if (item.id === id) {
        return { ...item, approved: true }
      }
      return item;
    });
    localStorage.setItem('posts', JSON.stringify(editedData))
    dispatch(postsActionCreators.setPosts(editedData))
    dispatch(postsActionCreators.setLoadingPosts(false))
  },
  removePost: (id: string | number) => async (dispatch: AppDispatch) => {
    dispatch(postsActionCreators.setLoadingPosts(true))

    // должен происходить запрос на сервер для удаления элемента
    const posts = JSON.parse(localStorage.getItem('posts') as string) as IPost[] || mockPosts

    const filteredData = posts.filter(item => item.id !== id);

    dispatch(postsActionCreators.setPosts(filteredData))

    // устанавливаем посты через localStorage чтобы при ререндере
    // компонента с постами эти посты оставались удаленными (типа удаленными с сервера)

    localStorage.setItem('posts', JSON.stringify(filteredData))
    dispatch(postsActionCreators.setLoadingPosts(false))
  },
  addPost: (name: string, text: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(postsActionCreators.setIsAddingPost(true))

    const state = getState()

    try {
      const posts = JSON.parse(localStorage.getItem('posts') as string) as IPost[] || mockPosts

      // должен происходить запрос на сервер для добавления элемента
      const newPost = {
        name,
        text,
        id: uuidv4(),
        date: moment().format(),
        approved: !!state.auth.isAdmin
      }

      const newData = [...posts, newPost];

      dispatch(postsActionCreators.setPosts(newData))

      // устанавливаем посты через localStorage чтобы при ререндере
      // компонента с постами эти посты оставались удаленными (типа удаленными с сервера)

      localStorage.setItem('posts', JSON.stringify(newData))
      dispatch(postsActionCreators.setIsAddingPost(false))
      dispatch(postsActionCreators.setAddPostError(null))
    } catch (e) {
      dispatch(postsActionCreators.setAddPostError('Не удалось добавить пост'))
      dispatch(postsActionCreators.setIsAddingPost(false))
    }
  }
}
