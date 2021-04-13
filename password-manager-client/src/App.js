import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import frontPage from "./pages/frontPage";
import welcome from "./pages/welcome";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={frontPage} />
        <Route path="/welcome" component={welcome} />
      </Switch>
    </Router>
  );
}

export default App;
