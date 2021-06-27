import { Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { HashRouter as Router, Link, NavLink, Route } from "react-router-dom";
import logo from "../Assets/Mimir Logo Light.png";
import logIn from "../components/logIn";
import signUp from "../components/signUp";

class Welcome extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="pageBackground">
        <Link to="/">
          <img className="logo" src={logo} alt=""></img>
        </Link>
        <Router basename="/welcome">
          <div className="App">
            <Paper elevation={3}>
              <div className="formWrap">
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="h5" component={NavLink} to="/signup">
                      Create an account
                    </Typography>{" "}
                    or{" "}
                    <Typography variant="h5" component={NavLink} to="/login">
                      Log in
                    </Typography>
                  </Grid>
                  <Route exact path="/login" component={logIn} />
                  <Route exact path="/signup" component={signUp} />
                </Grid>
              </div>
            </Paper>
          </div>
        </Router>
      </div>
    );
  }
}
export default Welcome;
