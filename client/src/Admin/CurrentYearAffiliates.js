import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";
import loaderImage from "./images/loader.svg";

class currentYearAffiliates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonthUsers: "",
      LastMonthUser: "",
      lastYearUsers: "",
      series: [
        {
          data: [],
        },
      ],
      options: {
        colors: [
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
          "#3A0652",
        ],
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {},
          },
        },
        // color: "green",
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["Jan", ""],
            ["Feb", ""],
            ["March", ""],
            "April",
            ["May", ""],
            ["June", ""],
            ["July", ""],
            ["Aug", ""],
            ["Sep", ""],
            ["Oct", ""],
            ["Nov", ""],
            ["Dec", ""],
          ],
          labels: {
            style: {
              //   color: colors,
              fontSize: "12px",
            },
          },
        },
      },
    };
  }
  async componentWillMount() {
    $("body").removeClass("transparent-headesssr");
    $("html, body").animate({ scrollTop: 0 }, "slow");

    const user = JSON.parse(localStorage.getItem("accessToken"));
    const token = localStorage.getItem("LoginSession");
    this.setState({ loaderActive: true });
    let result = await apiHelper(
      "get",
      "api/affiliate/CurrentYearAffiliates",
      "",
      token
    );
    this.setState({
      loaderActive: false,
    });
    if (result) {
      if (result.status == 200) {
        this.setState({ series: [{ data: result.currentYearUsers }] });
      } else {
        this.setState({ errors: result.message });
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
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}
export default currentYearAffiliates;
