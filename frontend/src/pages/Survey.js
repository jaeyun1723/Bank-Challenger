import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, FormGroup, FormLabel, MenuItem, Input, Select, Slider, Button } from "@mui/material";

function Survey() {
    const [login, setLogin] = useState('');
    const [bfr, setBfr] = useState('');
    const [user, setUser] = useState('');

    const [isMarried, setIsMarried] = useState("미혼"); // 결혼 여부
    const [monthlyIncome, setMonthlyIncome] = useState(0); // 월 소득
    const [spendingRatio, setSpendingRatio] = useState(0); // 월 소득에서 소비 비율
    const [occupation, setOccupation] = useState("선택"); // 직종
    const [savings, setSavings] = useState(0); // 예적금
    const [loan, setLoan] = useState(0); // 대출금
    
    const handleChangeIsMarried = (event) => {
        setIsMarried(event.target.value);
    };

    const handleChangeMonthlyIncome = (event) => {
        setMonthlyIncome(event.target.value);
    };

    const handleChangeSpendingRatio = (event) => {
        setSpendingRatio(event.target.value);
    };

    const handleChangeOccupation = (event) => {
        setOccupation(event.target.value);
    };

    const handleChangeSavings = (event) => {
        setSavings(event.target.value);
    };

    const handleChangeLoan = (event) => {
        setLoan(event.target.value);
    };

    const handleNoInput = () => {
        if (occupation === "선택") {
            alert("모든 정보를 입력해주세요.");
            return false;
        }
        return true;
    }

    const handleInvalidInput = () => {
        if (monthlyIncome < 0 || savings < 0 || loan < 0) {
            alert("음수 입력값이 있습니다.");
            return false;
        }
        return true;
    }

    const handleConfirmInput = () => {
        const message = `결혼 여부 : ${isMarried}\n월 소득 : ${numberWithCommas(Math.round(monthlyIncome))}만 원\n소비 비율 : ${spendingRatio}%\n직종 : ${occupation}\n예적금 : ${numberWithCommas(Math.round(savings))}만 원\n대출금 : ${numberWithCommas(Math.round(loan))}만 원\n위 정보가 맞습니까?`;
        
        if (window.confirm(message)) {
            let sendData = JSON.stringify({
                "userId": user["userId"],
                "married": (isMarried === "미혼") ? false : true,
                "monthlyIncome": Math.round(monthlyIncome),
                "spendingRatio": spendingRatio,
                "occupation": occupation,
                "savings": Math.round(savings),
                "loan": Math.round(loan),
            })
            
            axios({
                method: "POST",
                url: "/survey",
                data: sendData,
                headers: {"Content-type": "application/json;charset=UTF-8"}
            }).then(() => {
                window.location.href = "/main";
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const handleOnClick = () => {
        if (!handleNoInput()) return false;
        if (!handleInvalidInput()) return false;
        return handleConfirmInput();
    }

    function reverseList(list) {
        let reversed = [];
        for (var i = list.length - 1; i >= 0; i--) {
            reversed.push(list[i]);
        }
        return reversed;
    }

    function numberWithCommas(money) {
        let result = money.toString().split("");
        result = reverseList(result);
        for (let i = 0; i < result.length; i++) {
            if ((i+1) % 4 === 0 && i !== 0) {
                result.splice(i, 0, ",");
            }
        }
        result = reverseList(result);
        return result.join("");
    }

    useEffect(() => {
        axios.get("/status/login")
            .then(response => {
                setLogin(response.data.login);
            })
            .catch(error => console.log(error));

        axios.get("/status/bfr")
            .then(response => {
                setBfr(response.data.bfr);
            })
            .catch(error => console.log(error));

        axios.get("/status/user")
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    if (login === false) {
        window.location.href = "/";
    } else if (bfr === true) {
        window.location.href = "/main";
    } else {
        return(
            <div id="survey" margin="0 auto" display="flex">
                <br/>
                <Typography variant="h3" align="center">뱅크 챌린져</Typography>
                <br/>
                <Box component="form" noValidate sx={{
                    mt: 1,
                    width: 1/3,
                    margin: "0 auto",
                    minWidth: 300,
                }}>
                    <FormGroup controlId="isMarried" sx={{margin: 2}}>
                        <FormLabel>결혼 여부</FormLabel>
                        <Select
                            value={isMarried}
                            onChange={handleChangeIsMarried}
                        >
                            <MenuItem value={"미혼"}>미혼</MenuItem>
                            <MenuItem value={"기혼"}>기혼</MenuItem>
                        </Select>
                    </FormGroup>
                    <FormGroup controlId="monthlyIncome" sx={{margin: 2}}>
                        <FormLabel>월 소득</FormLabel>
                        <Input
                            value={monthlyIncome}
                            onChange={handleChangeMonthlyIncome}
                            type="number"
                            placeholder="월 소득 입력"
                        />
                    </FormGroup>
                    <FormGroup controlId="spendingRatio" sx={{margin: 2}}>
                        <FormLabel>월 소득에서 소비의 비율</FormLabel>
                        <Slider
                            value={spendingRatio}
                            onChange={handleChangeSpendingRatio}
                            min={0}
                            max={100}
                            step={1}
                        />
                        <Typography variant="body" align="right">
                        지출: {numberWithCommas(Math.round(monthlyIncome * spendingRatio / 100))}원 ({spendingRatio}%)
                        </Typography>
                    </FormGroup>
                    <FormGroup controlId="occupation" sx={{margin: 2}}>
                        <FormLabel>직종</FormLabel>
                        <Select
                            value={occupation}
                            onChange={handleChangeOccupation}
                        >
                            <MenuItem value={"선택"}>선택</MenuItem>
                            <MenuItem value={"학생"}>학생</MenuItem>
                            <MenuItem value={"직장인"}>직장인</MenuItem>
                            <MenuItem value={"자영업자"}>자영업자</MenuItem>
                        </Select>
                    </FormGroup>
                    <FormGroup controlId="savings"  sx={{margin: 2}}>
                        <FormLabel>예적금 현황</FormLabel>
                        <Input
                            value={savings}
                            onChange={handleChangeSavings}
                            type="number"
                            placeholder="예적금 현황 입력"
                        />
                    </FormGroup>
                    <div></div>
                    <FormGroup controlId="loan" sx={{margin: 2}}>
                        <FormLabel>대출금 현황</FormLabel>
                        <Input
                            value={loan}
                            onChange={handleChangeLoan}
                            type="number"
                            placeholder="대출금 현황 입력"
                        />
                    </FormGroup>
                    <FormGroup controlId="button" sx={{margin: 2}}>
                        <Button variant="contained" color="primary" onClick={handleOnClick} noValidate sx={{
                        mt: 1,
                        width: "100%"
                    }}>
                            설문조사 제출
                        </Button>
                    </FormGroup>
                </Box>
            </div>
        );
    }
}

export default Survey;
