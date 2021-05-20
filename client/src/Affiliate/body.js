import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./includes/navbar";
import EditProfile from "./EditProfile";
import Profile from "./profile";
import AddBankDetails from "./AddBankDetails";
import AffiliateHistory from "./AffiliateHostory";
import Dashboard from "./Dashboard";

class Body extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}
  componentDidMount() {}

  render() {
    const userId = localStorage.getItem("userId");
    return (
      <div className="">
        <div className="">
          <div className="">
            <Navbar />
          </div>
          <HashRouter>
            <Switch>
              <Route path="/sas" name="Profile Page" component={Profile} />
              <Route
                exact
                path="/affiliate/Profile"
                name="Profile Page"
                component={Profile}
              />
              <Route
                exact
                path="/affiliate/EditProfile/:id"
                name="EditProfile Page"
                component={EditProfile}
              />
              <Route
                exact
                path="/affiliate/AddBankDetails"
                name="AddBankDetails Page"
                component={AddBankDetails}
              />
              <Route
                exact
                path="/affiliate/AffiliateHistory/:id"
                name="AffiliateHistory Page"
                component={AffiliateHistory}
              />
              <Route
                exact
                path="/affiliate/Dashboard/:id"
                name="Dashboard Page"
                component={Dashboard}
              />
            </Switch>
          </HashRouter>
        </div>
      </div>
    );
  }
}
export default Body;
