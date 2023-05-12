import React from 'react';
import Api from '../services/Api';

function Login() {
    const clientId = Api.client_id;
    const callbackUrl = Api.callback_url;
    const state = Api.state;
    const naverLogin = () => {
        var url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id='+clientId+'&redirect_uri='+callbackUrl+'&state='+state;
        window.location.replace(url);
    };

    return(
        <div>
            <a class="button_naver" onclick={naverLogin()}>
                <h5 style="color:white; margin-top:0px; padding-top:13px;">네이버 아이디로 로그인</h5>
            </a>
        </div>
    );
}

export default Login;
