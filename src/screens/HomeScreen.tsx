import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import BackgroundGradient from "../components/BackgroundGradient";
import HeaderAdmin from "../components/HeaderAdmin";

const useStyles = makeStyles({
  body: {
    position: "relative",
    top: 40,
  },
});

interface RandomScreenProps {
  children?: React.ReactNode;
  value: any; // 0: Course    1: Lecturer     2: Student
  index: any;
}
function RandomScreen(props: RandomScreenProps) {
  return (
    <h2 hidden={props.index != props.value}>
      {props.value === props.index && <h2>{props.children}</h2>}
    </h2>
  );
}

const HomeScreen = () => {
  const classes = useStyles();
  //  0: Course    1: Lecturer     2: Student
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = function (value: number) {
    setTabValue(value);
  };

  return (
    <div>
      <BackgroundGradient />
      <HeaderAdmin currentTab="course" onChangeTab={handleChangeTab} />
      <div className={classes.body}>
        <RandomScreen value={tabValue} index={0}>
          Introduction to Database
        </RandomScreen>
        <RandomScreen value={tabValue} index={1}>
          Nhìn Man
        </RandomScreen>
        <RandomScreen value={tabValue} index={2}>
          Lê Gia Bảo
        </RandomScreen>
      </div>
    </div>
  );
};

export default HomeScreen;
