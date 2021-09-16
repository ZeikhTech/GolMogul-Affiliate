import React, { Component } from "react";
import $ from "jquery";
import apiHelper from "../Admin/Helper/ApiHelper";
import apiMultipart from "../Admin/Helper/ApiHelper2";
import Notifications, { notify } from "react-notify-toast";
import { Button, Modal, Alert } from "react-bootstrap";
import loaderImage from "../Admin/images/loader.svg";

import "bootstrap/dist/css/bootstrap.css";
var FormData = require("form-data");

class EditProfile extends Component {
  state = {
    fullName: "",
    email: { address: "" },
    editedOldPassword: "",
    newPassword: "",
    confirmPassword: "",
    inviteCode: "",
    selectedAvatar: "",
    avatar: "",
    avatarName: "",
    avatarToSend: "",
    avatarNameToSend: "",
    userId: "",
    errors: "",
    passwordErrors: "",
    loaderActive: false,
    show: false,
    showAlert: false,
  };

  async componentDidMount() {
    $("body").removeClass("transparent-headesssr");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    let x = this.props.match;
    let id = x.params.id;

    const user = JSON.parse(localStorage.getItem("accessToken"));
    const token = localStorage.getItem("LoginSession");
    if (user) {
      this.setState({ loaderActive: true });
      let result = await apiHelper(
        "get",
        `api/affiliate/Profile/${id}`,
        "",
        token
      );
      this.setState({ loaderActive: false });

      if (result.user.avatar) {
        this.setState({
          avatar: result.user.avatar,
        });
      }

      this.setState({
        fullName: result.user.name,
        email: { address: result.user.email.address },
        inviteCode: result.user.inviteCode,
      });
      if (result.status == 200) {
        if (result.user) {
          this.setState({
            user: result.user,
          });
        } else {
          this.props.history.push({
            pathname: "/",
            state: {
              key: "value",
            },
          });
        }
      } else {
        // this.props.history.push({
        //   pathname: "/",
        //   state: {
        //     key: "value",
        //   },
        // });
      }

      this.setState({
        userId: user.id,
      });
    } else {
      this.props.history.push({
        pathname: "/login",
        state: {
          key: "value",
        },
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChangeImage = async (e) => {
    const files = e.target.files;
    if (files) {
      this.setState({
        loaderActive: true,
        selectedAvatar: URL.createObjectURL(files[0]),
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

      inviteCode,
      avatarToSend,
      avatarNameToSend,
    } = this.state;
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
    } else if (inviteCode == "") {
      this.setState({ errors: "Code!" });
    } else {
      let x = this.props.match;
      let id = x.params.id;
      this.setState({ errors: "" });
      var data = new FormData();
      data.append("name", fullName);
      if (avatarToSend === "") {
        data.append("avatar", avatarNameToSend);
      } else {
        data.append("avatar", avatarToSend, avatarNameToSend);
      }
      const token = localStorage.getItem("LoginSession");
      var result = await apiMultipart(
        "put",
        `api/affiliate/editProfile/${id}`,
        data,
        token
      );
      this.setState({
        loaderActive: false,
      });
      if (
        result.status === 401 ||
        result.status === 402 ||
        result.status === 400
      ) {
        this.setState({
          errors: result.message,
        });
      } else if (result.status === 201) {
        localStorage.removeItem("avatar");
        localStorage.setItem("avatar", avatarNameToSend);
        notify.show("Profile updated successfully!!", "success", 6000);
        window.location.reload();
        // this.props.history.push({
        //   pathname: `/admin/EditProfile/${id}`,
        //   state: {
        //     key: "value",
        //   },
        // });
      } else if (result.status === 500) {
        this.setState({
          errors: result.message,
        });
        return;
      }
    }
  };
  handleOpen = () => {
    this.setState({ show: true });
  };
  handleClose1 = () => {
    this.setState({ show: false, showAlert: false });
  };
  onUpdatePassword = (e) => {
    this.onPasswordSubmit(e);
  };
  async onPasswordSubmit(e) {
    e.preventDefault();
    const { editedOldPassword, newPassword, confirmPassword } = this.state;
    if (editedOldPassword === "") {
      this.setState({ passwordErrors: "Please enter your old password!" });
    } else if (editedOldPassword.length < 8) {
      this.setState({
        passwordErrors: "Password must have at-least 8 characters!",
      });
    } else if (newPassword === "") {
      this.setState({ passwordErrors: "Please enter your new password!" });
    } else if (newPassword.length < 8) {
      this.setState({
        passwordErrors: "Password must have at-least 8 characters!",
      });
    } else if (confirmPassword === "") {
      this.setState({ passwordErrors: "Password confirmation is required!" });
    } else if (newPassword !== confirmPassword) {
      this.setState({ passwordErrors: "Password does not match!" });
    } else {
      let x = this.props.match;
      let id = x.params.id;
      this.setState({ errors: "" });
      var data = {
        oldPassword: editedOldPassword,
        password: newPassword,
      };

      const token = localStorage.getItem("LoginSession");
      var result = await apiHelper(
        "post",
        `api/affiliate/editPassword/${id}`,
        data,
        token
      );
      this.setState({
        loaderActive: false,
      });
      if (
        result.status === 401 ||
        result.status === 402 ||
        result.status === 400 ||
        result.status === 403
      ) {
        this.setState({
          passwordErrors: result.message,
        });
      } else if (result.status === 200) {
        // notify.show("Profile updated successfully!!", "success", 6000);
        this.setState({ show: false, showAlert: true });
      } else if (result.status === 500) {
        this.setState({
          passwordErrors: result.message,
        });
        return;
      }
    }
  }
  successAlert = () => {
    this.setState({ showAlert: false });
    window.location.reload();
  };
  render() {
    return (
      <div>
        {" "}
        {this.state.loaderActive ? (
          <div className="inlineLoaderGif">
            <img src={loaderImage} alt="broken" />
          </div>
        ) : (
          ""
        )}{" "}
        <div id="content-wrapper">
          <Notifications />
          <div className="container-fluid">
            <h4 className="main_title">Profile</h4>
            <div className="Profile_inner">
              <h3 className="">Admin</h3>
              <div className="profile_img_upload">
                <div className="img_upload_wrper">
                  {this.state.selectedAvatar == "" ? (
                    this.state.avatar == "" ? (
                      <img
                        src="assets/images/profile_img.png"
                        className="img-fluid"
                        alt=""
                      />
                    ) : (
                      <img
                        src={window.APIURL + this.state.avatar}
                        className="img-fluid"
                        alt=""
                      />
                    )
                  ) : (
                    <img
                      src={this.state.selectedAvatar}
                      className="img-fluid"
                      alt=""
                    />
                  )}
                </div>
                <div className="button_upload">
                  <div className="file-input">
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      className="file-input__input"
                      onChange={this.onChangeImage}
                    />
                    <label className="file-input__label" for="file-input">
                      <span>Upload file</span>
                    </label>
                  </div>
                  <p>
                    Acceptable formats JPEG and PNG only. Max file size is 5 mb.
                    {this.state.avatarNameToSend ? (
                      <strong>
                        {"Image Selected " + this.state.avatarNameToSend}
                      </strong>
                    ) : (
                      "Drop an image here, or select a file."
                    )}
                  </p>
                </div>
              </div>
              <div accept-charset="utf-8">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group mb_30">
                      <label className="input_lable">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.fullName}
                        onChange={this.onChange}
                        name="fullName"
                        placeholder="John"
                      />
                    </div>
                    <div className="form-group mb_30">
                      <label className="input_lable">Email address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.email.address}
                        name="email"
                        placeholder="email@email.com"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group mb_30">
                      <label className="input_lable">Affiliate Code</label>
                      <input
                        type="text"
                        value={this.state.inviteCode}
                        // onChange={this.onChange}
                        name="inviteCode"
                        className="form-control"
                        placeholder="017e629hw770kj"
                      />
                    </div>
                  </div>
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
                  className="theme_btn text-center"
                  onClick={(e) => {
                    this.onSubmit(e);
                  }}
                >
                  Save
                </button>
                <button
                  style={{ marginLeft: "6px" }}
                  className="theme_btn text-center"
                  onClick={(e) => {
                    this.handleOpen(e);
                  }}
                >
                  Edit Password
                </button>
              </div>
            </div>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <Alert variant="danger">
                <p>
                  Are you sure you want to delete{" "}
                  <b>{this.state.nameofDeletedUser}</b>?
                </p>
                <hr />
              </Alert> */}
              <div className="form-group mb_30">
                <label className="input_lable">Old Password</label>
                <input
                  type="Password"
                  value={this.state.editedOldPassword}
                  onChange={this.onChange}
                  name="editedOldPassword"
                  className="form-control"
                  placeholder="*************"
                />
              </div>
              <div className="form-group mb_30">
                <label className="input_lable">New Password</label>
                <input
                  type="Password"
                  value={this.state.newPassword}
                  onChange={this.onChange}
                  name="newPassword"
                  className="form-control"
                  placeholder="*************"
                />
              </div>
              <div className="form-group mb_30">
                <label className="input_lable">Confirm Password</label>
                <input
                  type="Password"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  name="confirmPassword"
                  className="form-control"
                  placeholder="*************"
                />
              </div>
              {this.state.passwordErrors ? (
                <div
                  style={{ color: "#FE6E00" }}
                  className="alert alert-danger"
                >
                  {this.state.passwordErrors}
                </div>
              ) : (
                ""
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={(e) => {
                  this.onUpdatePassword(e);
                }}
              >
                Update
              </Button>
              <Button variant="primary" onClick={this.handleClose1}>
                cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showAlert} onHide={this.handleClose1}>
            <Modal.Body>
              <Alert variant="success">
                <p>Password updated successfully!! </p>
                <hr />
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={this.successAlert}
                style={{ alignItems: "center" }}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
export default EditProfile;
