import React, { Component } from "react";
import Notifications, { notify } from "react-notify-toast";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import loaderImage from "../Admin/images/loader.svg";
import $ from "jquery";
import PhoneCode from "react-phone-code";
const axios = require("axios").default;

// var FormData = require("form-data");
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
    avatar: null,
    loaderActive: false,
    code: "+1",
    phone: "",
    inviterCode: "",
    avatarToSend: "",
    avatarNameToSend: "",
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
  onSubmit = async (e) => {
    e.preventDefault();
    const {
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      role,
      dateOfBirth,
      selctedYear,
      code,
      phone,
      inviterCode,
      avatarToSend,
      avatarNameToSend,
      errors,
    } = this.state;

    let todayYear = this.state.presentDate.getFullYear();

    const exp = /^[a-z A-Z]+$/;
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    } else if (code == "") {
      this.setState({ errors: "Country code is required!" });
    } else if (
      phone == "" ||
      phone.length < 5 ||
      !phone.match("^[0-9]{1,45}$")
    ) {
      this.setState({ errors: "A valid phone number is required!" });
    } else if (inviterCode !== "GMBeta1000X") {
      this.setState({ errors: "Invalid inviter code!" });
    } else if (role == "") {
      this.setState({ errors: "Role is required!" });
    } else if (dateOfBirth == "") {
      this.setState({ errors: "Date of birth is required!" });
    } else if (selctedYear >= todayYear) {
      this.setState({ errors: "Please select a valid date of birth!" });
    } else {
      this.setState({ errors: "" });

      try {
        var data = {
          name: fullName,
          email: email.address,
          password: password,
          gender: gender,
          countryCode: code,
          phone: phone,
          dateOfBirth: dateOfBirth,
          inviterCode: inviterCode,
          role: role,
        };
        this.setState({ loaderActive: true });

        var result = await axios.post(
          "https://api.goalmogul.com/api/pub/user/",
          data
        );
        // var result = await axios.post(
        //   "http://192.168.1.15:8081/api/pub/user/",
        //   data
        // );
        this.setState({
          loaderActive: false,
        });
        if (result.status === 200) {
          localStorage.setItem("showNotify", true);
          this.props.history.push("/login");
        }
      } catch (error) {
        this.setState({
          loaderActive: false,
        });
        if (
          error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 402 ||
          error.response.status === 409 ||
          error.response.status === 413 ||
          error.response.status === 415 ||
          error.response.status === 500
        ) {
          this.setState({
            errors: error.response.data.message,
          });
          localStorage.clear();
        }
      }
    }
  };

  render() {
    return (
      <div>
        {this.state.loaderActive ? (
          <div className="inlineLoaderGif">
            <img src={loaderImage} alt="broken" />
          </div>
        ) : (
          ""
        )}{" "}
        <section className="login_wraper">
          <Notifications />

          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl- col-lg-7 col-md-7 col-sm-12 border-r">
                <div className="login-content">
                  <h2
                    className="text-center"
                    style={{ marginTop: "0px", color: "rgb(67, 215, 241)" }}
                  >
                    AFFILIATE SIGN UP
                  </h2>
                  <h3>AFFILIATE PORTAL</h3>
                  <p>
                    Discover your friends’ goals, dreams, and aspirations Stay
                    connected,
                    <br /> show support, make them smile ... and get paid for
                    it!
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
                    {/* <img
                      src="assets/images/Logo.png"
                      className="img-fluid"
                      alt=""
                    /> */}

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
                      <label className="input_lable">Country Code</label>

                      <PhoneCode
                        onSelect={(code) => this.setState({ code: code })} // required
                        showFirst={["US", "IN"]}
                        defaultValue="select county"
                        id="some-id"
                        name="some-name"
                        className="form-control"
                        optionClassName="some option class name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input_lable">Phone </label>
                      <input
                        type="text"
                        value={this.state.phone}
                        onChange={this.onChange}
                        name="phone"
                        placeholder="Phone Number"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group ">
                      <label className="input_lable">Inviter Code</label>
                      <input
                        type="text"
                        value={this.state.inviterCode}
                        onChange={this.onChange}
                        name="inviterCode"
                        className="form-control"
                        placeholder="Inviter Code"
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
                        <option value="Affiliate">Affiliate</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="input_lable">Date of Birth</label>

                      <DatePicker
                        className="form-control"
                        name="dateOfBirth"
                        id="datepicker"
                        value={this.state.dateOfBirth}
                        onChange={(value) => {
                          this.onChangeDob(value);
                        }}
                      />
                    </div>
                    {/* <div className="profile_container">
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

                      
                    </div> */}

                    {/* <div className="iagree_radio">
                      <span
                        className="error"
                        id="iagree_to_be_contacted_error"
                        style={{ display: "none" }}
                      >
                        please accept our terms of business
                      </span>
                    </div> */}
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

                    <div className="top-bar">
                      <span>
                        Have an account?{" "}
                        <a class="link" href="/#/login">
                          {" "}
                          Log In
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
export default Register;
