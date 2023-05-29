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
				},
				labels: ["사보자", "가보자", "모으자"],
			},
			series: [0, 0, 0],
		};

		axios
			.get("/statistics/goal/" + sessionStorage.getItem("userId"))
			.then((res) => {
				console.log("goal", res.data);
				this.state.series = [
					res.data.buy,
					res.data.go,
					res.data.collect,
				];
			});
	}

	render() {
		return (
			<Chart
				options={this.state.options}
				series={this.state.series}
				type="pie"
				width={"100%"}
				height={320}
			/>
		);
	}
}
