import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";
import loaderImage from "./images/loader2.svg";

var moment = require("moment");
class CountPerDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.loaderActive(true);

    let result = await apiHelper(
      "get",
      `api/affiliate/affiliatesInThisMonth`,
      "",
      token
    );

    if (result) {
      if (result.status == 200) {
        var limit = result.affiliatesListings.length;

        var new1 = [];
        for (var i = 1; i < presentDate; i++) {
          new1.push(0);
        }
        for (var i = 0; i < limit; i++) {
          new1[
            parseInt(result.affiliatesListings[i]._id.toString().substr(8, 2))
          ] = result.affiliatesListings[i].count;
        }
        // console.log("new1", new1);

        this.setState({
          series: [{ data: new1 }],
        });
      } else {
        this.setState({ errors: result.message });
      }
    }
    this.props.loaderActive(false);
  }
  render() {
    return (
      <div>
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
