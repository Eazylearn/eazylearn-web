import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import BackgroundGradient from "../components/BackgroundGradient";
import CourseAdmin from "../components/CourseAdmin";
import HeaderAdmin from "../components/HeaderAdmin";

const useStyles = makeStyles({
  body: {
    position: "relative",
    top: 40,
  },
});

interface RandomScreenProps {
  children: JSX.Element,
  value: any; // 0: Course    1: Lecturer     2: Student
  index: any;
}
const RandomScreen: React.FC<RandomScreenProps> = (props: RandomScreenProps) => {
  if (props.index === props.value) {
    return props.children;
  }
  else {
    return <></>
  }
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
          <div style={{ padding: "35px 75px" }}>
            <CourseAdmin />
          </div>
        </RandomScreen>
        <RandomScreen value={tabValue} index={1}>
          <h2>
            Nhìn Man
          </h2>
        </RandomScreen>
        <RandomScreen value={tabValue} index={2}>
          <h2>
            Lê Gia Bảo
          </h2>
        </RandomScreen>
      </div>
    </div>
  );
};

export default HomeScreen;
