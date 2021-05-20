import React, { Component } from "react";
import $ from "jquery";
import Notifications, { notify } from "react-notify-toast";
import loaderImage from "../Admin/images/loader.svg";

import apiHelper from "../Admin/Helper/ApiHelper";
class ForgetPassword extends Component {
  stateInitial = {
    password: "",
    confirmedpassword: "",
    errors: "",
    userToken: "",
    loaderActive: false,
  };
  constructor(props) {
    super(props);
    this.state = this.stateInitial;
  }
  stateInitialize = () => {
    this.setState(this.stateInitial);
  };

  componentWillUpdate(nextProps, nextState) {}

  componentDidMount() {
    $("body").removeClass("transparent-header");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var x = this.props.match;
    let token = x.params.token;
    this.setState({ userToken: token });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async () => {
    const { confirmedpassword, password, userToken } = this.state;
    if (password == "") {
      this.setState({
        errors: "Password is required!",
      });
    } else if (password.length < 8) {
      this.setState({
        errors: "Password must contain at-least 8 characters!",
      });
    } else if (confirmedpassword == "") {
      this.setState({
        errors: "Please confirm your password!",
      });
    } else if (password != confirmedpassword) {
      this.setState({
        errors: "Password do not match!",
      });
    } else {
      this.setState({ errors: "", loaderActive: true });
      var data = {
        password: password,
        confirmPassword: confirmedpassword,
        token: userToken,
      };

      var result = await apiHelper("post", `api/auth/forgetPassword`, data, "");
      this.setState({
        loaderActive: false,
      });
      if (result.status === 200) {
        notify.show("Password updated successfully!!", "success", 2000);
        this.props.history.push({
          pathname: "/login",
          state: {
            key: "value",
          },
        });
      } else if (result.status === 400) {
        this.setState({ errors: result.message });
      } else {
        notify.show("Something went wrong!!", "success", 500);
      }
    }
  };
  render() {
    return (
      <div>
        <Notifications />
        {this.state.loaderActive ? (
          <div className="inlineLoaderGif">
            <img src={loaderImage} alt="broken" />
          </div>
        ) : (
          ""
        )}{" "}
        <section className="login_wraper">
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
                    <h3 className="text-center">Change Password</h3>

                    <div className="form-group">
                      <label className="input_lable">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        className="form-control"
                        placeholder="********"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input_lable">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmedpassword"
                        value={this.state.confirmedpassword}
                        onChange={this.onChange}
                        className="form-control"
                        placeholder="********"
                      />
                    </div>
                    <div className="iagree_radio">
                      <span
                        className="error"
                        id="iagree_to_be_contacted_error"
                        style={{ display: "none" }}
                      >
                        please accept our terms of business
                      </span>
                    </div>
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
                    <button
                      onClick={(e) => {
                        this.onSubmit(e);
                      }}
                      className="theme_btn text-center d-flex mx-auto mb-3 mt_3"
                    >
                      Update
                    </button>
                    <div className="top-bar">
                      <span>
                        <a class="link" href="/#/register">
                          Create A New Account?{" "}
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
export default ForgetPassword;
