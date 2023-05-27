import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GoalDetail.css";
import bankLogo from "components/Banks/BankLogo";

import {
	Button,
	Box,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Paper,
	Typography,
	Stack,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import CircularProgress, {
	circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography
					variant="body2"
					color="text.secondary"
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

function makeComma(str) {
	str = String(str);

	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}

const GoalDetail = ({ goalId, onClose }) => {
	const [goalDetail, setGoalDetail] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [updatedGoalName, setUpdatedGoalName] = useState("");
	const [updatedGoalAmount, setUpdatedGoalAmount] = useState("");
	const [updatedSavingAmount, setUpdatedSavingAmount] = useState("");
	const [updatedGoalImage, setUpdatedGoalImage] = useState("");
	const [updatedDay, setUpdatedDay] = useState("");
	const [showPopup, setShowPopup] = useState(false);
	const [rule, setRule] = useState("");
	const [progress, setProgress] = React.useState(0);
	const [withdrawBankName, setWithdrawBankName] = useState("");
	const [withdrawAccountNum, setWithdrawAccountNum] = useState("");
	const [savingBankName, setSavingBankName] = useState("");
	const [savingAccountNum, setSavingAccountNum] = useState("");
	const [savingHistory, setSavingHistory] = useState([]);

	useEffect(() => {
		axios
			.get(`/rule/${goalId}`)
			.then((res) => {
				setRule(res.data);
				console.log("규칙 세부사항", res.data);
				setProgress(res.data.percent);
				setWithdrawBankName(res.data.withdrawInfo["bankName"]);
				setWithdrawAccountNum(res.data.withdrawInfo["accountNo"]);
				setSavingBankName(res.data.savingInfo["bankName"]);
				setSavingAccountNum(res.data.savingInfo["accountNo"]);
				setSavingHistory(res.data.savingHistory);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`/goal/detail/${goalId}`)
			.then((res) => {
				setGoalDetail(res.data);
				console.log("목표 세부사항", res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [goalId]);

	const handleEditClick = () => {
		setIsEditing(true);
		setUpdatedGoalName(goalDetail.goalName);
		setUpdatedGoalAmount(goalDetail.goalAmount);
		setUpdatedSavingAmount(goalDetail.savingAmount);
		setUpdatedGoalImage(goalDetail.goalImage);
		setUpdatedDay(goalDetail.day);
	};

	const handleSaveClick = () => {
		const updatedGoal = {
			...goalDetail, // 원래의 goalDetail 데이터를 복사
			goalName: updatedGoalName,
			goalAmount: updatedGoalAmount,
			savingAmount: updatedSavingAmount,
			goalImage: updatedGoalImage,
			day: updatedDay,
		};

		axios
			.put(`/goal/${goalId}`, updatedGoal)
			.then((res) => {
				console.log("Goal updated successfully");
				setIsEditing(false);
				setGoalDetail(res.data);
				onClose();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleDeleteClick = () => {
		const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
		if (confirmDelete) {
			axios
				.delete(`/goal/${goalId}`)
				.then((res) => {
					console.log("Goal deleted successfully");
					onClose(); // 삭제 후 창 닫기
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	if (!goalDetail) {
		return <div>Loading...</div>;
	}

	const WithdrawList = () => {
		return (
			<div className="withdrawList">
				<div>
					<div className="text-primary ml--4 btn btn-link subTitle">
						출금 계좌
					</div>
					<div>
						<small>
							{sessionStorage.getItem("name")}님이 설정한
							저축금액이 빠져나가는 계좌에요.
						</small>
					</div>
					<div style={{ marginBottom: "20px" }}></div>
					<div style={{ textAlign: "left" }}>
						<button
							type="button"
							style={{
								marginBottom: "5px",
								textAlign: "left",
								width: "100%",
								display: "flex",
							}}
							className="text-primary btn-neutral ml-1 btn btn-primary "
						>
							<table style={{ marginRight: "auto" }}>
								<tr>
									<th rowSpan="2">
										<span>
											{bankLogo(withdrawBankName)}
										</span>
									</th>
									<th
										style={{
											fontSize: "12px",
											textAlign: "left",
											marginRight: "10px",
										}}
									>
										{withdrawBankName}
									</th>
								</tr>
								<tr>
									<th
										style={{
											fontSize: "16px",
											textAlign: "right",
										}}
									>
										{withdrawAccountNum}
									</th>
								</tr>
							</table>
						</button>
					</div>
				</div>
			</div>
		);
	};

	const SavingList = () => {
		return (
			<div className="savingList">
				<div>
					<div className="text-primary ml--4 btn btn-link subTitle">
						저금 계좌
					</div>
					<div>
						<small>
							{sessionStorage.getItem("name")}님이 설정한 저축금액
							쌓이는 계좌에요.
						</small>
					</div>
					<div style={{ marginBottom: "20px" }}></div>
					<div style={{ textAlign: "left" }}>
						<button
							type="button"
							style={{
								marginBottom: "5px",
								textAlign: "left",
								width: "100%",
								display: "flex",
							}}
							className="text-primary btn-neutral ml-1 btn btn-primary "
						>
							<table style={{ marginRight: "auto" }}>
								<tr>
									<th rowSpan="2">
										<span>{bankLogo(savingBankName)}</span>
									</th>
									<th
										style={{
											fontSize: "12px",
											textAlign: "left",
											marginRight: "10px",
										}}
									>
										{savingBankName}
									</th>
								</tr>
								<tr>
									<th
										style={{
											fontSize: "16px",
											textAlign: "right",
										}}
									>
										{savingAccountNum}
									</th>
								</tr>
							</table>
						</button>
					</div>
				</div>
			</div>
		);
	};

	function convertDateTime(dateTime) {
		return dateTime.slice(0, 10) + " " + dateTime.slice(11, 19);
	}

	const tableRows = savingHistory.map((item) => (
		<TableRow
			key={item.id}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell align="right" className="tbcell">
				{convertDateTime(item.savingDate)}
			</TableCell>
			<TableCell align="right" className="tbcell">
				{makeComma(item.savingAmount)}
			</TableCell>
		</TableRow>
	));

	return (
		<>
			<div>
				<h1>{goalDetail.goalName}</h1>
				<p style={{ marginTop: "-10px", marginLeft: "50px" }}>
					{goalDetail.category}
				</p>
				<hr style={{ width: "100%", marginTop: "-10px" }}></hr>
			</div>
			<div>
				<div className=" text-primary ml--4 btn btn-link percent">
					저축 진행 현황
				</div>
				<Box sx={{ width: "100%" }}>
					<LinearProgressWithLabel value={progress} />
				</Box>
				<div className="text-muted mb-4">
					<WithdrawList />
				</div>
				<div className="text-muted mb-4">
					<SavingList />
				</div>
				<div className=" text-primary ml--4 btn btn-link subTitle">
					규칙
				</div>
				<div style={{ marginBottom: "5px" }}>
					<small>
						매월 {goalDetail.day}일{" "}
						{makeComma(goalDetail.goalAmount)}원씩
					</small>
				</div>
				<div className="text-primary ml--4 btn btn-link subTitle">
					입금 내역
				</div>
				<div>
					<Table
						sx={{ minWidth: 650 }}
						size="small"
						aria-label="a dense table"
					>
						<TableHead>
							<TableBody></TableBody>
							<tbody style={{ width: "100%" }}>{tableRows}</tbody>
						</TableHead>
					</Table>
				</div>
			</div>
			<Stack
				direction="row"
				spacing={1}
				justifyContent="flex-end"
				alignItems="flex-start"
			>
				<Button variant="contained" onClick={handleEditClick}>
					목표 수정
				</Button>
				<Button variant="contained" onClick={handleDeleteClick}>
					목표 삭제
				</Button>
			</Stack>
		</>
	);
};

export default GoalDetail;
