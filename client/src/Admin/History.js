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
      thisMonthAffilCount: 0,
      totalAffilCount: 0,
      // loaderActive: false,

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
        var thisMonthAffilCount = result.thisMonthAffilCount;

        var totalAffilCount = result.totalAffilCount;
        console.log(
          result.thisWeekAffilCount,
          result.thisMonthAffilCount,
          result.totalAffilCount
        );
        this.setState({
          thisWeekAffilCount: thisWeekAffilCount,
          thisMonthAffilCount: thisMonthAffilCount,
          totalAffilCount: totalAffilCount,
        });

        var series1 = [
          {
            data: [thisWeekAffilCount, thisMonthAffilCount, totalAffilCount],
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
        {/* {this.state.loaderActive ? (
          <div className="inlineLoaderGif">
            <img src={loaderImage} alt="broken" />
          </div>
        ) : (
          ""
        )}{" "} */}
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
              <h5 className="text_info">{this.state.thisMonthAffilCount}</h5>
              <p>This Month</p>
            </li>
            <li>
              <h5 className="text_orange">{this.state.totalAffilCount}</h5>
              <p>Total</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default ApexChart;
