import { React, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import Hello from "./pages/Hello.js";
import Survey from "./pages/Survey";
import Main from "./pages/Main";
import User from "./pages/User";
import Delete from "./pages/Delete";
import GoalMain from "./pages/GoalMain";
import CreateGoal from "./pages/CreateGoal";
import Goal from "./pages/Goal.js";
import Bfr from "./pages/Bfr.js";
import Mypage from "./pages/Mypage.js";
import ManageAccount from "./pages/ManageAccount.js";

function App() {
  const [login, setLogin] = useState("");

  useEffect(() => {
    axios
      .get("/status/login")
      .then((response) => {
        setLogin(response.data.login);
      })
      .catch((error) => console.log(error));
  }, [login]);

  const setSession = () => {
    axios
      .get("/status/user")
      .then((res) => {
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
      })
      .catch((error) => console.log(error));
  };

  if (sessionStorage.getItem("userId") === null) {
    // 로그인은 되었으나 세션 정보가 없는 경우, 세션 갱신
    if (login === true) {
      setSession();
    }
  } else {
    // 로그아웃 상태이나 세션 정보가 남아 있는 경우, 세션 제거
    if (login === false) {
      sessionStorage.clear();
    } else {
      setSession();
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <Hello {...props} />} />

        <Route path="/survey" exact render={(props) => <Survey {...props} />} />
        <Route path="/main" exact render={(props) => <Main {...props} />} />
        <Route path="/user" exact render={(props) => <User {...props} />} />
        <Route path="/delete" exact render={(props) => <Delete {...props} />} />
        <Route
          path="/goalMain"
          exact
          render={(props) => <GoalMain {...props} />}
        />
        <Route
          path="/createGoal"
          exact
          render={(props) => <CreateGoal {...props} />}
        />
        <Route
          path="/goal-page"
          exact
          render={(props) => <Goal {...props} />}
        />
        <Route path="/bfr-page" exact render={(props) => <Bfr {...props} />} />
        <Route
          path="/mypage-page"
          exact
          render={(props) => <Mypage {...props} />}
        />
        <Route
          path="/manageaccount-page"
          exact
          render={(props) => <ManageAccount {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
