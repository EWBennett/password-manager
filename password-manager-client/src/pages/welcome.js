import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink, Link } from "react-router-dom";
import { Paper, Grid, Typography } from "@material-ui/core";
import signUp from "../components/signUp";
import logIn from "../components/logIn";
import logo from "../Assets/Mimir Logo Light.png";

class welcome extends Component {
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
export default welcome;
