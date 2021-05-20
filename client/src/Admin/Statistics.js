import React, { Component } from "react";
import $ from "jquery";
import CurrentYearAffiliates from "./CurrentYearAffiliates";
import CountPerMonth from "./History";
import CountPerDay from "./CountPerDay";

class Statistics extends Component {
  state = { id: "", loaderActive: false, errors: "" };
  async componentDidMount() {
    $("body").removeClass("transparent-header");
    $("html, body").animate({ scrollTop: 0 }, "slow");

    const user = await JSON.parse(localStorage.getItem("accessToken"));

    if (user.role == "Admin") {
    } else {
      this.props.history.push({
        pathname: "/",
        state: {
          key: "value",
        },
      });
    }
  }
  render() {
    return (
      <div
        id="content-wrapper"
        className="d-flex align-items-center justify-content-centers"
      >
        <div className="container-fluid">
          <h4 className="main_title mb-4">Dashboard</h4>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="chart_item">
                <h4 className="sub_title">Monthly Report</h4>
                <div
                  className="chart_img text-center mt-3"
                  style={{ paddingTop: "3.5rem" }}
                >
                  {" "}
                  <CountPerDay />
                  {""}
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
                <h4 className="sub_title">History</h4>
                <div className="chart_img text-center mt-3">
                  <CountPerMonth />{" "}
                  {/* <img
                    src="assets/images/chart_two.png"
                    className="img-fluid"
                    alt=""
                  /> */}
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
                  <CurrentYearAffiliates />

                  {/* <img
                    src="assets/images/chart_three.png"
                    className="img-fluid"
                    alt=""
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Statistics;
