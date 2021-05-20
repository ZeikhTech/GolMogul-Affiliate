import React, { Component } from "react";
import $ from "jquery";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div>
        <div id="content-wrapper">
          <div className="container-fluid">
            <h4 className="main_title">Profile</h4>
            <div className="Profile_inner">
              <h3 className="">Admin</h3>
              <div className="profile_img_upload">
                <div className="img_upload_wrper">
                  <img
                    src="assets/images/profile_img.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="button_upload">
                  <div className="file-input">
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      className="file-input__input"
                    />
                    <label className="file-input__label" for="file-input">
                      <span>Upload file</span>
                    </label>
                  </div>
                  <p>
                    Acceptable formats JPEG and PNG only. Max file size is 5 mb.
                  </p>
                </div>
              </div>
              <form action="profile_submit" method="get" accept-charset="utf-8">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group mb_30">
                      <label className="input_lable">First Name</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="John"
                      />
                    </div>
                    <div className="form-group mb_30">
                      <label className="input_lable">Email address</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="email@email.com"
                      />
                    </div>
                    <div className="form-group mb_30">
                      <label className="input_lable">Confirm Password</label>
                      <input
                        type="Password"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group mb_30">
                      <label className="input_lable">Last Name</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="Quill"
                      />
                    </div>
                    <div className="form-group mb_30">
                      <label className="input_lable">Password</label>
                      <input
                        type="Password"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="*************"
                      />
                    </div>
                    <div className="form-group mb_30">
                      <label className="input_lable">Affiliate Code</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="017e629hw770kj"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="theme_btn text-center">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
