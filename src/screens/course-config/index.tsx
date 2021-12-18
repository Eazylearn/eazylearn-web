import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { makeStyles, TextField, Typography, Button, IconButton, CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import { getCourse, updateCourse } from '../../utils/api';
import { Edit, Settings } from '@material-ui/icons';
import { Course } from '../../utils/types';
import history from '../../utils/history';
import StudentList from './StudentList';
import LecturerList from './LecturerList';
import SettingsPanel from './SettingsPannel';

interface CourseConfigProps {

}

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
    gridTemplateColumns: "100px 30px 1fr",
    "& *": {
      fontSize: 30,
      fontWeight: "bold",
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
  studentList: {
    gridColumn: 1,
    gridRow: 2,
  },
  lecturerList: {
    gridColumn: "2 / span 2",
    gridRow: 2,
  }
}))

const CourseConfig: React.FC<CourseConfigProps> = () => {
  
  const styles = useStyles();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<string>(course?.course_name || "");
  const [courseID, setCourseID] = useState<string>(course?.course_id || "");
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const _getCourse = async (id: string) => {
      try {
        const res = await getCourse(id);
        if (res.status === "OK") {
          setCourse(res.course);
          setCourseName(res.course.course_name);
          setCourseID(res.course.course_id);
        }
        else {
          history.push("/");
        }
      }
      catch (err) {
        console.error(err);
        history.push("/");
      }
    }

    if (id)
      _getCourse(id);
  }, [id]);
  
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
      academicYear: course?.academic_year || "",
      semester: course?.semester || 1,
    }

    setSaving(true);
    await updateCourse(payload);
    
    setSaving(false);
    setEdit(false);
  }

  const handleDiscard = () => {
    setCourseName(course?.course_name || "");
    setCourseID(course?.course_id || "");
    setEdit(false);
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
        <TextField
          className={styles.input}
          color="secondary"
          value={courseID}
          placeholder="Input the course id"
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
          placeholder="Input the course name"
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
      <div className={styles.studentList}>
        <StudentList studentList={course.students} />
      </div>
      <div className={styles.lecturerList}>
        <LecturerList lecturerList={course.lecturers} />
      </div>
    </div>
  )
}

export default CourseConfig;