import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./staticPages/Login";
import ForgetPassword from "./staticPages/ForgetPassword";
import AdminMain from "./Admin/Main";
import AffiliateMain from "./Affiliate/main";
import Register from "./staticPages/Register";
import ForgetPassEmail from "./staticPages/ForgetPassEmail";

class App extends Component {
  state = {};
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" name="login" component={Login} />
          <Route path="/login" name="login" component={Login} />

          <Route path="/Register" name="Register" component={Register} />
          <Route
            path="/ForgetPassEmail"
            name="ForgetPassEmail"
            component={ForgetPassEmail}
          />
          <Route path="/admin" component={AdminMain} />
          <Route path="/affiliate" component={AffiliateMain} />
          <Route
            exact
            path="/forgetPassword/:token"
            name="Forget Password"
            component={ForgetPassword}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
