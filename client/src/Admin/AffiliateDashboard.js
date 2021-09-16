import React, { Component } from "react";
import $ from "jquery";
import CurrentYearAffiliates from "../Affiliate/currentYearAffiliates";
import History from "../Affiliate/History";
import CountPerDay from "../Affiliate/CountPerDay";
import loaderImage from "./images/loader.svg";
import WeeklyComparison from "../Affiliate/CountWeeksCompair";
import DegreeFollower from "../Affiliate/DegreeFollower";

class Statistics extends Component {
  state = { id: "", loaderActive: false, errors: "" };
  async componentDidMount() {
    let { id } = this.props.match.params;
    this.setState({ id: id });
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
    let { id } = this.props.match.params;
    return (
      <div
        id="content-wrapper"
        className="d-flex align-items-center justify-content-centers"
      >
        {this.state.loaderActive ? (
          <div className="inlineLoaderGif">
            <img src={loaderImage} alt="broken" />
          </div>
        ) : (
          ""
        )}{" "}
        <div className="container-fluid">
          <h4 className="mb-4" style={{ fontWeight: "bold" }}>
            Followers Statistical Dashboard
          </h4>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="chart_item">
                <h4 className="sub_title">Daily Report</h4>
                <div
                  className="chart_img text-center mt-3"
                  style={{ paddingTop: "3.5rem" }}
                >
                  {" "}
                  <CountPerDay props={id} loaderActive={this.handleLoader} />
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
                <h4 className="sub_title">Weekly Report</h4>
                <div
                  className="chart_img text-center mt-3"
                  style={{ paddingTop: "3.5rem" }}
                >
                  <WeeklyComparison
                    props={id}
                    loaderActive={this.handleLoader}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="chart_item">
                <h4 className="sub_title">Monthly Report</h4>
                <div
                  className="chart_img text-center mt-3"
                  style={{ paddingTop: "3.5rem" }}
                >
                  <CurrentYearAffiliates
                    props={id}
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
                <h4 className="sub_title">History</h4>
                <div className="chart_img text-center mt-3">
                  <History props={id} loaderActive={this.handleLoader} />{" "}
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
                <h4 className="sub_title">Degree Count</h4>
                <div
                  className="chart_img text-center mt-3"
                  style={{ paddingTop: "3.5rem" }}
                >
                  <DegreeFollower props={id} loaderActive={this.handleLoader} />
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
