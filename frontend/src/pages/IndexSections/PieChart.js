import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default class test extends Component {
	constructor(props) {
		super(props);
		const bfr = props.bfr;
		let bestCategory = "";
		console.log(props);
		this.state = {
			options: {
				chart: {
					id: "apexchart-example",
					width: 380,
					type: "pie",
				},
				labels: ["사보자", "가보자", "모으자"],
			},
			series: [0, 0, 0],
		};

		axios
			.get("/statistics/goal/" + sessionStorage.getItem("userId"))
			.then((res) => {
        console.log("data", res.data);
				this.state.series = [
					res.data.buy,
					res.data.go,
					res.data.collect,
				];
				bestCategory = res.data.bestCategory;
				console.log(bestCategory);
			});
	}

	render() {
		return (
			<Chart
				options={this.state.options}
				series={this.state.series}
				type="pie"
				width="100%"
				height={320}
			>
			</Chart>
		);
	}
}
