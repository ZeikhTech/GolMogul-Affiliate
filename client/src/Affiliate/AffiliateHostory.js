import React, { Component } from "react";
import $ from "jquery";
import Pagination from "react-js-pagination";
import loaderImage from "../Admin/images/loader.svg";
import apiHelper from "./Helper/ApiHelper";
var moment = require("moment");

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
class AffiliateHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FollowersOfAffiliate: [],
      activePage: 1,
      token: "",
      recordsCount: "",
      loaderActive: false,
    };
  }

  async componentDidMount() {
    var type = "Follower";
    $("body").removeClass("transparent-header");
    $("html, body").animate({ scrollTop: 0 }, "slow");

    const user = localStorage.getItem("LoginSession");

    if (user) {
      this.getDocuments(1);

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

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.getDocuments(pageNumber);
  }
  async getDocuments(pageNumber) {
    const token = localStorage.getItem("LoginSession");

    let data = {
      pageNumber: pageNumber,
      role: "everyone",
    };

    this.setState({ loaderActive: true });
    let result = await apiHelper(
      "post",
      "api/affiliate/followersAgainstAffiliate",
      data,
      token
    );

    if (result.status == 200) {
      if (result.users) {
        this.setState({
          FollowersOfAffiliate: result.users,
          recordsCount: result.count,
        });
      }
    }
    this.setState({ loaderActive: false });
  }
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div>
        {this.state.loaderActive ? (
          <div className="inlineLoaderGif">
            <img src={loaderImage} alt="broken" />
          </div>
        ) : (
          ""
        )}
        <div
          id="content-wrapper"
          class="d-flex align-items-center justify-content-centers"
        >
          <div class="container-fluid">
            <h4 class="main_title mb-4">History</h4>
            <div class="row">
              <div class="col-xl-6 col-lg-12">
                <div class="user_history">
                  <h4 class="sub_title">User History</h4>
                  <div class="user_history_inner mCustomScrollbar">
                    {this.state.FollowersOfAffiliate.length > 0
                      ? this.state.FollowersOfAffiliate.map((data) => {
                          return (
                            <div class="card-body">
                              <ul>
                                <li>
                                  <h5>Name</h5>
                                  <p>{data.name}</p>
                                </li>
                                <li>
                                  <h5>Email</h5>
                                  <p>{data.email.address}</p>
                                </li>
                                <li>
                                  <h5>Account Created</h5>
                                  <p>
                                    {moment(data.created).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          );
                        })
                      : "No follower found"}
                  </div>
                </div>
                {this.state.FollowersOfAffiliate > 0 ? (
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={this.state.recordsCount}
                    onChange={(e) => this.handlePageChange(e)}
                  />
                ) : (
                  ""
                )}
              </div>
              <div class="col-xl-6 col-lg-12">
                <div class="transation">
                  <div class="card-body">
                    <p>
                      Available Balance:{" "}
                      <span class="font-weight-bold">$10900</span>
                    </p>
                    <a class="link" href="/#/affiliate/AddBankDetails">
                      <button
                        type="submit"
                        class="theme_btn text-center"
                        data-toggle="modal"
                        data-target="#staticBackdrop"
                      >
                        Get Paid
                      </button>
                    </a>
                  </div>
                  <div class="transation_inner">
                    <div class="card-body mb-0">
                      <h4 class="font-weight-bold">Transactions</h4>
                    </div>
                  </div>
                </div>
                <div class="main-card">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class="thead-light">
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Ref ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01/02/2020</td>
                          <td>Amount for 10 Users</td>
                          <td>$5900</td>
                          <td>378902</td>
                        </tr>
                        <tr>
                          <td>01/02/2020</td>
                          <td>Amount for 10 Users</td>
                          <td>$600</td>
                          <td>354525</td>
                        </tr>
                        <tr>
                          <td>01/02/2020</td>
                          <td>Amount for 10 Users</td>
                          <td>$150</td>
                          <td>378524</td>
                        </tr>
                        <tr>
                          <td>01/02/2020</td>
                          <td>Amount for 10 Users</td>
                          <td>$5900</td>
                          <td>378914</td>
                        </tr>
                        <tr>
                          <td>01/02/2020</td>
                          <td>Amount for 10 Users</td>
                          <td>$4200</td>
                          <td>378903</td>
                        </tr>
                        <tr>
                          <td>01/02/2020</td>
                          <td>Amount for 10 Users</td>
                          <td>$5900</td>
                          <td>378902</td>
                        </tr>
                        <tr>
                          <td>01/02/2020</td>
                          <td>Amount for 10 Users</td>
                          <td>$5900</td>
                          <td>378902</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade get_paid_modal"
          id="staticBackdrop"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Get Paid Now
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="available_balance">
                  <h4>Available Balance:</h4>
                  <p>$10900</p>
                </div>

                <div class="row align-items-baseline">
                  <div class="col-lg-6">
                    <div class="form-group mb_30 custom_select">
                      <label class="input_lable">User Type</label>
                      <select name="" class="form-control">
                        <option value="">Other Admin</option>
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-6 mb_b">
                    <a href="" class="btn-link" title="">
                      Add Bank Details
                    </a>
                  </div>
                </div>

                <div class="form-group mb_30 col-7 pl-0">
                  <label class="input_lable">Email address</label>
                  <input
                    type="text"
                    name=""
                    class="form-control"
                    value=""
                    placeholder="email@email.com"
                  />
                </div>
                <div class="remaining_balance mb-4">
                  <h4>Remaining Balance:</h4>
                  <p>$9900</p>
                </div>
                <button type="submit" class="theme_btn">
                  Get Paid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AffiliateHistory;
