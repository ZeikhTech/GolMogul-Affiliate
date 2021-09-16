import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";
import loaderImage from "../Admin/images/loader2.svg";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWeekUsers: 0,
      currentMonthFoll: 0,
      totalFoll: 0,
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
    this.props.loaderActive(true);
    let result = await apiHelper(
      "post",
      "api/affDashboard/PiChartData",
      data,
      token
    );

    if (result) {
      if (result.status == 200) {
        var currentWeekUsers = result.thisWeekFoll;
        var currentMonthFoll = result.thisMonthFoll;

        var totalFoll = result.totalFollCount;
        this.setState({
          currentWeekUsers: currentWeekUsers,
          currentMonthFoll: currentMonthFoll,
          totalFoll: totalFoll,
        });

        var series1 = [
          {
            data: [
              this.state.currentWeekUsers,
              this.state.currentMonthFoll,
              this.state.totalFoll,
            ],
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
              <h5 className="text_blue">{this.state.currentWeekUsers}</h5>
              <p>This Week</p>
            </li>
            <li>
              <h5 className="text_info">{this.state.currentMonthFoll}</h5>
              <p>This Month</p>
            </li>
            <li>
              <h5 className="text_orange">{this.state.totalFoll}</h5>
              <p>Total</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default ApexChart;
