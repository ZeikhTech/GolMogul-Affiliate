import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";
import loaderImage from "../Admin/images/loader.svg";

class ApexChart extends React.Component {
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
        colors: ["#A69BA1", "#008FFB", "#FEB019"],
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
            ["", ""],
            ["", ""],
            ["", ""],
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

    const token = localStorage.getItem("LoginSession");
    var data = {
      id: this.props.props,
    };
    this.setState({ loaderActive: true });

    let result = await apiHelper(
      "post",
      "api/affDashboard/PiChartData",
      data,
      token
    );
    this.setState({ loaderActive: false });

    if (result) {
      if (result.status == 200) {
        var currentMonthUsers = result.currentMonthUsers;
        var LastMonthUser = result.LastMonthUser;

        var lastYearUsers = result.lastYearUsers;
        this.setState({
          currentMonthUsers: currentMonthUsers,
          LastMonthUser: LastMonthUser,
          lastYearUsers: lastYearUsers,
        });

        var series1 = [
          { data: [currentMonthUsers, LastMonthUser, lastYearUsers] },
        ];
        this.setState({
          series: series1,
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
          type="bar"
          height={350}
        />
        <div className="chart_value">
          <ul>
            <li>
              <h5 className="text_blue">{this.state.currentMonthUsers}</h5>
              <p>Current Month</p>
            </li>
            <li>
              <h5 className="text_info">{this.state.LastMonthUser}</h5>
              <p>Last Month</p>
            </li>
            <li>
              <h5 className="text_orange">{this.state.lastYearUsers}</h5>
              <p>Last Year</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default ApexChart;
