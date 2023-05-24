import React, { useState } from 'react';
import './RegisterRule.css'
const RegisterRule = () => {
    const [ruleName, setRuleName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에서 규칙을 추가하는 로직을 작성하시면 됩니다.
        console.log(`규칙 생성: ${ruleName}`);
    };

    return (
        <div className="register-rule">
            <h1>규칙 생성</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>재윤오빠가 만든 계좌 선택 아코디언 가져올 거</label>
                    <input
                        type="text"
                        value={ruleName}
                        onChange={(e) => setRuleName(e.target.value)}
                    />
                </div>
                <button type="submit">생성</button>
            </form>
        </div>
    );
};

export default RegisterRule;
