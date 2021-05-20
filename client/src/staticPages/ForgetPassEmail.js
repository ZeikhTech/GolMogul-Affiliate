import React, { Component } from "react";
import apiHelper from "../Admin/Helper/ApiHelper";
import $ from "jquery";
import loaderImage from "../Admin/images/loader.svg";
import Notifications, { notify } from "react-notify-toast";

class ForgetPassEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { address: "" },
      errors: "",
      loaderActive: false,
    };
  }

  onChange = (e) => {
    this.setState({
      email: { address: e.target.value },
    });
  };
  ForgetPassword = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.address === "") {
      this.setState({ errors: "Email  is required!" });
      return;
    } else if (!email.address.match(regexp)) {
      this.setState({ errors: "Invalid email!" });
      return;
    } else {
      this.setState({ errors: "", loaderActive: true });
      var data = {
        email: { address: email.address },
      };

      var result = await apiHelper(
        "post",
        "api/auth/forgetPasswordEmail",
        data,
        null
      );

      this.setState({ loaderActive: false });
      if (result.status === 401) {
        this.setState({ errors: result.message });
        return;
      } else if (result.status === 200) {
        this.setState({ redirect: true });
        notify.show(
          "Please check your email to reset your password!",
          "success",
          6000
        );

        // this.props.history.push({
        //   pathname: "/forgetPassword",
        //   state: {
        //     key: "value",
        //   },
        // });
        this.setState({ redirect: true });
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
                <form accept-charset="utf-8">
                  <div className="form_inner_box">
                    <img
                      src="assets/images/Logo.png"
                      className="img-fluid"
                      alt=""
                    />
                    <h3 className="text-center">Find Your Account</h3>
                    <div className="form-group mb_30">
                      <label className="input_lable">Email address</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={(e) => {
                          this.onChange(e);
                        }}
                        value={this.state.email.address}
                        placeholder="email@email.com"
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
                      className="theme_btn text-center d-flex mx-auto mb-3 mt_3"
                      onClick={(e) => {
                        this.ForgetPassword(e);
                      }}
                    >
                      Send Email
                    </button>
                    <div className="top-bar">
                      <span>
                        Create A New Account?{" "}
                        <a class="link" href="/#/register">
                          Register
                        </a>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default ForgetPassEmail;
