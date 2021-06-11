import React, { Component } from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Container,
} from "@material-ui/core";
import { MenuIcon, ChevronLeftIcon } from "@material-ui/icons";

class dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Your Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <div className="toolbarIcon">
            <IconButton onclick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            
          </List>
        </Drawer>
        {/* Body of the page*/}
        <main>
          <Container maxWidth="lg">
            <Grid item xs={12} md={8} lg={9}>
              <Paper>

              </Paper>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default dashboard;
