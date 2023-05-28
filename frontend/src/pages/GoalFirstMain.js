import React, { useState } from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./GoalMain.css";
// import Carousel from "react-material-ui-carousel";
import CreateGoal from "./CreateGoal";
import { useHistory } from "react-router-dom";
import mouse02 from "assets/img/mouses/mouse02.png";

function GoalFirstMain() {
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "50px",
    height: "100px",
    width: "140px",
    marginTop: "50px",
  };
  const [showGoalDetail, setShowGoalDetail] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [category, setCategory] = useState("");
  const history = useHistory();
  const handleCategoryClick = (category) => {
    setCategory(category); // 클릭된 슬라이드의 카테고리 값을 설정
    setShowCreateGoal(true);
  };

  // Dummy data for the goals.
  // In a real application, you would fetch this from a server.
  const goals = [
    {
      id: 1,
      title: "모으자",
      description: "#비상금 #결혼 #은퇴준비",
      category: "모으자",
      image: mouse02,
    },
    {
      id: 2,
      title: "사보자",
      description: "#나를위한 #선물 #쇼핑",
      category: "사보자",
    },
    {
      id: 3,
      title: "가보자",
      description: "#가족여행 #기념여행 #힐링",
      category: "가보자",
    },
    // other goals...
  ];

  const handleSlideClick = (goal) => {
    setSelectedGoal(goal);
    setShowGoalDetail(true);
  };

  const handleSlideMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#172b4d"; // change to the color you want
  };

  const handleSlideMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#7691F6"; // change to original color
  };

  return (
    <div className="container">
      <Slider {...settings}>
        {goals.map((goal) => (
          <div
            onClick={() => handleCategoryClick(goal.category)}
            className="slide"
            //onClick={() => handleSlideClick(goal)}
            onMouseEnter={handleSlideMouseEnter}
            onMouseLeave={handleSlideMouseLeave}
            style={{ backgroundImage: `url(${goal.image})` }}
            key={goal.id}
          >
            <div className="slide-content">
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </div>
          </div>
        ))}
      </Slider>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          width: "800px",
        }}
      ></div>

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
          <CreateGoal setIsOpen={category} />
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
