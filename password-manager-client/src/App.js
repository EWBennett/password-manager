import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import frontPage from "./pages/frontPage";
import welcome from "./pages/welcome";
import dashboard from "./pages/dashboard";
import "./App.css";
import { pink, purple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: pink,
  },
  typography: {
    fontFamily: "Raleway",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={frontPage} />
          <Route path="/welcome" component={welcome} />
          <Route path="/dashboard" component={dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
