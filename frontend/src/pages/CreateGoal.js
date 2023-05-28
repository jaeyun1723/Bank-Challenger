import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./CreateGoal.css";
import Connection from "./Connection";
import dayjs from 'dayjs';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {Typography} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import Input from '@mui/material/Input';

// Instantiate axios with a base URL
const api = axios.create({
    baseURL: "http://localhost:8080", // Replace this with the actual server URL
});

function CreateGoal({setIsOpen}) {
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
    const [goalImage, setGoalImage] = useState("#000000");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null); // Added state to store the selected search result
    const ariaLabel = { 'aria-label': 'description' };

    const handleColorChange = (e) => {
        setGoalImage(e.target.value);
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

    const searchResultsContainerStyle = {
        maxHeight: "100px",
        overflowY: "auto",
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

        try {
            const response = await api.get("/goal/search", {
                params: {query: searchQuery},
            });
            if (searchQuery.match(/\S/) === null) return;
            const items = response.data.items.map((item) => ({
                ...item,
                title: item.title.replace(/<b>/g, "").replace(/<\/b>/g, ""), // <b> 태그 제거
            }));

            setSearchResults(items);

            //setSearchResults(response.data.items);
            console.log(items);
            // Assuming the response data has a field 'items' that contains the search results
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

    const searchResultImageStyle = {
        width: "80px",
        height: "80px",
    };

    const handleResultSelect = (result) => {
        // When a user selects a search result, set the goalAmount and goalImage accordingly.
        setGoalAmount(result.lprice);
        setProductId(result.productId);
        setSelectedResult(result); // Store the selected result
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setProductId("");
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
            const response = await api.post("/goal", data)
                .then(res => console.log("Goal created successfully:", res.data))
                .catch(error => console.log(error));

            setIsSubmitted(true);
        } catch (error) {
            console.error("Error creating goal:", error);
        }
    };

    if (isSubmitted) {
        return <Connection/>;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} locale="ko">
            <>
                <h1 style={{textAlign: "center", margin: "20px 20px"}}>
                    <Typography style={{fontSize: "40px"}}>목표 생성하기</Typography>
                </h1>
                <Button
                    onClick={handleManualButtonClick}
                    style={{
                        marginRight: "2%",
                        width: "49%",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Typography style={{fontSize: "20px"}}>직접 입력</Typography>
                </Button>
                <Button
                    onClick={handleSearchButtonClick}
                    style={{width: "49%", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"}}
                >
                    <Typography style={{fontSize: "20px"}}>검색하여 입력</Typography>
                </Button>

                {inputMode === "manual" ? (
                    <form className="create-goal" onSubmit={handleSubmit}>
                        <div className="inputs">
                            <TextField
                                placeholder="목표 이름"
                                inputProps={ariaLabel}
                                className = "textfield1"
                                type="text"
                                value={goalName}
                                onChange={(e) => setGoalName(e.target.value)}
                                required

                            /><Typography className="title2" style={{fontSize: "35px", fontWeight: "normal"}}> 을(를) 목표로</Typography>

                        </div>

                        <div className="inputs">
                            <TextField
                                placeholder="목표 금액"
                                inputProps={ariaLabel}
                                className = "textfield2"
                                type="text"
                                value={goalAmount}
                                onChange={handleChange}
                                required
                            />
                            <Typography className="title2" style={{fontSize: "35px", fontWeight: "normal"}}>원을 모으고 싶어요!</Typography>
                        </div>

                        <div className="input-label">
                            <Typography className="title2" style={{fontSize: "35px", fontWeight: "normal"}}>목표 시작일</Typography>
                            <div className="input-container">
                                <DatePicker
                                    value={startDate}
                                    onChange={(date) => {setStartDate(date)}}
                                    renderInput={(props) => <input {...props} />}
                                    inputFormat={"yyyy-MM-dd"}

                                minDate={dayjs()}
                                    className="custom-datepicker"
                                    responsive={true}
                                    required
                                />
                                </div>
                                <Typography className="title2" style={{fontSize: "35px", fontWeight: "normal"}}>에요.</Typography>

                        </div>



                        <div className="inputs">
                            <Typography className="title2" style={{fontSize: "15px", fontWeight: "normal"}}>테마 색상</Typography>
                            <input
                                type="color"
                                value={goalImage}
                                onChange={handleColorChange}
                                style={{marginLeft: "30px"}}
                                required
                            />
                        </div>
                        <Button type="submit" variant="contained" color="primary" style={{backgroundColor:"#7691F6", width:"100%"}}>목표 만들기</Button>
                    </form>
                ) : (
                    <form className="create-goal" onSubmit={handleSubmit}>
                        <div className="inputs">
                            <label>
                                <TextField
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    onClick={handleSearchSubmit}
                                    style={{
                                        marginLeft: "10px",
                                        width: "200px",
                                        height: "25px",
                                        fontSize: "12px",
                                        padding: "6px 12px",
                                        backgroundColor: "gray",
                                    }}
                                >
                                    <Typography className="title2">검색</Typography>
                                </Button>
                            </label>
                            {searchResults.length > 0 && (
                                <div
                                    style={{
                                        ...searchResultsContainerStyle,
                                        display: selectedResult ? "none" : "block",
                                    }}
                                >
                                    <ul>
                                        {searchResults.map((result) => (
                                            <li
                                                key={result.productId}
                                                onClick={() => handleResultSelect(result)}
                                            >
                                                <div
                                                    className={`search-result ${
                                                        selectedResult === result ? "selected" : ""
                                                    }`}
                                                >
                                                    <div className="search-result-image">
                                                        <img
                                                            src={result.image}
                                                            alt={result.title}
                                                            style={{width: "100px", height: "80px"}}
                                                        />
                                                    </div>
                                                    <div className="search-result-details">
                                                        <p>상품명: {result.title}</p>
                                                        <p>가격: {result.lprice}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}


                        </div>
                        <div className="inputs">
                            <TextField
                                placeholder="목표 이름"
                                inputProps={ariaLabel}
                                className = "textfield1"
                                type="text"
                                value={goalName}
                                onChange={(e) => setGoalName(e.target.value)}
                                required


                            /><Typography className="title2" style={{fontSize: "35px", fontWeight: "normal"}}> 을(를) 목표로</Typography>

                        </div>
                        <div className="inputs">
                        <>
                            <label>
                                <TextField
                                    placeholder="목표 금액"
                                    inputProps={ariaLabel}
                                    className = "textfield2"
                                    type="text"
                                    value={goalAmount}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </>
                            <Typography className="title2" style={{fontSize: "35px", fontWeight: "normal"}}> 원을 모으고 싶어요!</Typography>
                        </div>
                        <div className="input-label">
                            <Typography className="title2" style={{fontSize: "35px", fontWeight: "normal"}}>목표 시작일은 </Typography>
                            <div className="input-container">
                                <DatePicker
                                    value={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    renderInput={(props) => <input {...props} />}
                                    inputFormat={"yyyy-MM-dd"}
                                    mask={"____-__-__"}
                                    minDate={dayjs()}
                                    className="custom-datepicker"
                                    responsive={true}
                                />
                            </div>
                            <Typography className="title2" style={{fontSize: "35px", fontWeight: "normal"}}>에요.</Typography>

                        </div>

                        <div className="inputs">
                            <Typography className="title2" style={{fontSize: "20px", fontWeight: "normal"}}>테마 색상</Typography>
                            <input
                                type="color"
                                value={goalImage}
                                onChange={handleColorChange}
                                style={{marginLeft: "30px"}}
                                required
                            />
                        </div>
                        <Button type="submit">목표 만들기</Button>
                    </form>





                )}
            </>
        </LocalizationProvider>
    );
}

export default CreateGoal;
