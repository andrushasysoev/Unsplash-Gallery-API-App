import Unsplash, { toJson } from 'unsplash-js';

export const unsplash = new Unsplash({
  accessKey: "frD62dW2dbll3h1oJ11jr7SSp1rznaAMb_9pR2FPruM",
  secret: "PK8_m_E7fzVY3EOkEwAgO4O-_vicvXLrdifS1VK5N4w",
  callbackUrl: "http://localhost:5000/photos",
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes",
]);


export const userAccessToken = (OAUTH_CODE) => {
  unsplash.auth
    .userAuthentication(OAUTH_CODE)
    .then(toJson)
    .then((json) => {
      unsplash.auth.setBearerToken(json.access_token);
      localStorage.setItem("token", json.access_token);
     })
    .catch(err => console.log('Auth err', err));
};


export const unsplashGetUser = (token) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.currentUser.profile().then(toJson);
};

export const unsplashLoadPhotos = (page = 1, token, perPage = 10) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.listPhotos(page, perPage, "latest").then(toJson);
};

export const unsplashGetPhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.getPhoto(id).then(toJson);
};

export const unsplashLikePhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.likePhoto(id).then(toJson);
};

export const unsplashUnlikePhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.unlikePhoto(id).then(toJson);
};

export default unsplash;
