import React, { Component } from "react";
import $ from "jquery";
import { withRouter, Redirect, Link } from "react-router-dom";

import Notifications, { notify } from "react-notify-toast";
import Navbar from "../Admin/includes/navbar";
import apiHelper from "../Admin/Helper/ApiHelper";
import loaderImage from "../Admin/images/loader.svg";
class Login extends Component {
  stateInitial = {
    email: { address: "" },
    password: "",
    errors: "",
    role: "",
    userId: "",
    isChecked: true,
    loaderActive: false,
    redirect: false,
  };
  constructor(props) {
    super(props);
    this.state = this.stateInitial;
  }
  componentDidMount() {
    const showNotify = localStorage.getItem("showNotify");
    if (showNotify === "true") {
      notify.show(
        "You are registered! Check your email to verify your account!",
        "success",
        6000
      );
      this.setState({ showNotify: false });
      localStorage.setItem("showNotify", false);
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChangeEmail = (e) => {
    this.setState({
      email: { address: e.target.value },
    });
  };
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };
  Login = async (e) => {
    e.preventDefault();
    const { email, password, isChecked } = this.state;
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.address === "") {
      this.setState({ errors: "Email  is required!" });
      return;
    } else if (!email.address.match(regexp)) {
      this.setState({ errors: "Invalid email!" });
      return;
    } else if (password === "") {
      this.setState({ errors: "Password is required!" });
      return;
    } else if (!isChecked) {
      this.setState({
        errors: "Please accept the terms and conditions to continue!",
      });
      return;
    } else {
      this.setState({
        loaderActive: true,
      });
      console.log("Test");
      var data = {
        email: { address: email.address },
        password: password,
      };
      this.setState({ loaderActive: true });

      var result = await apiHelper("post", "api/auth/login", data, null);
      this.setState({
        loaderActive: false,
      });
      if (result.status === 401) {
        this.setState({ errors: result.message });
        return;
      } else if (result.status === 200) {
        const idd = result.id;
        this.setState({ redirect: true });

        localStorage.setItem("LoginSession", result.accessToken);
        localStorage.setItem("accessToken", JSON.stringify(result.user));
        localStorage.setItem("userId", JSON.stringify(result.id));
        localStorage.setItem("loginTime", new Date().getTime());

        if (result.user.role === "Affiliate") {
          this.setState({ loaderActive: false });
          this.setState({ redirect: true });
          this.props.history.push({
            pathname: `/affiliate/Dashboard/${idd}`,
            state: {
              key: "value",
            },
            id: idd,
          });
          return;
        } else if (result.user.role === "Admin") {
          this.setState({ userId: result.id });

          this.setState({ redirect: true });

          this.props.history.push({
            pathname: `/admin/Statistics/${idd}`,
            state: {
              key: "value",
            },
            id: idd,
          });
          this.setState({ redirect: true });

          this.setState({ loaderActive: true });

          return;
        }
      } else if (result.status === 500) {
        this.setState({ errors: result.message });
        return;
      }
    }
  };
  render() {
    return (
      <div>
        <Notifications />
        <section className="login_wraper">
          {this.state.loaderActive ? (
            <div className="inlineLoaderGif">
              <img src={loaderImage} alt="broken" />
            </div>
          ) : (
            ""
          )}{" "}
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl- col-lg-7 col-md-7 col-sm-12 border-r">
                <div className="login-content">
                  <h3>
                    How well do you really know your friends if you don't know
                    their goals?
                  </h3>
                  <p>
                    Keep up with your friend’s life goals and enjoy helping
                    them!
                  </p>
                  <img
                    src="assets/images/login_img.png"
                    className="img-fluid mt-5"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12">
                <div accept-charset="utf-8">
                  <div className="form_inner_box">
                    <img
                      src="assets/images/Logo.png"
                      className="img-fluid"
                      alt=""
                    />
                    <h3 className="text-center">LOGIN</h3>
                    <div className="form-group mb_30">
                      <label className="input_lable">Email address</label>
                      <input
                        type="email"
                        value={this.state.email.address}
                        onChange={this.onChangeEmail}
                        name="email"
                        className="form-control"
                        placeholder="email@email.com"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input_lable">Password</label>
                      <input
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        className="form-control"
                        placeholder="********"
                      />
                    </div>
                    <div className="iagree_radio p-0">
                      <input
                        type="checkbox"
                        name="iagree_to_be_contacted"
                        id="iagree_to_be_contacted"
                        className="is-valid"
                        defaultChecked
                        onClick={this.toggleChange}
                      />
                      <label for="iagree_to_be_contacted">
                        {" "}
                        please accept our terms of business.
                      </label>{" "}
                      {this.state.errors ? (
                        <div
                          style={{ color: "#FE6E00" }}
                          className="alert alert-danger"
                        >
                          {this.state.errors}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      onClick={(e) => this.Login(e)}
                      type="button"
                      className="theme_btn text-center d-flex mx-auto mb-3 mt_3"
                    >
                      Log In
                    </button>
                    <div className="top-bar">
                      <span>
                        <a class="link" href="#/Register">
                          {" "}
                          Create Account
                        </a>
                      </span>
                    </div>
                    <div className="top-bar">
                      <span>
                        <a class="link" href="/#/forgetPassEmail/">
                          {" "}
                          Forgotten password?
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(Login);
