import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import signUp from "../components/signUp";
import logIn from "../components/logIn";

class welcome extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router basename="/welcome">
        <div className="App">
          <div className="appForm">
            <div className="formTitle">
              <NavLink to="/signup" activeClassName="formTitleLinkActive" className="formTitleLink">
                Create an account
              </NavLink>
              {""}
              or{""}
              <NavLink to="/login" activeClassName="formTitleLinkActive" className="formTitleLink">
                Log in
              </NavLink>
            </div>
            <Route exact path="/login" component={logIn} />
            <Route exact path="/signup" component={signUp} />
          </div>
        </div>
      </Router>
    );
  }
}
export default welcome;
