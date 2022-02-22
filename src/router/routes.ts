import React from "react";
import {HomePage, NewsPage} from "../pages";


interface IRoute {
  path: '/' | '/login' | '/news'
  exact?: boolean,
  component: React.ComponentType
}

export const publicRoutes: IRoute[] = [
  { path: '/', exact: true, component: HomePage },
  { path: '/news', exact: true, component: NewsPage }
]

export const privateRoutes: IRoute[] = [
  { path: '/', exact: true, component: HomePage },
  { path: '/news', exact: true, component: NewsPage }
]
