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
import BfrResult from "./pages/BfrResult.js";
import Loading from "./pages/Loading.js";

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
          <Route exact path="/" component={Hello}/>
          <Route exact path="/survey" component={Survey}/>
          <Route exact path="/main" component={Main}/>
          <Route exact path="/user" component={User}/>
          <Route exact path="/delete" component={Delete}/>
          <Route exact path="/goalMain" component={GoalMain}/>
          <Route exact path="/createGoal" component={CreateGoal}/>
          <Route exact path="/goal" component={Goal}/>
          <Route exact path="/bfr" component={Bfr}/>
          <Route exact path="/mypage" component={Mypage}/>
          <Route exact path="/manageaccount" component={ManageAccount}/>
          <Route exact path="/session" component={Loading}/>
          <Route exact path="/bfr-result" component={BfrResult}/>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
