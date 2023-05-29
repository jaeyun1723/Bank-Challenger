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

export default function Statistics() {
	const [bestJob, setBestJob] = useState([]);
	const [bestJobMessage, setBestJobMessage] = useState("");
	const [bestGenderAgeMessage, setBestGenderAgeMessage] = useState("");
	const [bestCategory, setBestCategory] = useState([]);
	const [bestCategoryMessage, setBestCategoryMessage] = useState("");

	useEffect(() => {
		axios
			.get("/statistics/goal/" + sessionStorage.getItem("userId"))
			.then((res) => {
				const list = res.data.bestCategory;
				setBestCategory(list);
				const output = "";
				if (list.length > 0) {
					output = list.map((item, index) => {
						if (index === list.length - 1) {
							return item;
						} else {
							return item + ", ";
						}
					});
				} else {
					setBestCategory(null);
				}
				setBestCategoryMessage(output);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get("/statistics/job/" + sessionStorage.getItem("userId"))
			.then((res) => {
				setBestJob(res.data.bestJob);
				const list = res.data.bestJob;
				const output = "";
				if (list.length > 0) {
					output = list.map((item, index) => {
						if (index === list.length - 1) {
							return item;
						} else {
							return item + ", ";
						}
					});
				} else {
					setBestJob(null);
				}
				setBestJobMessage(output);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get("/statistics/gender-age/" + sessionStorage.getItem("userId"))
			.then((res) => {
				setBestGenderAgeMessage(res.data.bestGenderAge);
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
						<Chart />
					</Item>
					<br />
					{bestJob.length >= 2 && (
						<h4
							className="text-white"
							style={{ textAlign: "center" }}
						>
							"{bfr}을 가진 사람들은 '{bestJobMessage}'인 사람이
							많네요!
						</h4>
					)}
					{bestJob.length === 1 && (
						<h4
							className="text-white"
							style={{ textAlign: "center" }}
						>
							"{bfr}을 가진 사람들은 '{bestJob}' 인 사람이 많네요!"
						</h4>
					)}
				</Grid>
				<br />
				{bestCategory != null && (
					<Grid item>
						<h2
							className="display-3 text-white"
							style={{ textAlign: "center" }}
						>
							목표 통계
						</h2>
						<Item>
							<PieChart />
						</Item>
						<br />
						{bestCategory.length >= 2 && (
							<h4
								className="text-white"
								style={{ textAlign: "center" }}
							>
								"{bfr}을 가진 사람들은 '{bestCategoryMessage}'
								목표를 가진 사람이 많네요!"
							</h4>
						)}
						{bestCategory.length === 1 && (
							<h4
								className="text-white"
								style={{ textAlign: "center" }}
							>
								"{bfr}을 가진 사람들은 '{bestCategory}' 목표를
								가진 사람이 많네요!"
							</h4>
						)}
					</Grid>
				)}
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
					<br />
					<h4
							className="text-white"
							style={{ textAlign: "center" }}
						>
							"{bfr}을 가진 사람들은 '{bestGenderAgeMessage}'인 사람이
							많네요!"
						</h4>
				</Grid>
			</Grid>
		</Box>
	);
}
