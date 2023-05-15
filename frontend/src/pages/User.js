import { React, useState, useEffect } from 'react';
import axios from 'axios';

function User() {
    const [login, setLogin] = useState('');
    const [user, setUser] = useState('');

    useEffect(() =>{
        axios.get("/status/login")
        .then(response => {
            setLogin(response.data.login);

            if (login === false) return;
            axios.get("/status/user")
                .then(response2 => {
                    setUser(response2.data);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }, []);

    if (login === false) {
        window.location.href = "/";
    }
    else {
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
                <hr/>
                <a href='/main'>메인으로</a>
            </div>
        );
    }
}

export default User;
