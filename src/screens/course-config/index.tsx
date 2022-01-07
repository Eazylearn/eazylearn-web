import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import { makeStyles, TextField, Typography, Button, IconButton, CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import { createCourse, getCourse, updateCourse } from '../../utils/api';
import { ArrowBack, Edit, Settings } from '@material-ui/icons';
import { Course } from '../../utils/types';
import history from '../../utils/history';
import StudentList from './StudentList';
import LecturerList from './LecturerList';
import SettingsPanel from './SettingsPannel';
import CourseInfo from './CourseInfo';
import { addAlert } from '../../reducers/alert';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  container: {
    padding: "40px 60px",
    display: "grid",
    gridTemplateColumns: "65% 1fr 100px",
    columnGap: 40,
    rowGap: 45,
  },
  name: {
    gridColumn: 1,
    gridRow: 1,
    height: 50,
    display: "grid",
    columnGap: 20,
    gridTemplateColumns: "50px 120px 30px 1fr",
    "& *": {
      fontSize: 30,
    }
  },
  input: {
    height: "100%",
    width: "100%",
  },
  separator: {
    textAlign: "center",
    paddingTop: 6,
  },
  editAction: {
    gridColumn: 2,
    gridRow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 10,
    "& button": {
      fontWeight: "bold",
      borderRadius: 10,
      textTransform: "none",
    }
  },
  courseAction: {
    gridColumn: 3,
    gridRow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    width: 100,
    height: 42,
    textTransform: "none",
    borderRadius: 15,
    fontWeight: "bold",
  },
  mainPanel: {
    gridColumn: 1,
    gridRow: 2,
  },
  sidePanel: {
    gridColumn: "2 / span 2",
    gridRow: 2,
  }
}))

interface ConnectedCourseConfigProps {

}

interface CourseConfigStateProps {

}

interface CourseConfigDispatchProps {
  addAlert: typeof addAlert,
}

interface CourseConfigProps extends ConnectedCourseConfigProps, CourseConfigStateProps, CourseConfigDispatchProps {

}

const CourseConfig: React.FC<CourseConfigProps> = ({
  addAlert,
}) => {
  
  const styles = useStyles();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<string>(course?.course_name || "");
  const [courseID, setCourseID] = useState<string>(course?.course_id || "");
  const [courseYear, setCourseYear] = useState<string>(course?.academic_year || "");
  const [courseSem, setCourseSem] = useState<number>(course?.semester || 0);
  const [saving, setSaving] = useState<boolean>(false);

  const _getCourse = useCallback(async (id: string) => {
    try {
      const res = await getCourse(id);
      if (res.status === "OK") {
        setCourse(res.course);
        setCourseName(res.course.course_name);
        setCourseID(res.course.course_id);
        setCourseYear(res.course.academic_year);
        setCourseSem(res.course.semester);
      }
      else {
        history.push("/");
        addAlert("error", "Course is missing or you are not allowed to access.");
      }
    }
    catch (err) {
      history.push("/");
      addAlert("error", "Error occurred.");
    }
  }, [addAlert]);

  useEffect(() => {
    if (id) {
      if (id !== "new")
        _getCourse(id);
      else
        setCourse({
          course_id: "",
          course_name: "",
          academic_year: "",
          semester: 0,
          students: [],
          lecturers: [],
        })
    }
  }, [id, _getCourse]);
  
  const handleChangeName: ChangeEventHandler = (event: ChangeEvent) => {
    setCourseName((event.target as HTMLInputElement).value);
  }
  
  const handleChangeID: ChangeEventHandler = (event: ChangeEvent) => {
    setCourseID((event.target as HTMLInputElement).value);
  }

  const handleCloseSettings = () => {
    setOpenSettings(false);
  }

  const handleSaveCourse = async () => {
    const payload = {
      id: courseID,
      name: courseName,
      academicYear: new Date().getFullYear().toString(),
      semester: 0,
    }

    setSaving(true);
    const res = id === "new" ? 
      await createCourse(payload) :
      await updateCourse(id, payload);
    setSaving(false);
    setEdit(false);

    if (res.status === "OK") {
      if (id === "new") {
        history.push(`/course/${courseID}`);
        addAlert("success", "Create course successfully!");
      }
      else {
        addAlert("success", "Update course successfully!");
      }
    }
    else {
      if (id === "new") {
        addAlert("error", "Error occurred while creating course.");
      }
      else {
        addAlert("error", "Error occurred while updating course.");
      }
    }
  }

  const handleDiscard = () => {
    setCourseName(course?.course_name || "");
    setCourseID(course?.course_id || "");
    setEdit(false);
  }

  const handleReload = () => {
    _getCourse(id);
  }

  if (course === null)
    return (<></>);

  return (
    <div className={styles.container}>
      <SettingsPanel
        open={openSettings}
        handleClose={handleCloseSettings}
        id={course.course_id}
      />
      <div className={styles.name}>
        <IconButton onClick={() => history.push('/')}>
          <ArrowBack fontSize='medium'/>
        </IconButton>
        <TextField
          className={styles.input}
          color="secondary"
          value={courseID}
          placeholder="ID"
          onChange={handleChangeID}
          disabled={!edit}
        />
        <Typography
          className={styles.separator}
          variant="h3"
          color="initial"
        >
          -
        </Typography>
        <TextField
          className={styles.input}
          color="secondary"
          value={courseName}
          placeholder="Course name"
          onChange={handleChangeName}
          disabled={!edit}
        />
      </div>
      <div className={styles.editAction}>
        {
          edit ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveCourse}
              >
                {
                  saving ? (
                    <CircularProgress style={{ fill: "white" }} size="2rem" />
                  ) : "Apply"
                }
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDiscard}
              >
                Discard
              </Button>
            </>
          ) : (
            <IconButton onClick={() => setEdit(true)}>
              <Edit />
            </IconButton>
          )
        }
      </div>
      <div className={styles.courseAction}>
        <IconButton onClick={() => setOpenSettings(true)}>
          <Settings />
        </IconButton>
      </div>
      <div className={styles.mainPanel}>
        <StudentList
          studentList={course.students}
          courseID={course.course_id}
          reload={handleReload}
        />
      </div>
      <div className={styles.sidePanel}>
        <LecturerList
          lecturerList={course.lecturers}
          courseID={course.course_id}
          reload={handleReload}
        />
        <CourseInfo
          id={id}
          academicYear={courseYear}
          semester={courseSem}
          setYear={setCourseYear}
          setSem={setCourseSem}
        />
      </div>
    </div>
  )
}

const ConnectedCourseConfig: React.FC<ConnectedCourseConfigProps> = connect(null, { addAlert })(CourseConfig);

export default ConnectedCourseConfig;