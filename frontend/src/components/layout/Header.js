import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import Container from "@material-ui/core/Container";

// Dialog import
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { videoSource } from "../../streamManager";
import { removeItemFromCart } from "../../actions/cartActions";

import {
  AddCircleOutlineOutlined,
  SubjectOutlined,
  ExitToApp,
  History,
  PersonAdd,
  GroupAdd,
  InfoOutlined,
  VpnKeyOutlined,
} from "@material-ui/icons";

//
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
import Loader from "../layout/Loader";

import CardExpressionrecord from "../sessioncour/CardExpressionrecord";
import Expressionrecord from "../sessioncour/Expressionrecord";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
    btn: {
      backgroundColor: "#FEE996",
      borderRadius: "30px",
      marginLeft: "15px",
    },
    titelapp: {
      color: "#FEE996",
    },
    loader: {
      marginTop: theme.spacing(20),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };
});

export default function Header({ children }) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems, useridCartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    videoSource
      .getSource()
      ?.getTracks()
      .forEach(function (track) {
        console.log(track);
        track.stop();
      });
    if (cartItems) {
      dispatch(removeItemFromCart("id", "useridCartItems"));
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const adminMenuItems = [
    {
      text: "Dashboard",
      icon: <PersonAdd color="secondary" />,
      path: "/dashboard",
    },
    // {
    //   text: 'My Sessions',
    //   icon: <SubjectOutlined color="secondary" />,
    //   path: '/'
    // },
    {
      text: "Groupe",
      icon: <GroupAdd color="secondary" />,
      path: "/groups",
    },
    {
      text: "Session",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/allsessions",
    },
  ];
  const teacherMenuItems = [
    // {
    //   text: 'My Sessions',
    //   icon: <SubjectOutlined color="secondary" />,
    //   path: '/'
    // },
    {
      text: "Groupe",
      icon: <GroupAdd color="secondary" />,
      path: "/groups",
    },
    {
      text: "Session",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/allsessions",
    },
  ];
  const studentMenuItems = [
    {
      text: "Available Sessions",
      icon: <SubjectOutlined color="secondary" />,
      path: "/availablesessionsstudent",
    },
    {
      text: "History Sessions",
      icon: <History color="secondary" />,
      path: "/historySessions",
    },
  ];
  const noUserMenuItems = [
    {
      text: "About us",
      icon: <InfoOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Login",
      icon: <VpnKeyOutlined color="secondary" />,
      path: "/login",
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <div className={classes.loader}>
          <Loader />
        </div>
      ) : (
        <Fragment>
          <div className={classes.root}>
            {/* app bar */}
            <AppBar
              position="fixed"
              className={classes.appBar}
              elevation={0}
              color="primary"
            >
              <Toolbar>
                <Typography className={classes.date}>
                  Today is the {format(new Date(), "do MMMM Y")}
                </Typography>
                {user ? (
                  <Fragment>
                    {cartItems.length > 0 && useridCartItems === user._id && (
                      <Fragment>
                        {/* <Container><Expressionrecord /></Container> */}

                        {/* <div style={{ display: "none" }}>
                          <Expressionrecord />
                        </div> */}

                        <Button
                          variant="contained"
                          className={classes.btn}
                          startIcon={<AddCircleOutlineOutlinedIcon />}
                          onClick={handleClickOpen}
                          style={{ marginRight: "30px" }}
                        >
                          ExpressionActive
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            Active Sessioncour
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              <Container>
                                {/* <Expressionrecord /> */}
                              </Container>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              className={classes.btn}
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              className={classes.btn}
                              onClick={handleClose}
                            >
                              StopRecord
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Fragment>
                    )}

                    <Typography>{user.email}</Typography>
                    <Link to="/me">
                      <Avatar
                        className={classes.avatar}
                        src={user.avatar && user.avatar.url}
                        alt={user && user.name}
                      />
                    </Link>
                    <Button
                      variant="contained"
                      className={classes.btn}
                      onClick={() => {
                        logoutHandler();
                        history.push("/");
                      }}
                    >
                      Logout
                    </Button>
                  </Fragment>
                ) : (
                  !loading && (
                    <Button
                      variant="contained"
                      className={classes.btn}
                      onClick={() => {
                        history.push("/login");
                      }}
                    >
                      Login
                    </Button>
                  )
                )}
              </Toolbar>
            </AppBar>

            {/* side drawer */}
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              anchor="left"
            >
              <div>
                <Typography variant="h5" className={classes.title}>
                  <Link
                    color="inherit"
                    to="/"
                    style={{ color: "#1E364E", textDecoration: "none" }}
                  >
                    Expression App
                  </Link>
                </Typography>
              </div>

              {/* links/list section */}
              <List>
                {user &&
                  user.role === "admin" &&
                  adminMenuItems.map((item) => (
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => history.push(item.path)}
                      className={
                        location.pathname == item.path ? classes.active : null
                      }
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                {user &&
                  user.role === "teacher" &&
                  teacherMenuItems.map((item) => (
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => history.push(item.path)}
                      className={
                        location.pathname == item.path ? classes.active : null
                      }
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                {user &&
                  user.role === "student" &&
                  studentMenuItems.map((item) => (
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => history.push(item.path)}
                      className={
                        location.pathname == item.path ? classes.active : null
                      }
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                {!user &&
                  noUserMenuItems.map((item) => (
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => history.push(item.path)}
                      className={
                        location.pathname == item.path ? classes.active : null
                      }
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
              </List>
            </Drawer>

            {/* main content */}
            <div className={classes.page}>
              <div className={classes.toolbar}></div>
              {children}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
