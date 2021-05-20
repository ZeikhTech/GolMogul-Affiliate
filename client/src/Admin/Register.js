import React, { Component } from "react";
// import DatePicker from "react-datepicker";

import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import apiMultipart from "../Admin/Helper/ApiHelper2";
import Notifications, { notify } from "react-notify-toast";
import { Button, Modal, Alert } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import loaderImage from "./images/loader.svg";

import "react-datepicker/dist/react-datepicker.css";
import $ from "jquery";
var FormData = require("form-data");

var moment = require("moment");
class Register extends Component {
  state = {
    fullName: "",
    email: { address: "" },
    password: "",
    confirmPassword: "",
    gender: "",
    role: "",
    dateOfBirth: new Date(),
    presentDate: new Date(),
    selctedYear: "",
    userId: "",
    avatar: null,
    avatarToSend: "",
    avatarNameToSend: "",
    showAlert: false,
    code: "",
    inviteLink: "",
    copied: false,
    errors: "",
  };
  onChangeDob = (value) => {
    const val = moment(value).format("MM/DD/YYYY");
    let selctedYear = value.getFullYear();

    this.setState({ dateOfBirth: value, selctedYear: selctedYear });
  };
  async componentDidMount() {
    $("body").removeClass("transparent-header");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    const user = JSON.parse(localStorage.getItem("accessToken"));
    if (user) {
      this.setState({
        userId: user.id,
      });
    }
  }
  onChangeImage = async (e) => {
    const files = e.target.files;
    if (files) {
      this.setState({
        loaderActive: true,

        avatar: URL.createObjectURL(files[0]),
        avatarToSend: files[0],
        avatarNameToSend: files[0].name,
      });
      this.setState({ loaderActive: false });

      return;
    }
  };
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

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      avatarToSend,
      avatarNameToSend,
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      role,
      dateOfBirth,
      selctedYear,
      errors,
    } = this.state;

    let todayYear = this.state.presentDate.getFullYear();

    const exp = /^[a-z A-Z]+$/;
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fullName == "") {
      this.setState({ errors: "Fullname is required!" });
    } else if (!fullName.match(exp)) {
      this.setState({ errors: "Invalid username (Only letters a-z allowed)!" });
    } else if (email.address == "") {
      this.setState({ errors: "Email address is required!" });
    } else if (!email.address.match(regexp)) {
      this.setState({ errors: "Invalid email address!" });
    } else if (password === "") {
      this.setState({ errors: "Passowrd is required!" });
    } else if (password.length < 8) {
      this.setState({
        errors: "Password must have at-least 8 characters!",
      });
    } else if (confirmPassword === "") {
      this.setState({ errors: "Password confirmation is required!" });
    } else if (password !== confirmPassword) {
      this.setState({ errors: "Password do not match!" });
    } else if (gender == "") {
      this.setState({ errors: "Gender is required!" });
    } else if (role == "") {
      this.setState({ errors: "Role is required!" });
    } else if (dateOfBirth == "") {
      this.setState({ errors: "Date of birth is required!" });
    } else if (selctedYear >= todayYear) {
      this.setState({ errors: "Please select a valid date of birth!" });
    } else {
      this.setState({ errors: "" });
      var data = new FormData();
      const address = email.address;
      if (avatarToSend) {
        data.append("avatar", avatarToSend, avatarNameToSend);
      }
      data.append("fullName", fullName);
      data.append("emailAddress", address);
      data.append("password", password);
      data.append("gender", gender);
      data.append("role", role);
      data.append("dateOfBirth", dateOfBirth);

      const token = localStorage.getItem("LoginSession");
      this.setState({
        loaderActive: true,
      });
      var result = await apiMultipart(
        "post",
        "api/auth/registerNewUser",
        data,
        token
      );
      this.setState({
        loaderActive: false,
      });
      if (
        result.status === 400 ||
        result.status === 401 ||
        result.status === 402 ||
        result.status === 415
      ) {
        this.setState({
          errors: result.message,
        });
      } else if (result.status === 413) {
        this.setState({
          errors: result.message,
        });
      } else if (result.status === 200) {
        // notify.show(
        //   "You are registered! Check your email to verify your account!",
        //   "success",
        //   6000
        // );
        this.setState({ code: result.code, showAlert: true });

        var inviteLink = `${window.APPURL}invite/${this.state.code}`;
        this.setState({ inviteLink: inviteLink });
      } else if (result.status === 500) {
        this.setState({
          errors: result.message,
        });
      }
    }
  };
  handleClose = () => {
    this.props.history.push("/admin/Listing/all");
    this.setState({ showAlert: false });
  };
  // handleClose1 = () => {
  //   this.setState({ showAlert: false });
  // };
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
                  <h2
                    className="text-center"
                    style={{ marginTop: "0px", color: "rgb(67, 215, 241)" }}
                  >
                    REGISTER NOW
                  </h2>
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
                    <div className="form-group mb_30">
                      <label className="input_lable">Full Name</label>
                      <input
                        type="text"
                        value={this.state.fullName}
                        onChange={this.onChange}
                        name="fullName"
                        className="form-control"
                        placeholder="Full Name"
                      />
                    </div>
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
                    <div className="form-group">
                      <label className="input_lable">Confirm Password</label>
                      <input
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.onChange}
                        name="confirmPassword"
                        placeholder="********"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input_lable">Gender</label>
                      <select
                        className="form-control"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.onChange}
                      >
                        <option value="">Select Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="input_lable">Date of Birth</label>
                      <DatePicker
                        className="form-control"
                        name="dateOfBirth"
                        id="datepicker"
                        value={this.state.dateOfBirth}
                        onChange={(value) => this.onChangeDob(value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="input_lable">Role</label>
                      <select
                        className="form-control"
                        name="role"
                        value={this.state.role}
                        onChange={this.onChange}
                      >
                        <option value="">Select Your Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Affiliate">Affiliate</option>
                      </select>
                    </div>
                    <div className="profile_container">
                      <div className="profile_pic_upload">
                        {this.state.avatar == null ? (
                          <img
                            src="assets/images/profile_img.png"
                            className="img-fluid"
                            alt=""
                          />
                        ) : (
                          <img
                            src={this.state.avatar}
                            className="img-fluid"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="file-input" style={{ marginTop: "32px" }}>
                        <input
                          type="file"
                          name="avatar"
                          id="file-input"
                          className="file-input__input"
                          onChange={this.onChangeImage}
                        />
                        <label className="file-input__label" for="file-input">
                          <span style={{ fontSize: "14px" }}>Upload file</span>
                        </label>
                      </div>
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
                    <div>
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
                    <div
                      className="buttonContainer"
                      style={{ marginTop: "20px" }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          this.onSubmit(e);
                        }}
                        className="theme_btn text-center d-flex mx-auto"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={this.state.showAlert} onHide={this.handleClose}>
              <Modal.Body>
                <Alert variant="success">
                  <p>
                    Invitecode is<b> {this.state.code}</b>!!
                  </p>
                  <hr />
                  <CopyToClipboard
                    text={this.state.code}
                    onCopy={() => this.setState({ copied: true })}
                  >
                    <div
                      style={{
                        position: "absolute",
                        marginLeft: "24rem",
                        bottom: "2.7rem",
                      }}
                    >
                      <i class="fa fa-copy" style={{ color: "grey" }}></i>
                    </div>
                  </CopyToClipboard>
                  {this.state.copied ? (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        left: "25.1rem",
                        top: "3.6rem",
                        position: "absolute",
                      }}
                    >
                      Copied.
                    </div>
                  ) : null}
                </Alert>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={this.handleClose}
                  style={{ alignItems: "center" }}
                >
                  OK
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </section>
      </div>
    );
  }
}
export default Register;
