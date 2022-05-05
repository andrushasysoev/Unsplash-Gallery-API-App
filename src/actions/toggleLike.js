import { unsplashLikePhoto, unsplashUnlikePhoto } from "../api/unsplash";
import { LIKE_PHOTO, UNLIKE_PHOTO } from "../reducers/types";

export function addLikeAction(photo) {
  return {
    type: LIKE_PHOTO,
    id: photo.id,
    likes: photo.likes,
  }
}

export function unLikeAction(photo) {
  return {
    type: UNLIKE_PHOTO,
    id: photo.id,
    likes: photo.likes,
  }
}

export function toggleLike(photo, id) {

  return function(dispatch) {

    if (photo.liked_by_user) {
      unsplashUnlikePhoto(id)
        .then(json => dispatch(unLikeAction(json.photo))
      );
    } else {
      unsplashLikePhoto(id)
        .then(json => dispatch(addLikeAction(json.photo))
      );
    }
  }
}