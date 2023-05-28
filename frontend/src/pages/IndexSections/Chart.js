import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default class test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				chart: {
					id: "apexchart-example",
          width: 380,
					type: "bar",
				},
				xaxis: {
					categories: [
						"무직",
						"학생",
						"회사원",
						"자영업자",
						"전문직",
						"프리랜서",
						"공무원",
						"엔지니어",
						"서비스직",
					],
				},
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "명";
          },
          offsetY: -25,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
			},
			series: [
				{
					name: "명 단위",
					data: [2, 3, 4, 10, 4, 3, 3, 2, 1],
				},
			],
		};

		axios
			.get("/statistics/job/" + sessionStorage.getItem("userId"))
			.then((res) => {
				this.state.series = [{
					name: "명 단위",
					data: [
            res.data.inoccupation,
            res.data.student,
            res.data.employee,
            res.data.ownerOperator,
            res.data.specializedJob,
            res.data.freelancer,
            res.data.civilServant,
            res.data.engineer,
            res.data.service,
          ],
				}
      ];

        console.log("this.state.series", this.state.series);
			});

	}

	render() {
		return (
			<Chart
				options={this.state.options}
				series={this.state.series}
				type="bar"
				width={"100%"}
				height={320}
			/>
		);
	}
}
