import { authenticate } from '../api/unsplash';

export function tokengeturl() {
  if (!localStorage.getItem("token")) {
    authenticate(window.location.search.split("code=")[1]);
  }
}
  
export default tokengeturl;