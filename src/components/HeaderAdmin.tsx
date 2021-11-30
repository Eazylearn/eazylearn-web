import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from "@material-ui/styles";
import React, { ChangeEvent, useState } from "react";

interface Props {
  currentTab: "course" | "lecturer" | "student";
  onChangeTab: any;
}

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
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
    flexGrow: 1,
    borderRadius: "50px 0 0 50px",
    alignSelf: "stretch",
  },
});

const HeaderAdmin = function (props: Props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const changeTab = function (e: ChangeEvent<{}>, val: any) {
    setTabValue(val);
    props.onChangeTab(val);
  };

  return (
    <AppBar>
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
          <Tab label="Lecturer" id="tab-lecturer" />
          <Tab label="Student" id="tab-student" />
        </Tabs>
        <Button
          className={classes.profileButton}
          variant="contained"
          color="primary"
          startIcon={<ArrowDropDownIcon style={{ fontSize: 33 }} />}
        >
          Admin name
        </Button>
      </Toolbar>
    </AppBar>
  );
};

HeaderAdmin.defaultProps = {
  current_tab: "course",
};

export default HeaderAdmin;
