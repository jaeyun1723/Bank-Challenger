import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import shinhanLogo from "assets/img/brand/shinhan.png";
import bnkLogo from "assets/img/brand/bnk.png";
import citiLogo from "assets/img/brand/citi.png";
import dgbLogo from "assets/img/brand/dgb.png";
import ibkLogo from "assets/img/brand/ibk.png";
import kbLogo from "assets/img/brand/kb.png";
import kdbLogo from "assets/img/brand/kdb.jpg";
import kjbLogo from "assets/img/brand/kjb.png";
import mgLogo from "assets/img/brand/mg.jpg";
import nonghyupLogo from "assets/img/brand/nonghyup.png";
import sanghoLogo from "assets/img/brand/sangho.jpg";
import scLogo from "assets/img/brand/sc.png";
import shinhyupLogo from "assets/img/brand/shinhyup.jpg";
import suhyupLogo from "assets/img/brand/suhyup.png";
import wooriLogo from "assets/img/brand/woori.jpg";
import hanaLogo from "assets/img/brand/hana.png";
import { ImportantDevices } from "@mui/icons-material";

function getBankLogo(bankName) {
    switch (bankName) {
        case "신한은행":
            return shinhanLogo;
        case "KDB산업은행":
            return kdbLogo;
        case "IBK기업은행":
            return ibkLogo;
        case "KB국민은행":
            return kbLogo;
        case "수협은행":
            return suhyupLogo;
        case "NH농협은행":
            return nonghyupLogo;
        case "우리은행":
            return wooriLogo;
        case "SC제일은행":
            return scLogo;
        case "한국씨티은행":
            return citiLogo;
        case "대구은행":
            return dgbLogo;
        case "부산은행":
            return bnkLogo;
        case "광주은행":
            return kjbLogo;
        case "제주은행":
            return shinhanLogo;
        case "전북은행":
            return kjbLogo;
        case "경남은행":
            return bnkLogo;
        case "새마을금고":
            return mgLogo;
        case "신협":
            return shinhyupLogo;
        case "상호저축은행":
            return sanghoLogo;
        case "하나은행":
            return hanaLogo;
        default:
            return "";
    }
};

function RegisterRule() {
    const [withdrawAccounts, setWithdrawAccounts] = useState([]);
    const [savingAccounts, setSavingAccounts] = useState([]);
    const [registerWAccount, setRegisterWAccount]=useState([]);
    const [registerSAccount, setRegisterSAccount]=useState([]);
    const [isActive, setIsActive] = useState(false);
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("name");
    if (userId == null) window.location.href = "/";

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
            description: '목표에 등록할 출금 계좌 선택'
        },
        {
            label: '입금 계좌 등록',
            description: '목표에 등록할 임금할 계좌 선택'
        },
        {
            label: '확인',
            description: '목표에 등록할 계좌 확인'
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

    return (
        <>
            <div className="text-primary text-center ml--5">
                <h2>{userName} 님의 목표 계좌 선택</h2>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'left',
                height: '100vh',
                width: '767px',
                height: '767px',
            }}>
                <Box sx={{ maxWidth: 400 }} >
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    {index === 0 && <Typography>{step.description}</Typography>}
                                    {index === 0 &&
                                        withdrawAccounts.map((it) => (
                                            <div style={{ textAlign: "left" }}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleWithdrawAccountClick(it)}
                                                    style={{
                                                        marginBottom: "5px",
                                                        textAlign: "left",
                                                        width: "600px",
                                                        display: "flex",
                                                    }}
                                                    className={`text-primary btn-neutral ml-1 btn btn-primary ${
                                                        it === registerWAccount ? "active" : ""
                                                      }`}
                                                >
                                                    <table style={{ marginRight: "auto" }}>
                                                        <tr>
                                                            <th rowSpan="2">
                                                                <span>
                                                                    <img
                                                                        alt="..."
                                                                        className="img-fluid"
                                                                        src={getBankLogo(it.bankName)}
                                                                        style={{
                                                                            textAlign: "left",
                                                                            marginBottom: "3px",
                                                                            width: "35px",
                                                                            marginRight: "10px",
                                                                        }}
                                                                    />
                                                                </span>
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontSize: "12px",
                                                                    textAlign: "left",
                                                                    marginRight: "10px",
                                                                }}
                                                            >
                                                                {it.bankName}
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ fontSize: "16px", textAlign: "right" }}>
                                                                {it.accountNumMasked}
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </button>
                                            </div>
                                        ))}
                                    {index === 1 && <Typography>{step.description}</Typography>}
                                    {index === 1 && savingAccounts.map((it) => (
                                        <div style={{ textAlign: "left" }}>
                                            <button
                                                type="button"
                                                onClick={() => handleSavingAccountClick(it)}
                                                style={{
                                                    marginBottom: "5px",
                                                    textAlign: "left",
                                                    width: "600px",
                                                    display: "flex",
                                                }}
                                                className={`text-primary btn-neutral ml-1 btn btn-primary ${
                                                    it === registerSAccount ? "active" : ""
                                                  }`}
                                            >
                                                <table style={{ marginRight: "auto" }}>
                                                    <tr>
                                                        <th rowSpan="2">
                                                            <span>
                                                                <img
                                                                    alt="..."
                                                                    className="img-fluid"
                                                                    src={getBankLogo(it.bankName)}
                                                                    style={{
                                                                        textAlign: "left",
                                                                        marginBottom: "3px",
                                                                        width: "35px",
                                                                        marginRight: "10px",
                                                                    }}
                                                                />
                                                            </span>
                                                        </th>
                                                        <th
                                                            style={{
                                                                fontSize: "12px",
                                                                textAlign: "left",
                                                                marginRight: "10px",
                                                            }}
                                                        >
                                                            {it.bankName}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ fontSize: "16px", textAlign: "right" }}>
                                                            {it.accountNumMasked}
                                                        </th>
                                                    </tr>
                                                </table>
                                            </button>
                                        </div>
                                    ))}
                                    {index === 2 && <Typography>{step.description}</Typography>}
                                    {index==2&&
                                    <div>
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
                                            <img
                                                alt="..."
                                                className="img-fluid"
                                                src={getBankLogo(registerWAccount.bankName)}
                                                style={{
                                                    textAlign: "left",
                                                    marginBottom: "3px",
                                                    width: "35px",
                                                    marginRight: "10px",
                                                }}
                                            />
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
                                            <img
                                                alt="..."
                                                className="img-fluid"
                                                src={getBankLogo(registerSAccount.bankName)}
                                                style={{
                                                    textAlign: "left",
                                                    marginBottom: "3px",
                                                    width: "35px",
                                                    marginRight: "10px",
                                                }}
                                            />
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
                                    }
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? '계좌 등록하기' : '다음 단계로 넘어가기'}
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