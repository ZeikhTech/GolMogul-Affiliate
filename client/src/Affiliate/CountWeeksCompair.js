import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thisWeekFollCount: 0,
      prevWeekFollCount: 0,

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
    var data = {
      id: this.props.props,
    };
    let result = await apiHelper(
      "post",
      "api/affDashboard/PiChartData",
      data,
      token
    );

    if (result) {
      if (result.status == 200) {
        this.setState({ loaderActive: true });
        var thisWeekFollCount = result.thisWeekFoll;
        var prevWeekFollCount = result.lastWeekFolls;
        this.setState({
          thisWeekFollCount: thisWeekFollCount,
          prevWeekFollCount: prevWeekFollCount,
        });

        var series1 = [
          {
            data: [this.state.thisWeekFollCount, this.state.prevWeekFollCount],
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
              <h5 className="text_blue">{this.state.thisWeekFollCount}</h5>
              <p>This Week</p>
            </li>
            <li>
              <h5 className="text_info">{this.state.prevWeekFollCount}</h5>
              <p>Last Week</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default ApexChart;
