import React, { Component } from 'react';
import Chart from 'react-apexcharts'

export default class test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: ['무직', '학생', '회사원', '자영업자', '전문직', '프리랜서', '공무원', '엔지니어', '서비스직']
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }]
    }
  }
  render() {
    return (
        <Chart options={this.state.options} series={this.state.series} type="bar" width="100%" height={320} />
    )
  }
}
