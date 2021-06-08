import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink, Link } from "react-router-dom";
import welcome from "./welcome";
import { Container, Grid, Box, Button, Typography, withStyles } from "@material-ui/core";
import logo from "../Assets/Mimir Logo Light.png";
import picture from "../Assets/Cyber Crime.png";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

class frontPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="pageBackground">
        <img className="logo" src={logo} alt=""></img>
        <div className="pageContent">
          <div className="contentWrap">
            <div className="title">
              <WhiteTextTypography variant="h2">
                <Box fontWeight="fontWeightMedium">
                  Protect your data.
                  <br />
                  Never forget a password again.
                </Box>
              </WhiteTextTypography>
              <div className="paragraphWrap">
                <div className="paragraphContent">
                  <WhiteTextTypography>
                    A password manager for the modern age. Because you and your data deserve the
                    best. This is a paragraph all about how cool this product is. Please sign up to
                    use it. You won't regret it. For sure. I promise.
                  </WhiteTextTypography>
                </div>
                <Button variant="contained" color="white" component={Link} to="/welcome/signup">
                  Welcome - Click to log in or sign up
                </Button>
              </div>
            </div>
            <div className="imageWrap">
              <img className="image" src={picture} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default frontPage;
