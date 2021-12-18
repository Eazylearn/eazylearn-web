import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { makeStyles, TextField, Typography, Button, InputAdornment } from '@material-ui/core';
import { useParams } from 'react-router';
import { getCourse } from '../../utils/api';
import { Add, KeyboardArrowDown, Search } from '@material-ui/icons';
import StudentItem from '../../components/list-item/student';
import LecturerItem from '../../components/list-item/lecturer';
import { Course, CourseLecturer, CourseStudent } from '../../utils/types';
import history from '../../utils/history';

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
  const [invalid, setInvalid] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seed, setSeed] = useState(0);

  // For the better cause ;)
  const forceUpdate = () => setSeed(Math.random());

  useEffect(() => {
    const _getCourse = async (id: string) => {
      try {
        const res = await getCourse(id);
        if (res.status === "OK") {
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
    // TODO: returned data is missing
      _getCourse(id);
  }, [id]);

  const modifyCourse = (attr: "course_name"): ChangeEventHandler => (event: ChangeEvent): void => {
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
    setTimeout(() => history.push("/"), 1000);
    return (
      <>
      {/* TODO: needs a better way to inform */}
        <Typography style={{ fontWeight: "bold" }} variant="h5" color="secondary">
          Oops, course not found
        </Typography>
        <Typography variant="body1" color="initial">
          Redirecting you to homepage...
        </Typography>
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
          value={course.course_name}
          placeholder="Input the course name"
          onChange={modifyCourse("course_name")}
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
      <div className={styles.studentList}>
        <StudentList studentList={course.students} />
      </div>
      <div className={styles.lecturerList}>
        <LecturerList lecturerList={course.lecturers} />
      </div>
    </div>
  )
}

const useStudentListStyle = makeStyles(theme => ({
  container: {
    width: "100%",
    background: theme.palette.background.paper,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
  },
  toolContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "30px 0px",
  },
  searchBar: {
    width: 400,
    "& > div": {
      height: 42,
    },
    "& fieldset": {
      borderRadius: 20,
      boxShadow: "0px 3px 3px rgba(49, 133, 252, 0.24)",
    },
    "& *": {
      fontWeight: "bold",
    }
  },
  listContainer: {
    width: "100%",
  }
}))

interface StudentListProps {
  studentList: Array<CourseStudent>,
}

const StudentList: React.FC<StudentListProps> = ({
  studentList,
}) => {
  const styles = useStudentListStyle();
  const [list, setList] = useState(studentList);
  const [searchTimeout, setSearchTimeout] = useState<number>(0);

  const handleClickAction: MouseEventHandler = () => {
  
  }

  const handleCheckStudent = (id: string): ChangeEventHandler => (event: ChangeEvent): void => {
    // do sth
  }

  const searchHandler = (text: string) => (student: CourseStudent): boolean => {
    return student.student_name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  }

  const handleSearch: ChangeEventHandler = (event: ChangeEvent): void => {
    const searchText = (event.target as HTMLInputElement).value;
    if (searchTimeout)
      clearTimeout(searchTimeout);
    setSearchTimeout(window.setTimeout(() => setList(studentList.filter(searchHandler(searchText))), 500));
  }

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <Typography style={{ fontWeight: "bold", width: "100%" }} variant="h5" color="initial">
          Students
        </Typography>
        <div className={styles.toolContainer}>
          <TextField
            variant="outlined"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            placeholder="Search"
            className={styles.searchBar}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickAction}
            style={{ fontWeight: "bold", borderRadius: 10 }}
          >
            Action <KeyboardArrowDown />
          </Button>
        </div>
        <div className={styles.listContainer}>
          {
            list.map((student: CourseStudent, ind) => (
              <StudentItem 
                key={ind}
                name={student.student_name}
                status={student.status}
                checked={false}
                onChange={handleCheckStudent(student.student_id)}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

const useLecturerListStyle = makeStyles(theme => ({
  container: {
    width: "100%",
    background: theme.palette.background.paper,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  addButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    minWidth: 32,
  },
  listContainer: {
    width: "100%",
  },
}))

interface LecturerListProps {
  lecturerList: Array<CourseLecturer>,
}

const LecturerList: React.FC<LecturerListProps> = ({
  lecturerList
}) => {
  const styles = useLecturerListStyle();

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Typography style={{ fontWeight: "bold", width: "100%" }} variant="h5" color="initial">
            Lecturers
          </Typography>
          <Button
            className={styles.addButton}
            color="secondary"
            variant="contained">
            <Add />
          </Button>
        </div>
        <div className={styles.listContainer}>
          {
            lecturerList.map((lecturer, ind) => (
              <LecturerItem
                key={ind}
                name={lecturer.lecturer_name}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default CourseConfig;