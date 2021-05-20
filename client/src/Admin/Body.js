import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./includes/navbar";
import Listings from "./Listing";
import UsersListing from "./UsersListing";
import AffilDashboard from "./AffiliateDashboard";
import AffiliateHistory from "../Affiliate/AffiliateHostory";
import Register from "./Register";
import Statistics from "./Statistics";
import Profile from "../Affiliate/profile";
import EditProfile from "../Affiliate/EditProfile";
class Body extends Component {
  componentWillMount() {}
  componentDidMount() {}

  render() {
    return (
      <div className="">
        <div className="">
          <div>
            <Navbar />
          </div>
          <HashRouter>
            <Switch>
              <Route
                path="/admin/Register"
                name="usersListing Page"
                component={Register}
              />

              <Route
                path="/admin/Statistics"
                name="Statistics Page"
                component={Statistics}
              />

              <Route
                path="/admin/Profile"
                name="Profile Page"
                component={Profile}
              />
              <Route
                path="/admin/EditProfile/:id"
                name="EditProfile Page"
                component={EditProfile}
              />
              <Route
                path="/admin/Listing/:type"
                name="UsersListing Page"
                component={Listings}
              />
              <Route
                path="/admin/AffiliateHistory"
                name="AffiliateHistory Page"
                component={AffiliateHistory}
              />
              <Route
                path="/admin/Affiliat/:id/dashboard"
                name="AffilDashboard Page"
                component={AffilDashboard}
              />
            </Switch>
          </HashRouter>
        </div>
      </div>
    );
  }
}
export default Body;
