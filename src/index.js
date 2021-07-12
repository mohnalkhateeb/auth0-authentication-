import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain=  {process.env.REACT_APP_DOMAIN} //'dev-qjc40gb9.us.auth0.com'
    clientId=  {process.env.REACT_APP_CLIENT_ID} //'rxIXUFO6Ba0vVsgfEJyvS7KiwQniwjug'
    redirectUri={window.location.origin}
    
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
