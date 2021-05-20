import React, { Component } from "react";
import $ from "jquery";
import Notifications, { notify } from "react-notify-toast";
import apiHelper from "../Admin/Helper/ApiHelper";

class AddBankDetails extends Component {
  state = {
    name: "",
    accountType: "",
    routingNumber: "",
    accountNumber: "",
    errors: "",
  };

  async componentDidMount() {
    $("body").removeClass("transparent-header");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    const user = JSON.parse(localStorage.getItem("accessToken"));
    if (user) {
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

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      accountType,
      routingNumber,
      accountNumber,
      errors,
    } = this.state;
    const exp = /^[a-z A-Z]+$/;
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name == "") {
      this.setState({ errors: "Fullname is required!" });
    } else if (!name.match(exp)) {
      this.setState({ errors: "Invalid username (Only letters a-z allowed)!" });
    } else if (accountType == "") {
      this.setState({ errors: "Email address is required!" });
    } else if (routingNumber == "") {
      this.setState({ errors: "Username is required!" });
    } else if (accountNumber == "") {
      this.setState({ errors: "Username is required!" });
    } else {
      this.setState({ errors: "", loaderActive: true });
      var data = {
        name: name,
        accountType: accountType,
        routingNumber: routingNumber,
        accountNumber: accountNumber,
      };
      var result = await apiHelper("post", "api/auth/signup", data, null);
      this.setState({
        loaderActive: false,
      });
      if (result.status === 401 || result.status === 402) {
        this.setState({
          errors: result.message,
        });
        localStorage.clear();
      } else if (result.status === 200) {
        notify.show(
          "You are registered! Check your email to verify your account!",
          "success",
          6000
        );
        // this.props.history.push("/login");
      } else if (result.status === 500) {
        this.setState({
          errors: result.message,
        });
        return;
      }
    }
  };
  render() {
    return (
      <div>
        <div
          id="content-wrapper"
          className="bank_wraper d-flex align-items-center"
        >
          <div className="container-fluid">
            <h4 className="main_title">Add Bank Details</h4>
            <div className="row">
              <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                <div className="add_bank">
                  <h3 className="">
                    Deposit earnings directly into your U.S. bank account.
                  </h3>
                  <div className="bank_form" accept-charset="utf-8">
                    <div className="form-group mb_30 mt_40">
                      <label className="input_lable">Account Holder Name</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="John Quill"
                      />
                    </div>
                    <div className="form-group mb_30 custom_select">
                      <label className="input_lable">Account Type</label>
                      <select name="" className="form-control">
                        <option value="">Please Select</option>
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </div>
                    <div className="form-group mb_30">
                      <label className="input_lable">Routing Number</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="123456789"
                      />
                    </div>
                    <div className="form-group mb_30">
                      <label className="input_lable">Account Number</label>
                      <input
                        type="text"
                        name=""
                        className="form-control"
                        value=""
                        placeholder="123456789"
                      />
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
                    <a class="link" href="/#/affiliate/AffiliateHistory">
                      <button
                        type="submit"
                        class="theme_btn text-center"
                        data-toggle="modal"
                        data-target="#staticBackdrop"
                      >
                        Save
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                <div className="card-body text-center">
                  <p>This payment method will become active in 3 days</p>
                </div>
                <div className="bank_detail_form mt-5">
                  <img
                    src="assets/images/bank_detail_img.png"
                    className="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Routing Number</li>
                    <li>Account Number</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddBankDetails;
