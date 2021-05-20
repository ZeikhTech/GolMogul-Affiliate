import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
window.loginExpiresAfter = 1440;

// window.APPURL = "http://localhost:3000/";
// window.APIURL = "http://localhost:8081/";

window.APPURL = "https://goalmogul-affiliate.herokuapp.com/";
window.APIURL = "https://goalmogul-affiliate.herokuapp.com/";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
