import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GoalMain.css";
import GoalDetail from "./GoalDetail";
import axios from "axios";
import GoalFirstMain from "./GoalFirstMain";
import { Card } from "reactstrap";
import "./CreateGoal.css";
import RegisterRule from "./RegisterRule";
import { Box, Stack } from "@mui/material";
import { Progress, Col } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { Button, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function GoalMain({ userId }) {
	if (userId === null) {
		window.location.href = "/";
	}
	const [showCreateGoal, setShowCreateGoal] = useState(false);
	const [showGoalDetail, setShowGoalDetail] = useState(false);
	const [showRule, setShowRule] = useState(false);
	const [selectedGoal, setSelectedGoal] = useState(null);
	const [goals, setGoals] = useState([]);
	const [percentMap, setPercentMap] = useState();
	const useStyles = makeStyles((theme) => ({
		button: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			height: "250px",
			width: "200px",
			backgroundColor: "#EBD3B0",
			borderRadius: "30px",
			color: "white",
			"&:hover": {
				backgroundColor: "gray", 
				boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
			},
		},
	}));

	const updateGoals = () => {
		axios
			.get(`/goal/list/${userId}`)
			.then((res) => {
				setGoals(res.data.goals);
				setPercentMap(res.data.percentMap);
			})
			.catch((err) => {
				console.error(err);
				setGoals([]);
			});
	};

	useEffect(() => {
		axios
			.get(`/goal/list/${userId}`)
			.then((res) => {
				setGoals(res.data.goals);

				setPercentMap(res.data.percentMap);
			})
			.catch((err) => {
				console.error(err);
				setGoals([]);
			});
	}, [userId]);

	const handleSlideClick = (goalId) => {
		axios
			.get(`/goal/detail/${goalId}`)
			.then((res) => {
				setSelectedGoal(res.data);
				setShowGoalDetail(true);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleSlideMouseEnter = (e) => {
		e.currentTarget.style.backgroundColor = "#172b4d";
		e.currentTarget.style.color = "#f0f0f0";
	};

	const handleSlideMouseLeave = (e) => {
		e.currentTarget.style.backgroundColor = "#7691F6";
		e.currentTarget.style.color = "#f0f0f0";
	};
	const handleButtonMouseEnter = (e) => {
		e.currentTarget.style.backgroundColor = "#D3D3D3";
		e.currentTarget.style.color = "#f0f0f0";
	};
	const handleButtonMouseLeave = (e) => {
		e.currentTarget.style.backgroundColor = "#EBD3B0";
		e.currentTarget.style.color = "#f0f0f0";
	};

	const handleCreateGoalClick = () => {
		setShowCreateGoal(true);
	};

	const handleGoalDetailClose = () => {
		setShowGoalDetail(false);
		updateGoals();
	};

	const handleAddRule = (goal) => {
		setSelectedGoal(goal);
		setShowRule(true);
	};

	const handleRuleClose = () => {
		setShowRule(false);
	};
	const classes = useStyles();

	const handleGoalDeleteClick = (goalId) => {
		const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
		if (confirmDelete) {
			axios
				.delete(`/goal/${goalId}`)
				.then((res) => {
					console.log("Goal deleted successfully");
					handleGoalDetailClose(); // 삭제 후 창 닫기
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	console.log(goals.percentMap);

	function reverseList(list) {
		let reversed = [];
		for (let i = list.length - 1; i >= 0; i--) {
			reversed.push(list[i]);
		}
		return reversed;
	}

	function numberWithCommas(money) {
		let result = money.toString().split("");
		result = reverseList(result);
		for (let i = 0; i < result.length; i++) {
			if ((i + 1) % 4 === 0 && i !== 0) {
				result.splice(i, 0, ",");
			}
		}
		result = reverseList(result);
		return result.join("");
	}

	return (
		<div className="container mukho">
			{goals.length === 0 && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "100px",
					}}
				>
					<Button
						color="primary"
						onClick={handleCreateGoalClick} 
						onMouseEnter={handleButtonMouseEnter} 
						onMouseLeave={handleButtonMouseLeave}
						className={classes.button}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<div
								style={{
									marginTop: "-40px",
									marginBottom: "30px",
									fontSize: "25px",
								}}
							>
								목표 생성하기
							</div>

							<AddIcon style={{ fontSize: 70 }} />
						</div>
					</Button>
				</div>
			)}
			<Slider
				dots={true}
				infinite={false}
				speed={500}
				slidesToShow={3}
				slidesToScroll={1}
				centerPadding="20px"
				arrows={true}
			>
				{goals.map((goal) => (
					<Card className="muk d-flex justify-content-center align-items-center">
						<div
							className="slide"
							onClick={() => handleSlideClick(goal.goalId)}
							onMouseEnter={handleSlideMouseEnter}
							onMouseLeave={handleSlideMouseLeave}
							key={goal.goalId}
						>
							<div
								className="bookmark"
								style={{ backgroundColor: goal.goalImage }}
							/>
							<h3>{goal.goalName}</h3>
							<h2
								style={{
									fontSize: "25px",
								}}
							>
								{numberWithCommas(goal.goalAmount)}원
							</h2>
							<h2>{goal.startDate}</h2>
						</div>
						{(goal.day === "null" || goal.day === "") && (
							<Button
								className="ho"
								onClick={() => handleAddRule(goal)}
								style={{
									width: "60%",
									justifyContent: "center",
								}}
							>
								규칙 추가
							</Button>
						)}
						{goal.day !== "null" && goal.day !== "" && (
							<div
								style={{
									width: "175%",
									justifyContent: "center",
									display: "flex",
								}}
							>
								<Col lg="5">
									<div className="progress-wrapper ho2">
										<div className="progress-info">
											<div className="progress-label">
												<span
													style={{
														color: "white",
														fontSize: "14px",
													}}
												>
													진행도
												</span>
											</div>
											<div className="progress-percentage">
												<span
													style={{ color: "white" }}
												>
													{percentMap[goal.goalId]}%
												</span>
											</div>
										</div>
										<Progress
											max="100"
											value={percentMap[goal.goalId]}
											color="green"
										/>
									</div>
								</Col>
							</div>
						)}
					</Card>
				))}
			</Slider>
			{goals.length !== 0 && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "50px",
					}}
				>
					<Button
						color="primary"
						onClick={handleCreateGoalClick}
						onMouseEnter={handleSlideMouseEnter}
						onMouseLeave={handleSlideMouseLeave}
						style={{
							width: "33%",
							backgroundColor: "#7691F6",
							border: "0",
							color: "white",
						}}
					>
						목표 생성
					</Button>
				</div>
			)}

			{showCreateGoal && (
				<div
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "white",
						padding: "1em",
						zIndex: 1000,
						borderRadius: "10px",
					}}
				>
					<GoalFirstMain />
					<img
						src={require("../assets/img/icons/common/back-button.png")}
						alt="back-button"
						style={{
							width: "35px",
							cursor: "pointer",
							position: "fixed",
							top: 17,
							left: 8,
						}}
						onClick={() => setShowCreateGoal(false)}
					></img>
				</div>
			)}

			{showCreateGoal && (
				<div
					style={{
						position: "fixed",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						backgroundColor: "rgba(0, 0, 0, 0.7)",
						zIndex: 999,
					}}
					onClick={() => setShowCreateGoal(false)}
				/>
			)}

			{showGoalDetail && selectedGoal && (
				<div className="modal-outer">
					<div
						style={{
							position: "fixed",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							backgroundColor: "white",
							padding: "1em",
							zIndex: 1000,
							width: "50%",
							height: "75%",
							borderRadius: "10px",
						}}
					>
						<Box sx={{ width: "100%", height: "95%" }}>
							<Scrollbars
								thumbSize={85}
								renderTrackVertical={({ style, ...props }) => {
									return (
										<div
											{...props}
											className="track-vertical"
											style={{
												...style,
												borderRadius: "3px",
											}}
										/>
									);
								}}
								renderThumbHorizontal={(props) => (
									<div
										{...props}
										className="thumb-horizontal"
									/>
								)}
								renderThumbVertical={(props) => (
									<div
										{...props}
										className="thumb-vertical"
									/>
								)}
								renderView={(props) => (
									<div {...props} className="view" />
								)}
							>
								<GoalDetail
									goal={selectedGoal}
									goalId={selectedGoal.goalId}
									onClose={handleGoalDetailClose}
								/>
								<Stack
									direction="row"
									spacing={1}
									justifyContent="flex-end"
									alignItems="flex-start"
									paddingBottom="25px"
								>
									<Button
										variant="contained"
										onClick={() =>
											handleAddRule(selectedGoal)
										}
									>
										목표 수정
									</Button>
									<Button
										variant="contained"
										onClick={() =>
											handleGoalDeleteClick(
												selectedGoal.goalId
											)
										}
									>
										목표 삭제
									</Button>
								</Stack>
							</Scrollbars>
						</Box>
					</div>
				</div>
			)}

			{showGoalDetail && (
				<div
					style={{
						position: "fixed",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						backgroundColor: "rgba(0, 0, 0, 0.7)",
						zIndex: 999,
					}}
					onClick={handleGoalDetailClose}
				/>
			)}

			{showRule && (
				<div
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "white",
						padding: "1em",
						zIndex: 1000,
						width: "50%",
						height: "90%",
						borderRadius: "10px",
					}}
				>
					<Scrollbars
						thumbSize={85}
						renderTrackVertical={({ style, ...props }) => {
							return (
								<div
									{...props}
									className="track-vertical"
									style={{ ...style, borderRadius: "3px" }}
								/>
							);
						}}
						renderThumbHorizontal={(props) => (
							<div {...props} className="thumb-horizontal" />
						)}
						renderThumbVertical={(props) => (
							<div {...props} className="thumb-vertical" />
						)}
						renderView={(props) => (
							<div {...props} className="view" />
						)}
					>
						<RegisterRule
							goal={selectedGoal}
							onClose={handleRuleClose}
						/>
					</Scrollbars>
				</div>
			)}

			{showRule && (
				<div
					style={{
						position: "fixed",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						backgroundColor: "rgba(0, 0, 0, 0.7)",
						zIndex: 999,
					}}
					onClick={handleRuleClose}
				/>
			)}
		</div>
	);
}

export default GoalMain;
