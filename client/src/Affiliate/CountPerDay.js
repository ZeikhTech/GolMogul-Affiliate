import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";
import loaderImage from "../Admin/images/loader.svg";

var moment = require("moment");
class CountPerDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonthUsers: "",
      LastMonthUser: "",
      lastYearUsers: "",
      loaderActive: false,
      series: [
        {
          data: [],
        },
      ],
      options: {
        colors: ["#578C4D"],
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
            ["1", ""],
            ["2", ""],
            ["3", ""],
            ["4", ""],
            ["5", ""],
            ["6", ""],
            ["7", ""],
            ["8", ""],
            ["9", ""],
            ["10", ""],
            ["11", ""],
            ["12", ""],
            ["13", ""],
            ["12", ""],
            ["14", ""],
            ["15", ""],
            ["16", ""],
            ["17", ""],
            ["18", ""],
            ["19", ""],
            ["20", ""],
            ["21", ""],
            ["22", ""],
            ["23", ""],
            ["24", ""],
            ["25", ""],
            ["26", ""],
            ["27", ""],
            ["28", ""],
            ["29", ""],
            ["30", ""],
            ["31", ""],
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
  async componentDidMount() {
    $("body").removeClass("transparent-headesssr");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    const dateNow = Date.now();

    const myDate = moment(dateNow).format();
    const presentDate = parseInt(myDate.toString().substr(8, 2));

    const user = JSON.parse(localStorage.getItem("accessToken"));
    const token = localStorage.getItem("LoginSession");
    this.setState({ loaderActive: true });
    var data = {
      id: this.props.props,
    };
    let result = await apiHelper(
      "post",
      `api/affiliate/followersInThisMonth`,
      data,
      token
    );
    this.setState({ loaderActive: false });

    if (result) {
      if (result.status == 200) {
        var limit = presentDate - result.followersPerDay.length - 1;
        var new1 = [];
        for (var i = 0; i <= limit - 1; i++) {
          new1.push(0);
        }
        var dummy = [];
        for (var j = 0; j < result.followersPerDay.length - 1; j++) {
          dummy.push(result.followersPerDay[j][1]);
        }
        new1.push(...dummy);

        this.setState({
          series: [{ data: new1 }],
        });
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
          type="line"
          height={350}
        />
      </div>
    );
  }
}
export default CountPerDay;
