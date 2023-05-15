import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Main() {
    const [login, setLogin] = useState('');
    const [bfr, setBfr] = useState('');

    useEffect(() =>{
        axios.get("/status/login")
            .then(response => {
                setLogin(response.data.login);
            })
            .catch(error => console.log(error));

        axios.get("/status/bfr")
            .then(response => {
                setBfr(response.data.bfr);
            })
            .catch(error => console.log(error));
    }, []);

    if (login === false) {
        window.location.href = "/";
    }
    else if (bfr === false) {
        window.location.href = "/survey";
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

export default Main;
