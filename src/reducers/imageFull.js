import { GET_PHOTO, LIKE_PHOTO, UNLIKE_PHOTO } from "./types";

export function photoFullReducer(state = { links: {}, user: {}, urls: {} }, action) {

  switch (action.type) {
    case GET_PHOTO:
      return action.photo;

    case LIKE_PHOTO:
      return {...state, likes: action.likes, liked_by_user: true}

    case UNLIKE_PHOTO:
      return {...state, likes: action.likes, liked_by_user: false}
          
    default:
      return state;
  }
};