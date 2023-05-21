import { React, useState, useEffect } from 'react';
import axios from 'axios';

function User() {
    const [login, setLogin] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        axios.get("/status/login")
        .then(response1 => {
            setLogin(response1.data.login);

            if (login === false) return;
            axios.get("/status/user")
                .then(response2 => {
                    setUser(response2.data);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }, [login]);

    if (login === false) {
        window.location.href = "/";
        return;
    }

    return(
        <div name='user'>
            순번: {user["userId"]}<br/>
            이름: {user["name"]}<br/>
            이메일: {user["email"]}<br/>
            성별: {user["gender"]}<br/>
            출생년도: {user["birthYear"]}<br/>
            연령대: {user["age"]}<br/>
            프로필 링크: {user["profileImage"]}<br/>
            금융대사량 타입: {user["financialType"]}<br/>
            목표 갯수: {user["goalCnt"]}<br/>
            목표 달성률: {user["achievementRate"]}<br/>
            <hr/>
            <a href='/main'>메인으로</a><br/>
            <a href='/delete'>회원탈퇴</a>
        </div>
    );
}

export default User;
