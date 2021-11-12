import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chatroom from "./Pages/Chatroom";

import DashboardPage from "./Pages/DashboardPage";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

const routes = [
  {
    path: "/",
    component: IndexPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/dashboard",
    component: DashboardPage,
  },
  {
    path: "/chatroom/:id",
    component: Chatroom,
  },
];

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact
            component={route.component}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
