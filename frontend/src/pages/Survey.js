import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Survey() {
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
                설문조사(+금융대사량) 페이지 테스트 중입니다.<br/>
                <a href="/main">메인으로 가기(디비 작업 없으면 못 감)</a><br/>
                <a href="/logout">로그아웃</a>
            </div>
        );
    }
}

export default Survey;
