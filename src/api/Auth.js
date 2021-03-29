import React from "react";

import { authenticationUrl } from "./unsplash";

class Auth extends React.Component {
  componentDidMount() {
    window.location.assign(authenticationUrl);
  }

  render() {
    return <div />;
  }
}

export default Auth;
