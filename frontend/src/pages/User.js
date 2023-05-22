import React from "react";

function User() {
  if (sessionStorage.getItem("userId") === null) {
    window.location.href = "/";
    return;
  }

  return (
    <div name="user">
      순번: {sessionStorage.getItem("userId")}
      <br />
      이름: {sessionStorage.getItem("name")}
      <br />
      이메일: {sessionStorage.getItem("email")}
      <br />
      성별: {sessionStorage.getItem("gender")}
      <br />
      출생년도: {sessionStorage.getItem("birthYear")}
      <br />
      연령대: {sessionStorage.getItem("age")}
      <br />
      프로필 링크: {sessionStorage.getItem("profileImage")}
      <br />
      금융대사량 타입: {sessionStorage.getItem("financialType")}
      <br />
      목표 갯수: {sessionStorage.getItem("goalCnt")}
      <br />
      목표 달성률: {sessionStorage.getItem("achievementRate")}
      <br />
      <hr />
      <a href="/main">메인으로</a>
      <br />
      <a href="/delete">회원탈퇴</a>
    </div>
  );
}

export default User;
