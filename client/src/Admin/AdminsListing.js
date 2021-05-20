import React, { Component } from "react";
import $ from "jquery";
import apiHelper from "../Admin/Helper/ApiHelper";
import loaderImage from "./images/loader.svg";
var moment = require("moment");

class AdminsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affiliatessListing: [],
      loaderActive: false,
    };
  }

  async componentDidMount() {
    $("body").removeClass("transparent-header");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    this.setState({
      loaderActive: true,
    });
    const user = await JSON.parse(localStorage.getItem("accessToken"));

    const token = localStorage.getItem("LoginSession");
    if (user.role == "Admin") {
    } else {
      this.props.history.push({
        pathname: "/",
        state: {
          key: "value",
        },
      });
    }
    let result = await apiHelper(
      "get",
      "api/admin/affiliatesListing",
      "",
      token
    );

    this.setState({
      loaderActive: false,
    });
    if (result.status == 200) {
      if (result.data) {
        this.setState({
          affiliatessListing: result.data,
          loaderActive: false,
        });
      }
    }
  }

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
        <div
          id="content-wrapper"
          className="d-flex align-items-center justify-content-centers"
        >
          <div className="container-fluid">
            <h4 className="main_title mb-4">All Users</h4>
            <div className="admin_all_user">
              <div className="row no-gutters">
                <div className="col-xl-2 col-lg-3">
                  <a href="#/admin/register">
                    <button className="theme_btn text-center">
                      Add New User
                    </button>
                  </a>
                  <hr />
                  <div
                    className="nav flex-column nav-pills custom_nav"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      href="#/admin/UsersListing"
                      className="nav-link active"
                      id="v-pills-home-tab"
                      data-toggle="pill"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      {" "}
                      <i className="fa fa-users mr_20"></i> All
                    </a>
                    <a
                      className="nav-link"
                      id="v-pills-profile-tab"
                      data-toggle="pill"
                      href="#/admin/adminsAll"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr_20"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="users-cog"
                        className="svg-inline--fa fa-users-cog fa-w-20"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M610.5 341.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 368.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm224 32c1.9 0 3.7-.5 5.6-.6 8.3-21.7 20.5-42.1 36.3-59.2 7.4-8 17.9-12.6 28.9-12.6 6.9 0 13.7 1.8 19.6 5.3l7.9 4.6c.8-.5 1.6-.9 2.4-1.4 7-14.6 11.2-30.8 11.2-48 0-61.9-50.1-112-112-112S208 82.1 208 144c0 61.9 50.1 112 112 112zm105.2 194.5c-2.3-1.2-4.6-2.6-6.8-3.9-8.2 4.8-15.3 9.8-27.5 9.8-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-10.7-34.5 24.9-49.7 25.8-50.3-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-3.8-2.2-7-5-9.8-8.1-3.3.2-6.5.6-9.8.6-24.6 0-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h255.4c-3.7-6-6.2-12.8-6.2-20.3v-9.2zM173.1 274.6C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                        ></path>
                      </svg>
                      Admins
                    </a>
                    <a
                      className="nav-link"
                      id="v-pills-messages-tab"
                      data-toggle="pill"
                      href="#v-pills-messages"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                    >
                      {" "}
                      <i className="fa fa-user mr_20"></i> Affiliates
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-9 border_lft">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div
                      className="tab-pane fade active show"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <div className="card">
                        <div className="row align-items-center no-gutters">
                          <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="add_user_img d-flex align-items-start">
                              <img
                                src="assets/images/profile_img.png"
                                className="img-fluid"
                                alt=""
                              />
                              <h5 className=" ">John Quill</h5>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className="email_content">
                              <h5>Email</h5>
                              <p>email@email.com</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-2 col-6">
                            <div className="admin_content">
                              <h5>User Type</h5>
                              <p>Admin</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-6">
                            <div className="edit_icon">
                              <ul>
                                <li>
                                  <a href="#" title="">
                                    <img
                                      src="assets/images/pen.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#" title="">
                                    <img
                                      src="assets/images/trash.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="row align-items-center no-gutters">
                          <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="add_user_img d-flex align-items-start">
                              <img
                                src="assets/images/user_two.png"
                                className="img-fluid"
                                alt=""
                              />
                              <h5 className=" ">Shirley Vu</h5>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className="email_content">
                              <h5>Email</h5>
                              <p>email@email.com</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-6 col-6">
                            <div className="admin_content">
                              <h5>User Type</h5>
                              <p>Affiliate</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-6">
                            <div className="edit_icon">
                              <ul>
                                <li>
                                  <a href="#" title="">
                                    <img
                                      src="assets/images/pen.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#" title="">
                                    <img
                                      src="assets/images/trash.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="row align-items-center no-gutters">
                          <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="add_user_img d-flex align-items-start">
                              <img
                                src="assets/images/user_three.png"
                                className="img-fluid"
                                alt=""
                              />
                              <h5 className=" ">Josef Mellott</h5>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className="email_content">
                              <h5>Email</h5>
                              <p>email@email.com</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-6 col-6">
                            <div className="admin_content">
                              <h5>User Type</h5>
                              <p>Admin</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-6">
                            <div className="edit_icon">
                              <ul>
                                <li>
                                  <a href="#" title="">
                                    <img
                                      src="assets/images/pen.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#" title="">
                                    <img
                                      src="assets/images/trash.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="row align-items-center no-gutters">
                          <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="add_user_img d-flex align-items-start">
                              <img
                                src="assets/images/user_four.png"
                                className="img-fluid"
                                alt=""
                              />
                              <h5 className=" ">Twanna Lenhart</h5>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className="email_content">
                              <h5>Email</h5>
                              <p>email@email.com</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-6 col-6">
                            <div className="admin_content">
                              <h5>User Type</h5>
                              <p>Affiliate</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-6">
                            <div className="edit_icon">
                              <ul>
                                <li>
                                  <a href="#" title="">
                                    <img
                                      src="assets/images/pen.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#" title="">
                                    <img
                                      src="assets/images/trash.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminsListing;
