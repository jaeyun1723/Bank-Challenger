import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import axios from "axios";

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
        data: []
      }, {
        name: '여',
        data: []
      }]
    }

    axios.get("/statistics/gender-age/" + sessionStorage.getItem("userId"))
    .then(res => {
          for (let i = 0; i < 7; i++) {
            this.state.series[0].data.push(res.data.result[i].man)
            this.state.series[1].data.push(res.data.result[i].woman)
            console.log(res.data.result[i])
          }
          console.log(this.state.series[0].data)
          // console.log(res.data.result)
        }
    )
  }
  render() {
    return (
        <Chart options={this.state.options} series={this.state.series} type="bar" width="100%" height={320} />
    )
  }
}
