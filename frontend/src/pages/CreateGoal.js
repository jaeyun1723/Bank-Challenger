import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Typography, TextField, Button } from "@material-ui/core";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateGoal.css";
import Connection from "./Connection";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { Scrollbars } from "react-custom-scrollbars";
import { MuiColorInput } from "mui-color-input";

const theme = createTheme({
	palette: {
		primary: {
			// Purple and green play nicely together.
			main: purple[500],
		},
		secondary: {
			// This is green.A700 as hex.
			main: "#11cb5f",
		},
	},
});

// Instantiate axios with a base URL
const api = axios.create({
	baseURL: "http://localhost:8080", // Replace this with the actual server URL
});

function CreateGoal({ setIsOpen }) {
	const [inputMode, setInputMode] = useState("manual");
	const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
	const [category, setCategory] = useState(setIsOpen);
	const [goalName, setGoalName] = useState("");
	const [productId, setProductId] = useState("");
	const [goalAmount, setGoalAmount] = useState("");
	const [savingAmount, setSavingAmount] = useState("null");
	const [isExpired, setIsExpired] = useState(false);
	const [day, setDay] = useState("null");
	const [startDate, setStartDate] = useState("null");
	const [goalImage, setGoalImage] = useState("blue");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [selectedResult, setSelectedResult] = useState(null); // Added state to store the selected search result
	const ariaLabel = { "aria-label": "description" };

	const handleColorChange = (newValue) => {
		setGoalImage(newValue);
	};

	const handleChange = (e) => {
		let value = e.target.value;
		value = value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
		value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 1,000 단위로 콤마 추가
		setGoalAmount(value);
	};

	const handleSavingAmountChange = (e) => {
		let value = e.target.value;
		value = value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
		value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 1,000 단위로 콤마 추가
		setSavingAmount(value);
	};

	const resetInputValues = () => {
		setGoalName("");
		setGoalAmount("");
		setSavingAmount("");
		setDay("");
		setStartDate(null);
		setGoalImage("#000000");
		setProductId("");
	};

	const handleSearchSubmit = async (e) => {
		e.preventDefault();
		selectedResult ? setSelectedResult(false) : setSelectedResult(true);

		try {
			const response = await api.get("/goal/search", {
				params: { query: searchQuery },
			});
			if (searchQuery.match(/\S/) === null) return;
			const items = response.data.items.map((item) => ({
				...item,
				title: item.title.replace(/<b>/g, "").replace(/<\/b>/g, ""), // <b> 태그 제거
			}));

			setSearchResults(items);
		} catch (err) {
			console.error(err);
		}
	};

	const handleManualButtonClick = () => {
		setInputMode("manual");
		resetInputValues();
	};

	const handleSearchButtonClick = () => {
		setInputMode("search");
		resetInputValues();
	};

	const handleResultSelect = (result) => {
		// When a user selects a search result, set the goalAmount and goalImage accordingly.
		setGoalAmount(result.lprice);
		setProductId(result.productId);
		setSelectedResult(result); // Store the selected result
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (startDate === "null" || startDate === null) {
			alert("목표 시작일을 선택해주세요.");
			return false;
		}

		try {
			const data = {
				userId,
				category,
				goalName,
				productId,
				goalAmount: parseInt(goalAmount.replace(/[^0-9]/g, "")),
				savingAmount: parseInt(savingAmount.replace(/[^0-9]/g, "")),
				isExpired,
				day,
				savingStartDate: startDate.toISOString(),
				createDate: new Date().toISOString(),
				goalImage,
			};
			console.log(data);

			try {
				await api
					.post("/goal", data)
					.then((res) =>
						console.log("Goal created successfully:", res.data)
					)
					.catch((error) => console.log(error));

				setIsSubmitted(true);
			} catch (error) {
				console.error("Error creating goal:", error);
			}
		} catch (error) {
			alert("목표 시작일을 선택해주세요.");
			return false;
		}
	};

	if (isSubmitted) {
		return <Connection />;
	}

	return (
		<div className="wrap">
			<Typography
				style={{
					fontSize: "30px",
					textAlign: "center",
					fontWeight: "normal",
					marginTop: "10px",
					marginBottom: "25px",
				}}
			>
				목표 생성하기
			</Typography>
			<Stack
				direction="row"
				spacing={0.1}
				justifyContent="center"
				alignItems="center"
			>
				<ThemeProvider theme={theme}>
					<Button
						color="primary"
						variant="outlined"
						startIcon={<CreateIcon />}
						onClick={handleManualButtonClick}
						style={{
							marginRight: "2%",
						}}
					>
						<Typography style={{ fontSize: "20px" }}>
							직접 입력
						</Typography>
					</Button>
					<Button
						color="secondary"
						variant="outlined"
						startIcon={<SearchIcon />}
						onClick={handleSearchButtonClick}
					>
						<Typography style={{ fontSize: "20px" }}>
							검색하여 입력
						</Typography>
					</Button>
				</ThemeProvider>
			</Stack>

			{inputMode === "manual" ? (
				<form className="create-goal" onSubmit={handleSubmit}>
					<Grid
						container
						spacing={2}
						direction="row"
						justifyContent="center"
						alignItems="center"
					>
						<Grid item xs={6}>
							<TextField
								style={{ width: "200px" }}
								placeholder="목표 이름"
								inputProps={ariaLabel}
								className="textfield1"
								type="text"
								value={goalName}
								onChange={(e) => setGoalName(e.target.value)}
								size="small"
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<Typography
								className="title2"
								style={{
									fontSize: "25px",
									fontWeight: "normal",
								}}
							>
								{" "}
								을(를) 목표로
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<TextField
								placeholder="목표 금액"
								inputProps={ariaLabel}
								className="textfield2"
								type="text"
								value={goalAmount}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<Typography
								className="title2"
								style={{
									fontSize: "25px",
									fontWeight: "normal",
								}}
							>
								원을 모으고 싶어요!
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography
								className="title2"
								style={{
									fontSize: "25px",
									fontWeight: "normal",
								}}
							>
								목표 시작일
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								locale="ko"
								className="bug"
							>
								<DatePicker
									value={startDate}
									onChange={(date) => {
										setStartDate(date);
									}}
									renderInput={(props) => (
										<input {...props} />
									)}
									inputFormat={"yyyy-MM-dd"}
									minDate={dayjs()}
									responsive={true}
									required
								/>
							</LocalizationProvider>
							<span
								className="title2"
								style={{ paddingLeft: "5px" }}
							>
								에요.
							</span>
						</Grid>
						<Grid item xs={4}>
							<Typography
								className="title2"
								style={{
									fontSize: "25px",
									fontWeight: "normal",
								}}
							>
								테마 색상
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<MuiColorInput
								className="color-css"
								value={goalImage}
								onChange={handleColorChange}
								style={{ width: "40%" }}
							/>
						</Grid>
					</Grid>
					<Button type="submit" className="submit-button">
						<div className="submit-button-text">확인</div>
					</Button>
				</form>
			) : (
				<form className="create-goal" onSubmit={handleSubmit}>
				<Grid
						container
					
						columns={16}
						direction="row"
					>
						<Grid item xs={4}>
							<TextField
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								required
							/>
							</Grid>
							<Grid item xs={2}>
							<Button type="button" onClick={handleSearchSubmit} >
								<SearchIcon />
							</Button>
						</Grid>
						<Grid item xs={10}>
							{searchResults.length > 0 ? (
								<Scrollbars
									style={{
										height: "300px",
										display: selectedResult
											? "none"
											: "block",
									}}
									thumbSize={85}
									renderTrackVertical={({
										style,
										...props
									}) => {
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
									<div
										style={{
											display: selectedResult
												? "none"
												: "block",
											visibility: selectedResult
												? "hidden"
												: "visible",
										}}
									>
										<ul style={{ listStyle: "none" }}>
											{searchResults.map((result) => (
												<li
													key={result.productId}
													onClick={() =>
														handleResultSelect(
															result
														)
													}
												>
													<div
														className={`search-result ${
															selectedResult ===
															result
																? "selected"
																: ""
														}`}
													>
														<div className="search-result-image">
															<img
																src={
																	result.image
																}
																alt={
																	result.title
																}
																style={{
																	width: "100px",
																	height: "80px",
																}}
															/>
														</div>
														<div className="search-result-details">
															<p>
																{result.title}
															</p>
															<p>
																가격:{" "}
																{result.lprice}
															</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								</Scrollbars>
							) : (
								<div className="hidden-view"></div>
							)}
						</Grid>
					</Grid>
					{selectedResult && (
						<Grid
							container
							spacing={2}
							direction="row"
							justifyContent="center"
							alignItems="center"
						>
							<Grid item xs={6}>
								<TextField
									style={{ width: "200px" }}
									placeholder="목표 이름"
									inputProps={ariaLabel}
									className="textfield1"
									type="text"
									value={goalName}
									onChange={(e) =>
										setGoalName(e.target.value)
									}
									size="small"
									required
								/>
							</Grid>
							<Grid item xs={6}>
								<Typography
									className="title2"
									style={{
										fontSize: "25px",
										fontWeight: "normal",
									}}
								>
									{" "}
									을(를) 목표로
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<TextField
									placeholder="목표 금액"
									inputProps={ariaLabel}
									className="textfield2"
									type="text"
									value={goalAmount}
									onChange={handleChange}
									required
								/>
							</Grid>
							<Grid item xs={6}>
								<Typography
									className="title2"
									style={{
										fontSize: "25px",
										fontWeight: "normal",
									}}
								>
									원을 모으고 싶어요!
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography
									className="title2"
									style={{
										fontSize: "25px",
										fontWeight: "normal",
									}}
								>
									목표 시작일
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									locale="ko"
									className="bug"
								>
									<DatePicker
										value={startDate}
										onChange={(date) => {
											setStartDate(date);
										}}
										renderInput={(props) => (
											<input {...props} />
										)}
										inputFormat={"yyyy-MM-dd"}
										minDate={dayjs()}
										responsive={true}
										required
									/>
								</LocalizationProvider>
								<span
									className="title2"
									style={{ paddingLeft: "5px" }}
								>
									에요.
								</span>
							</Grid>
							<Grid item xs={4}>
								<Typography
									className="title2"
									style={{
										fontSize: "25px",
										fontWeight: "normal",
									}}
								>
									테마 색상
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<MuiColorInput
									value={goalImage}
									onChange={handleColorChange}
									style={{ width: "40%" }}
								/>
							</Grid>
						</Grid>
					)}
					<Button type="submit" className="submit-button">
						<div className="submit-button-text">확인</div>
					</Button>
				</form>
			)}
		</div>
	);
}

export default CreateGoal;
