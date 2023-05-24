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
          type: 'bar'
        },
        xaxis: {
          categories: ['10대', '20대', '30대', '40대', '50대', '60대', '70대'],
        }
      },

      series: [{
        name: '남',
        data: [44, 55, 41, 64, 22, 43, 21]
      }, {
        name: '여',
        data: [53, 32, 33, 52, 13, 44, 32]
      }]
    }
  }
  render() {
    return (
        <Chart options={this.state.options} series={this.state.series} type="bar" width="100%" height={320} />
    )
  }
}
