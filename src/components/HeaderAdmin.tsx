import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  makeStyles,
  ClickAwayListener,
  Collapse
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootStateProps } from "../reducers";
import { addAlert } from "../reducers/alert";
import { AuthProps, clearAuth } from "../reducers/auth";
import history from "../utils/history";

const useStyles = makeStyles(theme => ({
  appBar: {
    background: theme.palette.background.paper,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    position: "relative",
  },
  title: {
      flexGrow: 1,
      position: 'relative',
      left: '1em',
  },
  tabs: {
    flexGrow: 20,
  },
  profileButton: {
    width: 150,
    height: "100%",
    borderRadius: "50px 0 0 50px",
    alignSelf: "stretch",
    fontWeight: "bold",
  },
  profileContainer: {
    height: "100%",
		position: "absolute",
		top: 0,
		right: 0,
		flexDirection: "column",
  },
  profileContent: {
    marginLeft: 30,
    width: 120,
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",

		"& button": {
			fontWeight: "bold",
			textTransform: "none",
		}
  }
}));

interface ConnectedHeaderAdminProps {
  currentTab: "course" | "lecturer" | "student";
  onChangeTab: any;
}

interface HeaderAdminStateProps {
  auth: AuthProps,
}

interface HeaderAdminDispatchProps {
  clearAuth: typeof clearAuth;
  addAlert: typeof addAlert;
}

interface HeaderAdminProps extends ConnectedHeaderAdminProps, HeaderAdminDispatchProps, HeaderAdminStateProps {}

const HeaderAdmin: React.FC<HeaderAdminProps> = function ({
  onChangeTab,
  currentTab,
  auth,
  clearAuth,
  addAlert,
}) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const changeTab = function (e: ChangeEvent<{}>, val: any) {
    setTabValue(val);
    onChangeTab(val);
  };

  const handleLogOut: MouseEventHandler = () => {
    clearAuth();
    window.localStorage.removeItem('access_token');
    history.go(0); // pls don't location.reload()
    addAlert("success", "Log out successfully!");
  }

  useEffect(() => console.log('auth', auth), [auth]);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h1">
          EAZYLEARN
        </Typography>
        <Tabs
          className={classes.tabs}
          value={tabValue}
          onChange={changeTab}
          aria-label="Admin Tabs"
          centered
        >
          <Tab label="Course" id="tab-course" />
          {
            (auth.type === 0 || auth.type === 1) && [
              (<Tab key={0} label="Lecturer" id="tab-lecturer" />),
              (<Tab key={1} label="Student" id="tab-student" />)
            ]
          }
        </Tabs>
        {
          auth.token !== "" ? (
            <ClickAwayListener onClickAway={() => setOpenProfile(false)}>
              <div className={classes.profileContainer}>
                <Button
                  className={classes.profileButton}
                  variant="contained"
                  color="secondary"
                  onClick={() => setOpenProfile(prevState => !prevState)}
                >
                  <ArrowDropDownIcon style={{ 
                    fontSize: 33,
                    transform: `rotate(${openProfile ? "180" : "0"}deg)`,
										transition: "transform .2s ease-in-out",
                  }} />
                  <p style={{ flexGrow: 1 }}>
                    { auth.username }
                  </p>
                </Button>
                <Collapse in={openProfile}>
                  <div className={classes.profileContent}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLogOut}
                    >
                      Log out
                    </Button>
                  </div>
                </Collapse>
              </div>
            </ClickAwayListener>
          ) : (
            <div className={classes.profileContainer}>
              <Button
                className={classes.profileButton}
                variant="contained"
                color="secondary"
                startIcon={<ArrowDropDownIcon style={{ fontSize: 33 }} />}
                onClick={() => history.push('/login')}
              >
                Login
              </Button>
            </div>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

const ConnectedHeaderAdmin: React.FC<ConnectedHeaderAdminProps> = connect((state: RootStateProps) => ({ auth: state.auth }), { clearAuth, addAlert })(HeaderAdmin);

export default ConnectedHeaderAdmin;
