import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GoalMain.css";
import GoalDetail from "./GoalDetail";
import CreateGoal from "./CreateGoal";
import axios from "axios";
import GoalFirstMain from "./GoalFirstMain";
import { Button, Card } from "reactstrap";
import "./CreateGoal.css";
import RegisterRule from "./RegisterRule";
import { Box } from "@mui/material";

function GoalMain({ userId }) {
  if (userId === null) {
    window.location.href = "/";
  }
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [showGoalDetail, setShowGoalDetail] = useState(false);
  const [showRule, setShowRule] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState("");

  const updateGoals = () => {
    axios
      .get(`/goal/list/${userId}`)
      .then((res) => {
        setGoals(res.data.goals);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get(`/goal/list/${userId}`)
      .then((res) => {
        setGoals(res.data.goals);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  if (goals.length === 0) {
    return <GoalFirstMain />;
  }
  const handleSlideClick = (goalId) => {
    axios
      .get(`/goal/detail/${goalId}`)
      .then((res) => {
        setSelectedGoal(res.data);
        setShowGoalDetail(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSlideMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#172b4d";
    e.currentTarget.style.color = "#f0f0f0";
  };

  const handleSlideMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#7691F6";
    e.currentTarget.style.color = "#f0f0f0";
  };

  const handleCreateGoalClick = () => {
    setShowCreateGoal(true);
    updateGoals();
  };

  const handleGoalDetailClose = () => {
    setShowGoalDetail(false);
    updateGoals();
  };

  const handleAddRule = (goal) => {
    //setSelectedGoalId(goalId);
    setSelectedGoal(goal);
    setShowRule(true);
  };

  const handleRuleClose = () => {
    setShowRule(false);
  };

  return (
    <div className="container mukho">
      <Slider
        dots={true}
        infinite={false}
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        centerPadding="20px"
        arrows={true}
      >
        {goals.map((goal) => (
          <Card className="muk d-flex justify-content-center align-items-center">
            <div
              className="slide"
              onClick={() => handleSlideClick(goal.goalId)}
              onMouseEnter={handleSlideMouseEnter}
              onMouseLeave={handleSlideMouseLeave}
              key={goal.goalId}
            >
              <div
                className="bookmark"
                style={{ backgroundColor: goal.goalImage }}
              />
              <h3>{goal.goalName}</h3>
              <h2>{goal.goalAmount}</h2>
              <h2>{goal.startDate}</h2>
            </div>
            <Button
              className="add-rule"
              onClick={() => handleAddRule(goal)}
              style={{
                width: "60%",
                justifyContent: "center",
              }}
            >
              규칙 추가
            </Button>
          </Card>
        ))}
      </Slider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Button
          color="primary"
          onClick={handleCreateGoalClick}
          onMouseEnter={handleSlideMouseEnter}
          onMouseLeave={handleSlideMouseLeave}
          style={{
            width: "33%",
            backgroundColor: "#7691F6",
            border: "0",
          }}
        >
          목표 생성
        </Button>
      </div>

      {showCreateGoal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1em",
            zIndex: 1000,
            borderRadius: "20px",
            boxShadow: "0 2px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <CreateGoal />
          <button
            onClick={() => setShowCreateGoal(false)}
            style={{
              fontSize: "12px",
              borderRadius: "50px",
              color: "black",
              position: "fixed",
              top: 0,
              left: 0,
            }}
          >
            X
          </button>
        </div>
      )}

      {showCreateGoal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 999,
          }}
          onClick={() => setShowCreateGoal(false)}
        />
      )}

      {showGoalDetail && selectedGoal && (
        <div className="modal-outer">
          <div
            className="modal-body"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "1em",
              zIndex: 1000,
              width: "50%",
              height: "75%",
            }}
          >
            <Box sx={{ width: "100%", height: "95%" }}>
              <GoalDetail
                goal={selectedGoal}
                goalId={selectedGoal.goalId}
                onClose={handleGoalDetailClose}
              />
            </Box>
          </div>
        </div>
      )}

      {showGoalDetail && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 999,
          }}
          onClick={handleGoalDetailClose}
        />
      )}

      {showRule && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1em",
            zIndex: 1000,
          }}
        >
          <RegisterRule
            goal={selectedGoal}
            onClose={handleRuleClose}
          />
          <button onClick={handleRuleClose}>Close</button>
        </div>
      )}

      {showRule && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 999,
          }}
          onClick={handleRuleClose}
        />
      )}
    </div>
  );
}

export default GoalMain;
