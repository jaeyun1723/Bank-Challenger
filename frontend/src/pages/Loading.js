import axios from "axios";

export default function Loading() {
  setTimeout(() => {
    axios
      .get("/status/user")
      .then((res) => {
        console.log("res.data", res.data);
        sessionStorage.setItem("userId", res.data.userId);
        sessionStorage.setItem("name", res.data.name);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("gender", res.data.gender);
        sessionStorage.setItem("birthYear", res.data.birthYear);
        sessionStorage.setItem("age", res.data.age);
        sessionStorage.setItem("profileImage", res.data.profileImage);
        sessionStorage.setItem("financialType", res.data.financialType);
        sessionStorage.setItem("goalCnt", res.data.goalCnt);
        sessionStorage.setItem("achievementRate", res.data.achievementRate);
        sessionStorage.setItem("savingAmount", res.data.savingAmount);
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  }, 250);
}
