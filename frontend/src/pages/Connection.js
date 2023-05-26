// Connection.js
import React, { useState } from 'react';
import RegisterRule from './RegisterRule';
import './Connection.css';
function Connection() {
    const [showRegisterRule, setShowRegisterRule] = useState(false);

    const handleNext = () => {
        setShowRegisterRule(true);
    };

    return (
        <div>
            {showRegisterRule ? (
                <RegisterRule />
            ) : (
                <div className="connection">
                <>
                    <h1>목표 생성 완료~!!</h1>
                    <h2>서비스를 이용하려면 계좌를 등록해야 돼요~!</h2>
                    <h2>계좌 등록을 계속 할까요?</h2>
                    <button onClick={handleNext}>등록할래요!!</button>
                </>
                </div>
            )}
        </div>
    );
}

export default Connection;
