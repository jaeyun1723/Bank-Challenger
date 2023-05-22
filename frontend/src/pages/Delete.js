import axios from "axios";

function Delete() {
  if (sessionStorage.getItem("userId") === null) {
    window.location.href = "/";
    return;
  }

  if (window.confirm("진짜 탈퇴하시겠습니까?") === false) {
    window.location.href = "/user";
    return;
  }

  axios.delete("/delete");
  alert("탈퇴되었습니다.");
  window.location.href = "/";
}

export default Delete;
