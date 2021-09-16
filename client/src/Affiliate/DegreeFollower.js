import React from "react";
import ReactDOM from "react-dom";
import Chart, { colors } from "react-apexcharts";
import apiHelper from "./Helper/ApiHelper";
import $ from "jquery";

class DegreeFollower extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstDegreeCount: 0,
      secondDegreeCount: 0,

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
    console.log("token ye ha ", token);
    this.props.loaderActive(true);
    var data = {
      id: this.props.props,
    };
    let result = await apiHelper(
      "post",
      "api/affilDashboard/degreeFollowers",
      data,
      token
    );

    if (result) {
      console.log("result", result);
      if (result.status == 200) {
        this.setState({ loaderActive: true });
        var firstDegreeCount = result.firstDegreeCount;
        var secondDegreeCount = result.secondDegreeCount;
        this.setState({
          firstDegreeCount: firstDegreeCount,
          secondDegreeCount: secondDegreeCount,
        });

        var series1 = [
          {
            data: [this.state.firstDegreeCount, this.state.secondDegreeCount],
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
              <h5 className="text_blue">{this.state.firstDegreeCount}</h5>
              <p>First Degree</p>
            </li>
            <li>
              <h5 className="text_info">{this.state.secondDegreeCount}</h5>
              <p>Second Degree</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default DegreeFollower;
