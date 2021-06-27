import { pink, purple } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import dashboard from "./pages/dashboard";
import frontPage from "./pages/frontPage";
import welcome from "./pages/welcome";

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
