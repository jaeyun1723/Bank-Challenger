import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Hello from "./pages/Hello.js";
import Survey from './pages/Survey';
import Main from './pages/Main';
import User from './pages/User';
import Delete from './pages/Delete';
import GoalMain from './pages/GoalMain';
import CreateGoal from './pages/CreateGoal';
import Goal from "./pages/Goal.js";
import Bfr from "./pages/Bfr.js";
import Mypage from "./pages/Mypage.js";
import ManageAccount from "./pages/ManageAccount.js";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <Hello {...props} />}/>

          <Route
              path="/survey"
              exact
              render={(props) => <Survey {...props} />}
          />
          <Route
              path="/main"
              exact
              render={(props) => <Main {...props} />}
          />
          <Route
              path="/user"
              exact
              render={(props) => <User {...props} />}
          />
          <Route
              path="/delete"
              exact
              render={(props) => <Delete {...props} />}
          />
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
          <Route
              path="/bfr-page"
              exact
              render={(props) => <Bfr {...props} />}
          />
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
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;