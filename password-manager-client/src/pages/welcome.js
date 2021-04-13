import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { Paper, Grid } from "@material-ui/core";
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
          <Paper elevation={3}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <NavLink
                  to="/signup"
                  activeClassName="formTitleLinkActive"
                  className="formTitleLink"
                >
                  Create an account
                </NavLink>
                {""}
                or{""}
                <NavLink
                  to="/login"
                  activeClassName="formTitleLinkActive"
                  className="formTitleLink"
                >
                  Log in
                </NavLink>
              </Grid>
              <Grid item>
                <Route exact path="/login" component={logIn} />
                <Route exact path="/signup" component={signUp} />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Router>
    );
  }
}
export default welcome;
