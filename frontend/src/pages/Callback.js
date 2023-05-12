import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../services/Api';

function Callback() {
    const [user, setUser] = useState('');

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const clientId = Api.client_id;
    const clientSecret = Api.client_secret;
    const apiUrl = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='+
            clientId+'&client_secret='+clientSecret+'&code='+code+'&state='+state;

    useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo() {
        await axios
            .get(apiUrl)
            .then((response) => { 
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return(
        <div>
            {user}
        </div>
    );
}

export default Callback;
