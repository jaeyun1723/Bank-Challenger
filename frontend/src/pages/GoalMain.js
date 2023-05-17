import React, {useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GoalMain.css";
import CreateGoal from "./CreateGoal";


function GoalMain() {
    const [showCreateGoal, setShowCreateGoal] = useState(false);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '20px'

    };
    return (
        <div className="container">
            <Slider {...settings}>
                <div className="slide">
                    <h3>미국 여행</h3>
                    <p>미국 여행까지 1000만원 모으기</p>
                </div>
                <div className="slide">
                    <h3>벤츠 e 클래스</h3>
                    <p>1억 모으기</p>
                </div>
                <div className="slide">
                    <h3>아이폰 16</h3>
                    <p>출시일 전까지 200만원 꼭 모으고 만당</p>
                </div>
                <div className="slide">
                    <h3>부모님 결혼 30주년 기념</h3>
                    <p>내년까지 5000만원 모아서 드릴 예정</p>
                </div>


            </Slider>
            <h1>목표</h1>
            <button onClick={() => setShowCreateGoal(true)}>목표 생성</button>
            {showCreateGoal && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '1em',
                    zIndex: 1000,
                }}>
                    <CreateGoal />
                    <button onClick={() => setShowCreateGoal(false)}>Close</button>
                </div>
            )}
            {showCreateGoal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 999,
                }} onClick={() => setShowCreateGoal(false)} />
            )}
        </div>
    );
}
export default GoalMain;