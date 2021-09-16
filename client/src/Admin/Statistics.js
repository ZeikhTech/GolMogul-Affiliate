import React, { Component } from "react";
import $ from "jquery";
import CurrentYearAffiliatesForAdmin from "./CurrentYearAffiliates";
import CountPerMonthForAdmin from "./History";
import CountPerDayForAdmin from "./CountPerDay";
import WeeklyComparison from "./CountWeeksCompair";
import AllUsersCountPerDay from "./AllUsersCountPerDay";
import AllUsersHistory from "./AllUsersHistory";
import AllUsersCountPerYear from "./AllUsersCountPerYear";
import apiHelper from "../Admin/Helper/ApiHelper";
import loaderImage from "./images/loader.svg";

class Statistics extends Component {
  state = { id: "", affiliatessListing: [], loaderActive: false, errors: "" };
  async componentDidMount() {
    $("body").removeClass("transparent-header");
    $("html, body").animate({ scrollTop: 0 }, "slow");

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
    this.setState({
      loaderActive: true,
    });
    let result = await apiHelper(
      "get",
      "api/admin/affiliatesListing",
      "",
      token
    );

    if (result.status == 200) {
      if (result.data) {
        this.setState({
          affiliatessListing: result.data,
          loaderActive: false,
        });
      }
    }
    this.setState({
      loaderActive: false,
    });
    window.onload = function () {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };
  }
  handleLoader = (loaderActive) => {
    this.setState({ loaderActive: loaderActive });
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
        <div
          id="content-wrapper"
          className="d-flex align-items-center justify-content-centers"
        >
          <div className="container-fluid">
            <h4 className=" mb-4" style={{ fontWeight: "bold" }}>
              Admin's Statistical Dashboard
            </h4>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="chart_item">
                  <h4 className="sub_title">Affiliates Daily Report</h4>
                  <div
                    className="chart_img text-center mt-3"
                    style={{ paddingTop: "3.5rem" }}
                  >
                    <CountPerDayForAdmin loaderActive={this.handleLoader} />

                    {/* <img
                    src="assets/images/chart_one.png"
                    className="img-fluid"
                    alt=""
                  /> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="chart_item">
                  <h4 className="sub_title">Affiliates Weekly Report</h4>
                  <div
                    className="chart_img text-center mt-3"
                    style={{ paddingTop: "3.5rem" }}
                  >
                    <WeeklyComparison loaderActive={this.handleLoader} />

                    {/* <img
                    src="assets/images/chart_one.png"
                    className="img-fluid"
                    alt=""
                  /> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="chart_item">
                  <h4 className="sub_title">Affiliates Monthly Report</h4>
                  <div
                    className="chart_img text-center mt-3"
                    style={{ paddingTop: "3.5rem" }}
                  >
                    <CurrentYearAffiliatesForAdmin
                      loaderActive={this.handleLoader}
                    />

                    {/* <img
                    src="assets/images/chart_three.png"
                    className="img-fluid"
                    alt=""
                  /> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="chart_item">
                  <h4 className="sub_title">Affiliates History</h4>
                  <div className="chart_img text-center mt-3">
                    <CountPerMonthForAdmin loaderActive={this.handleLoader} />
                    {/* <img
                    src="assets/images/chart_two.png"
                    className="img-fluid"
                    alt=""
                  /> */}
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />
            {/* <h4 className=" mb-4" style={{ fontWeight: "bold" }}>
              Users Statistical Dashboard
            </h4>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="chart_item">
                  <h4 className="sub_title">Monthly Report</h4>
                  <div
                    className="chart_img text-center mt-3"
                    style={{ paddingTop: "3.5rem" }}
                  >
                    {" "}
                    <AllUsersCountPerDay loaderActive={this.handleLoader} />
                    {""}
                
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="chart_item">
                  <h4 className="sub_title">History</h4>
                  <div className="chart_img text-center mt-3">
                    <AllUsersHistory loaderActive={this.handleLoader}/>{" "}
                   
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="chart_item">
                  <h4 className="sub_title">Yearly Report</h4>
                  <div
                    className="chart_img text-center mt-3"
                    style={{ paddingTop: "3.5rem" }}
                  >
                    <AllUsersCountPerYear loaderActive={this.handleLoader}/>

                   
                  </div>
                </div>
              </div>
            </div>
          */}
          </div>
        </div>
        <br /> <br />
      </div>
    );
  }
}
export default Statistics;
