import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";
import loaderImage from "./images/loader2.svg";

class AllUsersHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonthUsers: "",
      LastMonthUsers: "",
      lastYearUsers: "",

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
    this.props.loaderActive(true);

    let result = await apiHelper(
      "get",
      "api/admin/allUsersPiChartData",
      "",
      token
    );
    if (result) {
      if (result.status == 200) {
        var currentMonthUsers = result.currentMonthUsers;
        var LastMonthUsers = result.LastMonthUsers;

        var lastYearUsers = result.lastYearUsers;
        // console.log(result.currentMonthUsers, LastMonthUsers, lastYearUsers);

        this.setState({
          currentMonthUsers: currentMonthUsers,
          LastMonthUsers: LastMonthUsers,
          lastYearUsers: lastYearUsers,
        });

        var series1 = [
          {
            data: [currentMonthUsers, LastMonthUsers, lastYearUsers],
          },
        ];
        this.setState({
          series: series1,
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
          type="bar"
          height={350}
        />
        <div className="chart_value">
          <ul>
            <li>
              <h5 className="text_blue">{this.state.currentMonthUsers}</h5>
              <p>This Week</p>
            </li>
            <li>
              <h5 className="text_info">{this.state.LastMonthUsers}</h5>
              <p>This Month</p>
            </li>
            <li>
              <h5 className="text_orange">{this.state.lastYearUsers}</h5>
              <p>Total</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default AllUsersHistory;
