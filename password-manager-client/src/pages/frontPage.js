import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import welcome from "./welcome";
import passwordForm from "../components/passwordForm";

class frontPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router basename="/">
        <NavLink to="/welcome" activeClassName="formTitleLinkActive" className="formTitleLink">
          Welcome - Click to log in or sign up
        </NavLink>
        <Route exact path="/welcome" component={welcome} />
      </Router>
    );
  }
}
export default frontPage;
