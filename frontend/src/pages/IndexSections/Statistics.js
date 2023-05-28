import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Chart from "./Chart.js";
import PieChart from "./PieChart.js";
import Bar from "./Bar.js";
import axios from "axios";
import { useState, useEffect } from "react";

const bfr = sessionStorage.getItem("financialType");

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

// var job = []

const goal = {
	buy: 0,
	go: 0,
	collect: 0,
};

var result = [];

export default function Statistics() {
	const [job, setJob] = useState();
	const [category, setCategory] = useState();
	const [bestCategory, setBestCategory] = useState([]);
	const [bestCategoryMessage, setBestCategoryMessage] = useState("");

	useEffect(() => {
		axios
			.get("/statistics/job/" + sessionStorage.getItem("userId"))
			.then((res) => {
				console.log("job", res.data);
				setJob(res.data);
				// category(res.data);
				// const list = res.data.bestCategory;
				// setBestCategory(list);
				// const output = list.map((item, index) => {
				// 	if (index === list.length - 1) {
				// 		return item;
				// 	} else {
				// 		return item + ", ";
				// 	}
				// });

				// setBestCategoryMessage(output);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get("/statistics/gender-age/" + sessionStorage.getItem("userId"))
			.then((response) => {
				result = response.data.result;
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get("/statistics/goal/" + sessionStorage.getItem("userId"))
			.then((res) => {
				setCategory(res.data);
				const list = res.data.bestCategory;
				setBestCategory(list);
				const output = list.map((item, index) => {
					if (index === list.length - 1) {
						return item;
					} else {
						return item + ", ";
					}
				});

				setBestCategoryMessage(output);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid>
				<Grid item>
					<h3
						className="display-3 text-white"
						style={{ textAlign: "center" }}
					>
						직종 통계
					</h3>
					<Item>
						<Chart job={job} />
					</Item>
					{/*<br />*/}
					{/*<h4 className="text-white" style={{textAlign: 'center'}}>*/}
					{/*  <img*/}
					{/*      style={{width: "60px"}}*/}
					{/*      alt="..."*/}
					{/*      src={require("assets/img/statistics/double-quotes1.png")}*/}
					{/*  />*/}
					{/*  {bfr}을 가진 사람들은 '생산직'인 사람이 많네요!*/}
					{/*  <img*/}
					{/*      style={{width: "60px"}}*/}
					{/*      alt="..."*/}
					{/*      src={require("assets/img/statistics/double-quotes2.png")}*/}
					{/*  />*/}
					{/*</h4>*/}
				</Grid>
				<br />
				<Grid item>
					<h2
						className="display-3 text-white"
						style={{ textAlign: "center" }}
					>
						목표 통계
					</h2>
					<Item>
						<PieChart category={category} />
					</Item>
					<br />

					{bestCategory.length > 1 ? (
						<h4
							className="text-white"
							style={{ textAlign: "center" }}
						>
							"{bfr}을 가진 사람들은 '{bestCategoryMessage}'
							목표를 가진 사람이 많네요!"
						</h4>
					) : (
						<h4
							className="text-white"
							style={{ textAlign: "center" }}
						>
							"{bfr}을 가진 사람들은 '{bestCategory}' 목표를 가진
							사람이 많네요!"
						</h4>
					)}
				</Grid>
				<br />
				<Grid item>
					<h2
						className="display-3 text-white"
						style={{ textAlign: "center" }}
					>
						성별/나이 통계
					</h2>
					<Item>
						<Bar />
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
}
