import React from "react";

function Main() {
  if (sessionStorage.getItem("userId") === null) {
    window.location.href = "/";
  } else if (sessionStorage.getItem("financialType") === "null") {
    window.location.href = "/survey";
  } else {
    return (
      <div>
        로그인 후 들어오는 페이지 테스트 중입니다.
        <br />
        <a href="/user">유저 정보 보기</a>
        <br />
        <a href="/logout">로그아웃</a>
        <br />
      </div>
    );
  }
}

export default Main;
