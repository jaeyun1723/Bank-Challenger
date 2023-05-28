import React, { useState, useEffect } from "react";
import RegisterRule from "./RegisterRule";
import "./Connection.css";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Goal from "./Goal";

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
        <div className="connection" style={{ borderRadius: "40px" }}>
          <Typography style={{ fontSize: "20px", fontWeight: "normal" }}>
            목표가 생성 되었어요!
          </Typography>
          {showButton && (
            <div style={{ display: "flex" }}>
              <Button
                onClick={handleGoalMainRedirect}
                style={{
                  height: "25px",
                  marginRight: "20px",
                  width: "150px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                확인
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Connection;
