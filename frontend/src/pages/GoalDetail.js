import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GoalDetail.css";
import bankLogo from "components/Banks/BankLogo";

import {
	Box,
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	LinearProgress,
	styled,
} from "@mui/material";

import CircularProgress, {
	circularProgressClasses,
} from "@mui/material/CircularProgress";

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

const GoalDetail = ({ goal, goalId, onClose }) => {
	const [goalDetail, setGoalDetail] = useState(null);
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
		<div style={{padding:"1em"}}>
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
							<tbody style={{ width: "100%"}}>{tableRows}</tbody>
						</TableHead>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default GoalDetail;
