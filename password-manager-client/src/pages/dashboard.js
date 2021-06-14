import React, { Component } from "react";
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
  Paper,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { Menu, ChevronLeft, Home, Add, Autorenew, Settings } from "@material-ui/icons";
import logo from "../Assets/Mimir Logo Light.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  menuButton: {
    marginRight: 36,
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
      width: theme.spacing(9) + 1,
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
    <div>
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
          <div></div>
          <img className="logo" src={logo} alt="" width="900" height="1480"></img>
          <IconButton onclick={handleDrawerClose}>
            <ChevronLeft style={{ color: "white" }} />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Home style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Vault" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Add style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Add a password" />
          </ListItem>{" "}
          <ListItem button>
            <ListItemIcon>
              <Autorenew style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Generate a new password" />
          </ListItem>{" "}
          <ListItem button>
            <ListItemIcon>
              <Settings style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Settings and account" />
          </ListItem>
        </List>
      </Drawer>
      {/* Body of the page*/}
      <main>
        <Container maxWidth="lg">
          <Grid item xs={12} md={8} lg={9}>
            <Paper>
              <Typography>Test</Typography>
            </Paper>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
