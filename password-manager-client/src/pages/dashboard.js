import React, { Component } from "react";
import { AppBar, Drawer, IconButton, Toolbar, Typography, Divider } from "@material-ui/core";

class dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              //onClick={handleDrawerOpen}
            ></IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Your Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent">
          <div className="toolbarIcon">
            <IconButton
            //onclick={handleDrawerClose}
            ></IconButton>
          </div>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default dashboard;
