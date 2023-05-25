import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GoalMain.css";
import CreateGoal from "./CreateGoal";

function GoalFirstMain() {
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "20px",
  };
  const [showGoalDetail, setShowGoalDetail] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Dummy data for the goals.
  // In a real application, you would fetch this from a server.
  const goals = [
    { id: 1, title: "모으자", description: "~~~~~~" },
    { id: 2, title: "사보자", description: "~~~~~~~" },
    { id: 3, title: "가보자", description: "~~~~~~" },
    // other goals...
  ];

  const handleSlideClick = (goal) => {
    setSelectedGoal(goal);
    setShowGoalDetail(true);
  };

  const handleSlideMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#f0f0f0"; // change to the color you want
  };

  const handleSlideMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#7691F6"; // change to original color
  };

  return (
    <div className="container">
      <Slider {...settings}>
        {goals.map((goal) => (
          <div
            className="slide"
            onClick={() => handleSlideClick(goal)}
            onMouseEnter={handleSlideMouseEnter}
            onMouseLeave={handleSlideMouseLeave}
            key={goal.id}
          >
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
          </div>
        ))}
      </Slider>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
      >
        <button onClick={() => setShowCreateGoal(true)}>목표 생성</button>
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
          }}
        >
          <CreateGoal />
          <button onClick={() => setShowCreateGoal(false)}>Close</button>
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
    </div>
  );
}

export default GoalFirstMain;
