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
					type: "bar",
				},
				xaxis: {
					categories: [
						"10대",
						"20대",
						"30대",
						"40대",
						"50대",
						"60대",
						"70대",
					],
				},
			},

			series: [
				{
					name: "남",
					data: [1, 1, 1, 1, 2, 1, 1],
				},
				{
					name: "여",
					data: [2, 1, 2, 2, 3, 1, 1],
				},
			],
		};

		axios
			.get("/statistics/gender-age/" + sessionStorage.getItem("userId"))
			.then((res) => {

        this.state.series = [
          {
            name: "남",
            data: [
              res.data.result[0].man, 
              res.data.result[1].man,
              res.data.result[2].man, 
              res.data.result[3].man, 
              res.data.result[4].man, 
              res.data.result[5].man, 
              res.data.result[6].man],
          },
          {
            name: "여",
            data: [
              res.data.result[0].woman, 
              res.data.result[1].woman,
              res.data.result[2].woman, 
              res.data.result[3].woman, 
              res.data.result[4].woman, 
              res.data.result[5].woman, 
              res.data.result[6].woman],
          },
        ]
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
