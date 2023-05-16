import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Delete() {
    const [login, setLogin] = useState('');

    useEffect(() =>{ 
        axios.get("/status/login")
        .then(response => {
            setLogin(response.data.login);
        })
        .then(() => {
            if (login == false) {
                window.location.href = "/";
            } else {
                if (window.confirm("진짜 탈퇴하시겠습니까?") === false) {
                    window.location.href = "/user";
                    return;
                }
            
                axios.delete("/status/delete");
                alert("탈퇴되었습니다.");
                window.location.href = "/";
            }
        })
        .catch(error => console.log(error));
    }, [login]);

}

export default Delete;
