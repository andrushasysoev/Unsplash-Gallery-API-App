import { GET_PHOTOS, LIKE_PHOTO, UNLIKE_PHOTO } from "./types";

export function photosReducer(state = {photos: []}, action) {	

	switch (action.type) {
		case GET_PHOTOS:
		  return {
			  ...state,
			  photos: [...state.photos, ...action.photos],
			};

		case LIKE_PHOTO:
		  let likesOnPhotos = state.photos.map((photo) => {
			if (photo.id === action.id) {
			  photo.likes = action.likes;
			  photo.liked_by_user = true;
			}
			return photo;
		  });
		  return {...state, photos: likesOnPhotos}
	  
		case UNLIKE_PHOTO:
		  let unlikesOnPhotos = state.photos.map((photo) => {	
			if (photo.id === action.id) {
			  photo.likes = action.likes;
			  photo.liked_by_user = false;
			}
			return photo;
		  });
		  return {...state, photos: unlikesOnPhotos}

		default:
		  return state;
	}
};