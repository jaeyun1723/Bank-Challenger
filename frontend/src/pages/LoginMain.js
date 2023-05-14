import { React, useState, useEffect } from 'react';
import axios from 'axios';

function LoginMain() {
    const [status, setStatus] = useState('');

    useEffect(() =>{
        axios.get("/status/login")
        .then(response => {
            setStatus(response.data.login);
        })
        .catch(error => console.log(error));
    }, []);

    if (status === false) {
        window.location.href = "/";
    }
    else {
        return(
            <div>
                로그인 후 들어오는 페이지 테스트 중입니다.<br/>
                <a href="/logout">로그아웃</a>
            </div>
        );
    }
}

export default LoginMain;
