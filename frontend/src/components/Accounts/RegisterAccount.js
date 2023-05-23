import React from 'react';

const baseUrl='https://testapi.openbanking.or.kr/oauth/2.0/authorize?';

function RegisterWithdrawAccountButton() {
  return (
    <div style={{ display: 'flex' }}>
      <button style={{ fontSize: '12px', padding: '5px 23px', marginRight: '15px'}} class="btn-1 ml-1 btn btn-outline-info">계좌 추가하기</button>
      <button style={{ fontSize: '12px', padding: '5px 23px'}} class="btn-1 ml-1 btn btn-outline-info">계좌 삭제하기</button>
    </div>
  );
}

export default RegisterWithdrawAccountButton;