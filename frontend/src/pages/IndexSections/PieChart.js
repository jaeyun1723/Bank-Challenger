import React, {Component} from 'react';
import Chart from 'react-apexcharts'
import axios from "axios";

export default class test extends Component {
  constructor(props) {
    super(props);
    const bfr = props.bfr
    let bestCategory = ''
    // console.log(props.bfr)
    this.state = {
      options: {
        chart: {
          id: 'apexchart-example',
          width: 380,
          type: 'pie'
        },
        labels: ['사보자', '가보자', '모으자']
      },
      series: [0, 0, 0]
    }

    axios.get("/statistics/goal/" + sessionStorage.getItem("userId"))
    .then(res => {
          this.state.series = [
            res.data.buy,
            res.data.go,
            res.data.collect
          ]
          bestCategory = res.data.bestCategory
          console.log(bestCategory)
        }
    )
  }

  render() {
    return (
        <Chart options={this.state.options} series={this.state.series}
               type="pie" width="100%" height={320}>
          <br/>
          {/*<h4 className="text-white" style={{textAlign: 'center'}}>*/}
          {/*  <img*/}
          {/*      style={{width: "60px"}}*/}
          {/*      alt="..."*/}
          {/*      src={require("assets/img/statistics/double-quotes1.png")}*/}
          {/*  />*/}
          {/*  {this.bfr}을 가진 사람들은 {this.bestCategory} 목표를 가진 사람이 많네요!*/}
          {/*  <img*/}
          {/*      style={{width: "60px"}}*/}
          {/*      alt="..."*/}
          {/*      src={require("assets/img/statistics/double-quotes2.png")}*/}
          {/*  />*/}
          {/*</h4>*/}
        </Chart>
    )
  }
}
