import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  fade,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  Add,
  Autorenew,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Search,
  Settings,
} from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { NavLink, Route } from "react-router-dom";
import logo from "../Assets/Mimir Logo Light.png";
import PasswordGenerator from "../components/passwordGenerator";
import AddPassword from "./addPassword";
import ChangeSettings from "./changeSettings";
import Vault from "./vault";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    justifySelf: "center",
    alignSelf: "center",
    width: "35%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
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
    background: "#482880",
    backgroundColor: "#482880",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#482880",
    backgroundColor: "#482880",
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
    height: "100vh",
    width: "100vw",
    display: "auto",
    overflow: "auto",
    alignContent: "center",
  },
  container: {
    padding: theme.spacing(4),
  },
  background: {
    height: "100%",
    width: "100%",
  },
}));

export default function Dashboard() {
  let token = localStorage.getItem("access_token");
  if (token) {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("access_token");
      token = null;
    }
  }
  if (!token) {
    window.location.assign("/#/welcome/login");
  }

  const classes = useStyles();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState("");
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
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
        <Paper className={classes.background}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container}>
            <Grid container spacing={3} justify="center">
              <Route
                exact
                path="/dashboard/vault"
                component={() => <Vault searchQuery={searchQuery} />}
              />
              <Route exact path="/dashboard/addpassword" component={AddPassword} />
              <Route exact path="/dashboard/generate" component={PasswordGenerator} />
              <Route exact path="/dashboard/settings" component={ChangeSettings} />
            </Grid>
          </Container>
        </Paper>
      </main>
    </div>
  );
}
