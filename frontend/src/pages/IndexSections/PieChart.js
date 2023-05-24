import React, { Component } from 'react';
import Chart from 'react-apexcharts'

export default class test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example',
          width: 380,
          type: 'pie'
        }
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      series: [44, 55, 13, 43, 22]
    }
  }
  render() {
    return (
        <Chart options={this.state.options} series={this.state.series} type="pie" width="100%" height={320} />
    )
  }
}
