import React, { Component } from "react";
import $ from "jquery";
class UsersListing extends Component {
  state = {};
  render() {
    return (
      <div>
        {" "}
        <div
          id="content-wrapper"
          className="d-flex align-items-center justify-content-centers"
        >
          <div className="container-fluid">
            <h4 className="main_title mb-4">All Users</h4>
            <div className="admin_all_user">
              <div className="row no-gutters">
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
                    <div
                      className="tab-pane fade"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-messages"
                      role="tabpanel"
                      aria-labelledby="v-pills-messages-tab"
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-settings"
                      role="tabpanel"
                      aria-labelledby="v-pills-settings-tab"
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
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
export default UsersListing;
