import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { makeStyles, TextField, Typography, Button } from '@material-ui/core';
import { Navigate, useParams } from 'react-router';
import { getCourse } from '../../utils/api';

interface CourseConfigProps {

}

const useStyles = makeStyles(theme => ({
  container: {
    padding: "40px 60px",
    display: "grid",
    gridTemplateColumns: "65% 1fr 226px",
    columnGap: 40,
    rowGap: 45,
  },
  name: {
    gridColumn: 1,
    gridRow: 1,
    height: 50,
  },
  input: {
    height: "100%",
    width: "100%",
    "& *": {
      fontSize: 30,
      fontWeight: "bold",
    }
  },
  courseAction: {
    gridColumn: 3,
    gridRow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 100,
    height: 42,
    textTransform: "none",
    borderRadius: 15,
    fontWeight: "bold",
  }
}))

export interface Course {
  id: string
  name: string,
  academicYear: string,
  semester: number,
  studentList: Array<Object>,
  lecturerList: Array<Object>,
}

const CourseConfig: React.FC<CourseConfigProps> = () => {
  
  const styles = useStyles();
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [seed, setSeed] = useState(0);

  const forceUpdate = () => setSeed(Math.random());

  useEffect(() => {
    const _getCourse = async (id: string) => {
      try {
        const res = await getCourse({ id });
        if (res.course) {
          setCourse(res.course);
        }
        else {
          setInvalid(true);
        }
      }
      catch (err) {
        console.error(err);
        setInvalid(true);
      }
    }

    if (id)
      _getCourse(id);
  }, [id]);

  const modifyCourse = (attr: "name"): ChangeEventHandler => (event: ChangeEvent): void => {
    if (course === null)
      return;

    // Too costly!!!
    // setCourse({
    //   ...course,
    //   [attr]: (event.target as HTMLInputElement).value || "",
    // });

    course[attr] = (event.target as HTMLInputElement).value || "";
    forceUpdate();
  }

  if (course === null)
    return (<></>);

  if (invalid) {
    return (
      <>
      {/* TODO: needs a better way to inform */}
        <Typography style={{ fontWeight: "bold" }} variant="h5" color="secondary">
          Oops, course not found
        </Typography>
        <Typography variant="body1" color="initial">
          Redirecting you to homepage...
        </Typography>
        <Navigate to="/" />
      </>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <TextField
          className={styles.input}
          color="secondary"
          id="course-name"
          name="course-name"
          value={course.name}
          placeholder="Input the course name"
          onChange={modifyCourse("name")}
        />
      </div>
      <div className={styles.courseAction}>
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
        >
          Discard
        </Button>
        <Button
          className={styles.button}
          style={{ boxShadow: "0px 3px 3px rgba(49, 133, 252, 0.24)" }}
          variant="contained"
          color="secondary"
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default CourseConfig;