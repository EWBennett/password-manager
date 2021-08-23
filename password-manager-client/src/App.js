import { deepPurple, teal } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import FrontPage from "./pages/frontPage";
import Welcome from "./pages/welcome";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        primary: deepPurple,
        secondary: teal,
        type: prefersDarkMode ? "dark" : "light",
      },
      typography: {
        fontFamily: "Raleway",
      },
    })
  );
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
