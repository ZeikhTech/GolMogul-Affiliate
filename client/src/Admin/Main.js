import React, { Component } from "react";
import Header from "./includes/header";
import Footer from "./includes/footer";
import Body from "./Body";

import { Link, Redirect } from "react-router-dom";

class Main extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("accessToken"));
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user) {
      if (user.role) {
        var role = user.role;
        var email = user.email.address ? user.email.address : "";
        var isVerified = user.email.isVerified;
        if (user.avatar) {
          // console.log("user", user.avatar);

          var avatar = user.avatar;
          var str = avatar;
          var n = str.includes("uploads/");
          if (n) {
            avatar = window.APIURL + avatar;
          }
        }
      }
    } else {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default Main;
