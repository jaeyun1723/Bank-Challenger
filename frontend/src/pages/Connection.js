import React, { useState, useEffect } from "react";
import RegisterRule from "./RegisterRule";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";

function Connection() {
	const [showRegisterRule, setShowRegisterRule] = useState(false);
	const [showSecondText, setShowSecondText] = useState(false);
	const [showThirdText, setShowThirdText] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const history = useHistory();
	useEffect(() => {
		setTimeout(() => {
			setShowSecondText(true);
		}, 0); // Delay in milliseconds for the second text

		setTimeout(() => {
			setShowThirdText(true);
		}, 0); // Delay in milliseconds for the third text

		setTimeout(() => {
			setShowButton(true);
		}, 0); // Delay in milliseconds for the third text
	}, []);

	const handleNext = () => {
		setShowRegisterRule(true);
	};
	const handleGoalMainRedirect = () => {
		window.location.href = "/goal";
	};

	return (
		<>
			{showRegisterRule ? (
				<RegisterRule />
			) : (
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
						width: "240px",
					}}
				>
					<Stack spacing={2}>
						<Typography
							style={{ fontSize: "20px", fontWeight: "normal" }}
						>
							목표가 생성 되었어요.
						</Typography>
						<Button
							onClick={handleGoalMainRedirect}
							style={{
								height: "25px",
								boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
							}}
						>
							확인
						</Button>
					</Stack>
				</div>
			)}
		</>
	);
}

export default Connection;
