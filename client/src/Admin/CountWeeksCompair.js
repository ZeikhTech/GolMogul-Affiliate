import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";
import loaderImage from "./images/loader.svg";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thisWeekAffilCount: 0,
      lastWeekAffilCount: 0,

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
    // this.setState({
    //   loaderActive: true,
    // });
    let result = await apiHelper(
      "get",
      "api/affiliate/affiliatesPiChartData",
      "",
      token
    );
    // this.setState({
    //   loaderActive: false,
    // });
    if (result) {
      if (result.status == 200) {
        this.setState({ loaderActive: true });

        var thisWeekAffilCount = result.thisWeekAffilCount;
        var prevWeekAffilCount = result.prevWeekAffilCount;
        // console.log("thisWeekAffilCount", thisWeekAffilCount);
        this.setState({
          thisWeekAffilCount: thisWeekAffilCount,
          lastWeekAffilCount: prevWeekAffilCount,
        });

        var series1 = [
          {
            data: [
              thisWeekAffilCount,
              this.state.lastWeekAffilCount,
              // , previosWeekCount
            ],
          },
        ];
        this.setState({
          series: series1,
        });
        // this.setState({ loaderActive: false });
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
              <h5 className="text_blue">{this.state.thisWeekAffilCount}</h5>
              <p>This Week</p>
            </li>
            <li>
              <h5 className="text_info">{this.state.lastWeekAffilCount}</h5>
              <p>Last Week</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default ApexChart;
