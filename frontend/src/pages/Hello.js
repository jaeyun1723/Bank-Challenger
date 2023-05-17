import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Hello() {
    const [login, setLogin] = useState('');

    useEffect(() => {
        axios.get("/status/login")
        .then(response => {
            setLogin(response.data.login);
        })
        .catch(error => console.log(error));
    }, []);

    if (login === true) {
        window.location.href = "/main";
    } else {
        return(
            <div>
                <a href="/login">네이버로 로그인 하기</a>
            </div>
        );
    }
}

export default Hello;
