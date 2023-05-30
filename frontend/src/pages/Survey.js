import {React, useState} from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography
} from "@mui/material";
import {experimentalStyled as styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Survey() {
  const userId = sessionStorage.getItem("userId");
  const financialType = sessionStorage.getItem("financialType");

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
      alert("직종을 선택해주세요.");
      return false;
    }
    return true;
  };

  const handleInvalidInput = () => {
    if (monthlyIncome < 0 || savings < 0 || loan < 0) {
      alert("음수 입력 값이 있습니다.");
      return false;
    }
    return true;
  };

  const handleConfirmInput = () => {
    const message = `결혼 여부 : ${isMarried}\n월 소득 : ${numberWithCommas(
        Math.round(monthlyIncome)
    )}만 원\n소비 비율 : ${spendingRatio}%\n직종 : ${occupation}\n예적금 : ${numberWithCommas(
        Math.round(savings)
    )}만 원\n대출금 : ${numberWithCommas(
        Math.round(loan)
    )}만 원\n위 정보가 맞습니까?`;

    if (window.confirm(message)) {
      let sendData = JSON.stringify({
        userId: userId,
        married: isMarried === "미혼" ? false : true,
        monthlyIncome: Math.round(monthlyIncome),
        spendingRatio: spendingRatio,
        occupation: occupation,
        savings: Math.round(savings),
        loan: Math.round(loan),
      });

      axios({
        method: "POST",
        url: "/survey",
        data: sendData,
        headers: {"Content-type": "application/json;charset=UTF-8"},
      })
      .then(() => {
        window.location.href = "/bfr";
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const handleOnClick = () => {
    if (!handleNoInput()) {
      return false;
    }
    if (!handleInvalidInput()) {
      return false;
    }
    return handleConfirmInput();
  };

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

  if (userId === null || sessionStorage.getItem("financialType") !== "null") {
    window.location.href = "/";
  } else if (financialType !== "null") {
    window.location.href = "/";
  } else {
    return (
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 shape-default">
            <img
                alt="..."
                src={require("assets/img/theme/bfrbackground.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "2000px"
                }}
            />
          </div>
          <h1 style={{ textAlign: "center", margin: "20px 20px" }}>
            <Typography class="nav-link" style={{ color: "white", fontSize: "40px" }}>
              설문조사
            </Typography>
          </h1>

          <Box sx={{ flexGrow: 1 }}>
            <Grid style={{width: "30%", margin: "auto"}}>
              <Item elevation={8}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                      width: "75%",
                      margin: "0 auto",
                      minWidth: 300,
                    }}
                >
                  <FormGroup className={"MuiFormControl-horizontal"} controlId="isMarried" sx={{margin: 2}} style={{textAlign:'left'}}>
                    <FormLabel>결혼 여부</FormLabel>
                    <RadioGroup
                        value={isMarried}
                        defaultValue="미혼"
                        style={{display: "center"}}
                        onChange={handleChangeIsMarried}
                        row
                    >
                      <FormControlLabel
                          value="미혼"
                          control={<Radio/>}
                          label="미혼"
                      />
                      <FormControlLabel
                          value="기혼"
                          control={<Radio/>}
                          label="기혼"
                      />
                    </RadioGroup>
                  </FormGroup>
                  <FormGroup controlId="monthlyIncome" sx={{margin: 2}} style={{textAlign:'left'}}>
                    <FormLabel>월 소득(단위: 만 원)</FormLabel>
                    <Input
                        value={monthlyIncome}
                        onChange={handleChangeMonthlyIncome}
                        type="number"
                        placeholder="월 소득 입력"
                    />
                  </FormGroup>
                  <FormGroup controlId="spendingRatio" sx={{margin: 2}} style={{textAlign:'left'}}>
                    <FormLabel>월 소득에서 소비의 비율</FormLabel>
                    <Slider
                        value={spendingRatio}
                        onChange={handleChangeSpendingRatio}
                        min={0}
                        max={100}
                        step={1}
                    />
                    <Typography variant="body" align="right">
                      지출:{" "}
                      {numberWithCommas(
                          Math.round((monthlyIncome * spendingRatio) / 100)
                      )}
                      만 원 ({spendingRatio}%)
                    </Typography>
                  </FormGroup>
                  <FormGroup controlId="occupation" sx={{margin: 2}} style={{textAlign:'left'}}>
                    <FormLabel>직종</FormLabel>
                    <Select value={occupation} onChange={handleChangeOccupation}>
                      <MenuItem value={"선택"}>선택</MenuItem>
                      <MenuItem value={"무직"}>무직</MenuItem>
                      <MenuItem value={"학생"}>학생</MenuItem>
                      <MenuItem value={"회사원"}>회사원</MenuItem>
                      <MenuItem value={"자영업자"}>자영업자</MenuItem>
                      <MenuItem value={"전문직"}>전문직</MenuItem>
                      <MenuItem value={"프리랜서"}>프리랜서</MenuItem>
                      <MenuItem value={"공무원"}>공무원</MenuItem>
                      <MenuItem value={"엔지니어"}>엔지니어</MenuItem>
                      <MenuItem value={"서비스직"}>서비스직</MenuItem>
                    </Select>
                  </FormGroup>
                  <FormGroup controlId="savings" sx={{margin: 2}} style={{textAlign:'left'}}>
                    <FormLabel>예적금 현황(단위: 만 원)</FormLabel>
                    <Input
                        value={savings}
                        onChange={handleChangeSavings}
                        type="number"
                        placeholder="예적금 현황 입력"
                    />
                  </FormGroup>
                  <div></div>
                  <FormGroup controlId="loan" sx={{margin: 2}} style={{textAlign:'left'}}>
                    <FormLabel>대출금 현황(단위: 만 원)</FormLabel>
                    <Input
                        value={loan}
                        onChange={handleChangeLoan}
                        type="number"
                        placeholder="대출금 현황 입력"
                    />
                  </FormGroup>
                  <FormGroup controlId="button" sx={{margin: 2}} style={{textAlign:'left'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOnClick}
                        noValidate
                        sx={{
                          mt: 1,
                          width: "100%",
                        }}
                    >
                      설문조사 제출
                    </Button>
                  </FormGroup>
                  <br/>
                </Box>
              </Item>
            </Grid>
          </Box>
        </section>
    );
  }
}

export default Survey;
