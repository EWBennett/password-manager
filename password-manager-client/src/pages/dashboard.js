import React, { Component } from "react";
import { Router, Route, NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Box,
  Paper,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  Add,
  Autorenew,
  Settings,
} from "@material-ui/icons";
import vault from "../components/vault";
import passwordForm from "../components/passwordForm";
import passwordGenerator from "../components/passwordGenerator";
import settings from "../components/settings";
import logo from "../Assets/Mimir Logo Light.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    background: "purple",
    backgroundColor: "purple",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "purple",
    backgroundColor: "purple",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    marginBottom: "20px",
    marginTop: "20px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    padding: theme.spacing(4),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* Top navigation bar */}
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Your Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Left navigation drawer/sidebar */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className="paddingDiv" />
          <img
            src={logo}
            alt=""
            width="102px"
            height="160px"
            className={clsx({ [classes.hide]: !open })}
          ></img>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRight style={{ color: "white" }} />
            ) : (
              <ChevronLeft style={{ color: "white" }} />
            )}
          </IconButton>
        </div>
        <Box m={2}>
          <Divider variant="middle" />
        </Box>
        <List>
          <ListItem button component={NavLink} to="/dashboard/vault">
            <ListItemIcon>
              <Home style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Vault" />
          </ListItem>
          <ListItem button component={NavLink} to="/dashboard/addpassword">
            <ListItemIcon>
              <Add style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Add a password" />
          </ListItem>{" "}
          <ListItem button component={NavLink} to="/dashboard/generate">
            <ListItemIcon>
              <Autorenew style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Generate a new password" />
          </ListItem>{" "}
          <ListItem button component={NavLink} to="/dashboard/settings">
            <ListItemIcon>
              <Settings style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Settings and account" />
          </ListItem>
        </List>
      </Drawer>
      {/* Body of the page*/}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Route exact path="/dashboard/vault" component={vault} />
            <Route exact path="/dashboard/addpassword" component={passwordForm} />
            <Route exact path="/dashboard/generate" component={passwordGenerator} />
            <Route exact path="/dashboard/settings" component={settings} />
          </Grid>
        </Container>
      </main>
    </div>
  );
}
