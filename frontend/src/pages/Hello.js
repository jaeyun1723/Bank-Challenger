import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Hello() {
    const [status, setStatus] = useState('');

    useEffect(() =>{
        axios.get("/status/login")
        .then(response => {
            setStatus(response.data.login);
        })
        .catch(error => console.log(error));
    }, []);

    if (status === true) {
        window.location.href = "/main";
    }
    else {
        return(
            <div>
                <a href="/login">로그인</a>
                {status}
            </div>
        );
    }
}

export default Hello;
