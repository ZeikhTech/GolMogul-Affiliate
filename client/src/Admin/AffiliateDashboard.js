import React, { Component } from "react";
import $ from "jquery";
import CurrentYearAffiliates from "../Affiliate/currentYearAffiliates";
import CountPerMonth from "../Affiliate/History";
import CountPerDay from "../Affiliate/CountPerDay";

class Statistics extends Component {
  state = { id: "", loaderActive: false, errors: "" };
  async componentDidMount() {
    let { id } = this.props.match.params;
    this.setState({ id: id });
  }
  render() {
    let { id } = this.props.match.params;
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
                  <CountPerDay props={id} />
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
                  <CountPerMonth props={id} />{" "}
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
                  <CurrentYearAffiliates props={id} />

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
