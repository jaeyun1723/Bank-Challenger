import React, {Component} from 'react';
import Chart from 'react-apexcharts'
import axios from "axios";

export default class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: ['무직', '학생', '회사원', '자영업자', '전문직', '프리랜서', '공무원', '엔지니어',
            '서비스직']
        }
      },
      series: [{
        name: '명 단위',
        data: []
      }]
    }
    axios.get("/statistics/job/" + sessionStorage.getItem("userId"))
    .then(res => {
          this.state.series.data = [
            res.data.inoccupation,
            res.data.student,
            res.data.employee,
            res.data.ownerOperator,
            res.data.specializedJob,
            res.data.freelancer,
            res.data.civilServant,
            res.data.engineer,
            res.data.service
          ]
        }
    )
  }

  render() {
    return (
        <Chart options={this.state.options} series={this.state.series}
               type="bar" width="100%" height={320}/>
    )
  }
}
