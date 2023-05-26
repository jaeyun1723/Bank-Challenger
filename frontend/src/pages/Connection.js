import React, { useState, useEffect } from 'react';
import RegisterRule from './RegisterRule';
import './Connection.css';
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

function Connection() {
    const [showRegisterRule, setShowRegisterRule] = useState(false);
    const [showSecondText, setShowSecondText] = useState(false);
    const [showThirdText, setShowThirdText] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowSecondText(true);
        }, 2000); // Delay in milliseconds for the second text

        setTimeout(() => {
            setShowThirdText(true);
        }, 4000); // Delay in milliseconds for the third text

        setTimeout(() => {
           setShowButton(true);
    }, 6000); // Delay in milliseconds for the third text
}, []);


const handleNext = () => {
        setShowRegisterRule(true);
    };

    return (

            {showRegisterRule ? (
                <RegisterRule />
            ) : (
                <div className="connection" style={{ borderRadius: "40px" }}>
                <>
                    <Typography style={{ fontSize: "20px", fontWeight: "normal" }}>
                        목표가 생성 되었어요!
                    </Typography>
                    {showSecondText && (
                        <Typography style={{ fontSize: "18px", fontWeight: "normal" }}>
                            서비스를 이용하려면, 계좌를 등록해야 돼요
                        </Typography>
                    )}
                    {showThirdText && (
                        <Typography style={{ fontSize: "18px", fontWeight: "normal" }}>
                            계좌 등록을 계속 할까요?
                        </Typography>
                    )}
                    {showButton && (
                        <div style={{display: "flex"}}>
                        <Button onClick={handleNext} style={{ height: "25px", marginRight: "20px", width: "150px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)" }}>
                            나중에 등록할게요!
                        </Button>
                        <Button onClick={handleNext} style={{ height: "25px", width: "150px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)" }}>
                        등록할래요!!
                    </Button>
                        </div>
                    )}
                </>
                </div>
            )}
        </div>
    );
}

export default Connection;
