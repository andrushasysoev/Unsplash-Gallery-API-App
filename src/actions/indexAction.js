import { GET_PHOTOS, GET_USERNAME, GET_PHOTO } from "../reducers/types";

export function getPhotos(photos) {
  return {
    type: GET_PHOTOS,
    photos,
  };
};

export function getUserInfo(user) {
  return {
    type: GET_USERNAME,
    user,
  };
};

export function getPhoto(photo) {
  return {
    type: GET_PHOTO,
    photo,
  };
};