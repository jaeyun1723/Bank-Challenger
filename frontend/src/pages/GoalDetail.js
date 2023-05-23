import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoalDetail.css';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Replace this with the actual server URL
});

const GoalDetail = ({ goalId, onClose }) => {
    const [goalDetail, setGoalDetail] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedGoalName, setUpdatedGoalName] = useState('');
    const [updatedGoalAmount, setUpdatedGoalAmount] = useState('');
    const [updatedSavingAmount, setUpdatedSavingAmount] = useState('');
    const [updatedGoalImage, setUpdatedGoalImage] = useState('');
    const [updatedDay, setUpdatedDay] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        axios
            .get(`/goal/detail/${goalId}`)
            .then((res) => {
                setGoalDetail(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [goalId]);

    const handleEditClick = () => {
        setIsEditing(true);
        setUpdatedGoalName(goalDetail.goalName);
        setUpdatedGoalAmount(goalDetail.goalAmount);
        setUpdatedSavingAmount(goalDetail.savingAmount);
        setUpdatedGoalImage(goalDetail.goalImage);
        setUpdatedDay(goalDetail.day);
    };

    const handleSaveClick = () => {
        const updatedGoal = {
    ...goalDetail, // 원래의 goalDetail 데이터를 복사
            goalName: updatedGoalName,
            goalAmount: updatedGoalAmount,
            savingAmount: updatedSavingAmount,
            goalImage: updatedGoalImage,
            day: updatedDay,
    };

        axios
            .put(`/goal/${goalId}`, updatedGoal)
            .then((res) => {
                console.log('Goal updated successfully');
                setIsEditing(false);
                setGoalDetail(res.data);
                onClose();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (confirmDelete) {
            axios
                .delete(`/goal/${goalId}`)
                .then((res) => {
                    console.log('Goal deleted successfully');
                    onClose(); // 삭제 후 창 닫기

                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    if (!goalDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="goal-detail">
                {!isEditing ? (
                    <>
                        <h1>{goalDetail.goalName}</h1>
                        <p>저축 시작일: {goalDetail.savingStartDate}</p>
                        <p>목표 금액: {goalDetail.goalAmount}</p>
                        <p>매달 저축 금액: {goalDetail.savingAmount}</p>
                        <p>목표 이미지: {goalDetail.goalImage}</p>
                        <p>매달 자동이체 날짜: {goalDetail.day} 일</p>
                        <button onClick={handleEditClick}>목표 수정</button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={updatedGoalName}
                            onChange={(e) => setUpdatedGoalName(e.target.value)}
                        />
                        <input
                            type="text"
                            value={updatedGoalAmount}
                            onChange={(e) => setUpdatedGoalAmount(e.target.value)}
                        />
                        <input
                            type="text"
                            value={updatedSavingAmount}
                            onChange={(e) => setUpdatedSavingAmount(e.target.value)}
                        />
                        <input
                            type="text"
                            value={updatedGoalImage}
                            onChange={(e) => setUpdatedGoalImage(e.target.value)}
                        />
                        <input
                            type="text"
                            value={updatedDay}
                            onChange={(e) => setUpdatedDay(e.target.value)}
                        />
                        <button onClick={handleSaveClick}>저장</button>
                    </>
                )}
            </div>
            <div className="button-group">
                <button onClick={handleDeleteClick}>목표 삭제</button>
            </div>
        </div>
    );
};

export default GoalDetail;
