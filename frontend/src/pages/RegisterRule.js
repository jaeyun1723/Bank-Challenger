import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { FormControl, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import bankLogo from "components/Banks/BankLogo";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';

function RegisterRule({ goal }) {
    const [withdrawAccounts, setWithdrawAccounts] = useState([]);
    const [savingAccounts, setSavingAccounts] = useState([]);
    const [registerWAccount, setRegisterWAccount] = useState([]);
    const [registerSAccount, setRegisterSAccount] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("name");
    const [savingDate, setSavingDate] = useState(dayjs());
    const [money, setMoney] = useState(0);
    const [cycle, setCycle] = useState(5);
    const [isOpen, setIsOpen] = useState(false);
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    if (userId == null) window.location.href = "/";
    console.log(goal.goalAmount);

    useEffect(() => {
        axios
            .get(`/withdraw/list/${userId}`)
            .then((response1) => {
                setWithdrawAccounts(response1.data.result);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get(`/savings/list/${userId}`)
            .then((response2) => {
                setSavingAccounts(response2.data.result);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const steps = [
        {
            label: '출금 계좌 등록',
            description: '목표에 등록할 출금 계좌 선택하세요'
        },
        {
            label: '저금 계좌 등록',
            description: '목표에 등록할 임금할 계좌 선택하세요.'
        },
        {
            label: '저축 주기 설정',
            description: '저축 주기를 선택하세요.'
        },
        {
            label: '저축 금액 설정',
            description: '저축할 금액을 설정하세요.'
        },
        {
            label: '저축 시작일 설정',
            description: '저축을 시작할 날짜를 선택하세요.'
        },
        {
            label: '목표에 등록할 규칙 확인',
            description: '설정하신 규칙을 확인하세요.'
        },
    ];
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleWithdrawAccountClick = (account) => {
        setRegisterWAccount(account);
        if (!isActive) {
            setIsActive(true);
        }
    };

    const handleSavingAccountClick = (account) => {
        setRegisterSAccount(account);
        if (!isActive) {
            setIsActive(true);
        }
    };

    const handleMoneyClick = (money) => {
        setMoney(money.target.value);
    };

    const handleCycleClick = (event) => {
        setIsOpen(!isOpen);
    };

    const handleCycleChange = (event) => {
        setCycle(event.target.value);
        setIsOpen(false);
    };

    const handleAccountClick = () => {
        let sendData = JSON.stringify({
            userId: userId,
            goalId: goal.goalId,
            withdrawAccountId: registerWAccount.accountId,
            savingAccountId: registerSAccount.accountId,
            day: cycle,
            savingAmount: money,
            savingStartDate: savingDate.toISOString(),
        });
        if(window.confirm("규칙을 등록하시겠습니까??")){
            axios({
                method: "POST",
                url: "/rule",
                data: sendData,
                headers: { "Content-type": "application/json;charset=UTF-8" },
            })
                .then(() => {
                    alert("규칙을 등록하였습니다.");
                    window.location.href='/goal';
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{

        }
    };
    return (
        <>
            <div className="text-primary text-center ml--5">
                <h2>{userName} 님의 목표 계좌 선택</h2>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'left',
                width: '767px',
                height: '767px',
            }}>
                <Box sx={{ maxWidth: '100%' }} >
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 5 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    {index === 0 && <Typography>{step.description}</Typography>}
                                    {index === 0 &&
                                        withdrawAccounts.map((account) => (
                                            <div style={{ textAlign: "left" }}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleWithdrawAccountClick(account)}
                                                    style={{
                                                        marginBottom: "5px",
                                                        textAlign: "left",
                                                        width: "600px",
                                                        display: "flex",
                                                    }}
                                                    className={`text-primary btn-neutral ml-1 btn btn-primary ${account === registerWAccount ? "active" : ""
                                                        }`}
                                                >
                                                    <table style={{ marginRight: "auto" }}>
                                                        <tr>
                                                            <th rowSpan="2">
                                                                <span>
                                                                    {bankLogo(account.bankName)}
                                                                </span>
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontSize: "12px",
                                                                    textAlign: "left",
                                                                    marginRight: "10px",
                                                                }}
                                                            >
                                                                {account.bankName}
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ fontSize: "16px", textAlign: "right" }}>
                                                                {account.accountNumMasked}
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </button>
                                            </div>
                                        ))}
                                    {index === 1 && <Typography>{step.description}</Typography>}
                                    {index === 1 && savingAccounts.map((account) => (
                                        <div style={{ textAlign: "left" }}>
                                            <button
                                                type="button"
                                                onClick={() => handleSavingAccountClick(account)}
                                                style={{
                                                    marginBottom: "5px",
                                                    textAlign: "left",
                                                    width: "600px",
                                                    display: "flex",
                                                }}
                                                className={`text-primary btn-neutral ml-1 btn btn-primary ${account === registerSAccount ? "active" : ""
                                                    }`}
                                            >
                                                <table style={{ marginRight: "auto" }}>
                                                    <tr>
                                                        <th rowSpan="2">
                                                            <span>
                                                                {bankLogo(account.bankName)}
                                                            </span>
                                                        </th>
                                                        <th
                                                            style={{
                                                                fontSize: "12px",
                                                                textAlign: "left",
                                                                marginRight: "10px",
                                                            }}
                                                        >
                                                            {account.bankName}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ fontSize: "16px", textAlign: "right" }}>
                                                            {account.accountNumMasked}
                                                        </th>
                                                    </tr>
                                                </table>
                                            </button>
                                        </div>
                                    ))}
                                    {index === 2 && <Typography>{step.description}</Typography>}
                                    {index === 2 && <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                                        <Select
                                            open={isOpen}
                                            onClose={() => setIsOpen(false)}
                                            onOpen={() => setIsOpen(true)}
                                            value={cycle} onChange={handleCycleChange}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                },
                                                transformOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                },
                                                getContentAnchorEl: null,
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 200, // 드롭다운 메뉴의 최대 높이
                                                    },
                                                },
                                            }}
                                        >
                                            {days.map((day) => (
                                                <MenuItem key={day} value={day}>{day}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    }
                                    {index == 3 && <Typography>{step.description}</Typography>}
                                    {index == 3 && <TextField
                                        id="outlin-multiline-flexible"
                                        label="금액을 입력하세요."
                                        size='small'
                                        style={{ width: '300px', marginTop: '10px' }}
                                        multiline
                                        onChange={handleMoneyClick}
                                        maxRows={2}
                                    />}
                                    {index == 4 && <Typography>{step.description}</Typography>}
                                    {index == 4 && <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                            <DemoItem>
                                                <DateCalendar value={savingDate} onChange={(newValue) => setSavingDate(newValue)}
                                                    minDate={dayjs()} />
                                            </DemoItem>
                                        </DemoContainer>
                                    </LocalizationProvider>}
                                    {index === 5 && <Typography>{step.description}</Typography>}
                                    {index == 5 &&
                                        <div style={{ marginTop: '10px' }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={15}>
                                                    <div style={{ textAlign: 'left' }}>
                                                        <p>{savingDate.format("YYYY년 MM월 DD일").toString()}부터 매월 {cycle}일, {money}원씩 저축해요.
                                                            (예상 목표 달성 기간 : {Math.ceil(goal.goalAmount / money)}개월)
                                                        </p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <div style={{ marginTop: '10px' }}>
                                                저금계좌
                                                <button
                                                    type="button"
                                                    style={{
                                                        marginBottom: "5px",
                                                        textAlign: "left",
                                                        width: "600px",
                                                        display: "flex",
                                                    }}
                                                    className="text-primary btn-neutral ml-1 btn btn-primary "
                                                > <table style={{ marginRight: "auto" }}>
                                                        <tr>
                                                            <th rowSpan="2">
                                                                <span>
                                                                    {bankLogo(registerSAccount.bankName)}
                                                                </span>
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontSize: "12px",
                                                                    textAlign: "left",
                                                                    marginRight: "10px",
                                                                }}
                                                            >
                                                                {registerSAccount.bankName}
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ fontSize: "16px", textAlign: "right" }}>
                                                                {registerSAccount.accountNumMasked}
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </button>
                                            </div>
                                            출금계좌
                                            <button
                                                type="button"
                                                style={{
                                                    marginBottom: "5px",
                                                    textAlign: "left",
                                                    width: "600px",
                                                    display: "flex",
                                                }}
                                                className="text-primary btn-neutral ml-1 btn btn-primary "
                                            > <table style={{ marginRight: "auto" }}>
                                                    <tr>
                                                        <th rowSpan="2">
                                                            <span>
                                                                {bankLogo(registerWAccount.bankName)}
                                                            </span>
                                                        </th>
                                                        <th
                                                            style={{
                                                                fontSize: "12px",
                                                                textAlign: "left",
                                                                marginRight: "10px",
                                                            }}
                                                        >
                                                            {registerWAccount.bankName}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ fontSize: "16px", textAlign: "right" }}>
                                                            {registerWAccount.accountNumMasked}
                                                        </th>
                                                    </tr>
                                                </table>
                                            </button>
                                        </div>

                                    }
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={index === steps.length - 1 ? handleAccountClick : handleNext}
                                                sx={{ mt: 1, mr: 1 }}

                                            >
                                                {index === steps.length - 1 ? '규칙 등록하기' : '다음 단계로 넘어가기'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                뒤로 가기
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </Box>
            </div>
        </>
    );
}

export default RegisterRule;