import Unsplash, { toJson } from 'unsplash-js';

let ACCESS_KEY = "frD62dW2dbll3h1oJ11jr7SSp1rznaAMb_9pR2FPruM",
    SECRET_KEY = "PK8_m_E7fzVY3EOkEwAgO4O-_vicvXLrdifS1VK5N4w",
    BEARER_TOKEN = '';

export const unsplash = new Unsplash({
  accessKey: ACCESS_KEY,
  secret: SECRET_KEY,
  callbackUrl: "http://localhost:8080/photos"
});


export function authenticate() {

  BEARER_TOKEN = localStorage.getItem("bearerToken");

  if (!BEARER_TOKEN) {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      "public",
      "write_likes",
    ]);

    const queryStr = window.location.toString();

    if (!queryStr.split('?code=')[1]) {
      window.location.assign(authenticationUrl);
    } else {
      unsplash.auth.userAuthentication(queryStr.split('?code=')[1])
        .then(toJson)
        .then(json => {
          unsplash.auth.setBearerToken(json.access_token);
          localStorage.setItem("bearerToken", json.access_token);
        })
        .catch(err => console.log('Auth err', err));
    }
  }
}

export default authenticate;


export const unsplashGetUser = () => {
 
  return unsplash.currentUser.profile().then(toJson);
};

export const unsplashLoadPhotos = (page = 1, perPage = 10) => {

  return unsplash.photos.listPhotos(page, perPage, "latest").then(toJson);
};

export const unsplashGetPhoto = (id) => {

  return unsplash.photos.getPhoto(id).then(toJson);
};

export const unsplashLikePhoto = (id) => {

  return unsplash.photos.likePhoto(id).then(toJson);
};

export const unsplashUnlikePhoto = (id) => {

  return unsplash.photos.unlikePhoto(id).then(toJson);
};
