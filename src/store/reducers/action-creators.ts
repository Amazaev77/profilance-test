import {postsActionCreators} from "./posts";
import {authActionCreators} from "./auth";

export const allActionCreators = {
  ...postsActionCreators,
  ...authActionCreators,
}
