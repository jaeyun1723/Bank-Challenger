import { React, useState, useEffect } from 'react';
import axios from 'axios';

function User() {
    const [login, setLogin] = useState('');

    const deleteProcess = () => {
        if (window.confirm("진짜 탈퇴하시겠습니까?") === false) {
            window.location.href = "/user";
            return;
        }
    
        axios.delete("/status/delete");
        alert("탈퇴되었습니다.");
        window.location.href = "/logout";
    }

    useEffect(() =>{
        axios.get("/status/login")
        .then(response => {
            setLogin(response.data.login);
        })
        .catch(error => console.log(error));
    }, []);

    if (login === false) {
        window.location.href = "/";
    } else {
        document.onload = deleteProcess();
    }

    return(
        <div name='delete'/>
    );
}

export default User;
