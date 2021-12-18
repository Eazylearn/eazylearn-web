import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { makeStyles, TextField, Typography, Button, InputAdornment, IconButton, Modal, Slide, Backdrop, ClickAwayListener } from '@material-ui/core';
import { useParams } from 'react-router';
import { deleteCourse, getCourse } from '../../utils/api';
import { Add, KeyboardArrowDown, Search, Settings } from '@material-ui/icons';
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

  const handleOpenSettings = () => {
    setOpenSettings(true);
  }

  const handleCloseSettings = () => {
    setOpenSettings(false);
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
          id="course-name"
          name="course-name"
          value={course.course_name}
          placeholder="Input the course name"
          onChange={modifyCourse("course_name")}
        />
      </div>
      <div className={styles.courseAction}>
        <IconButton onClick={handleOpenSettings}>
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

const useSettingsPanelStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    background: theme.palette.background.paper,
    width: 400,
    height: 220,
    padding: 30,
    borderRadius: 20,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 15,
    "& button": {
      width: 300,
      fontWeight: "bold",
    }
  },
  delete: {
    color: "red",
  }
}))

interface SettingsPanelProps {
  open: boolean,
  handleClose: () => void,
  id: string
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  open,
  handleClose,
  id,
}) => {
  const styles = useSettingsPanelStyles();

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleOpenDelete: MouseEventHandler = () => {
    setOpenDelete(true);
  }

  const handleCloseDelete: MouseEventHandler = () => {
    setOpenDelete(false);
  }

  return (
    <Modal
      className={styles.modal}
      open={open}
      BackdropComponent={Backdrop}
    >
      <Slide 
        in={open}
        direction="down"
      >
      <div className={styles.container}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.content}>
            <DeletePanel
              open={openDelete}
              handleClose={handleCloseDelete}
              id={id}
            />
            <Typography variant="h4" color="initial">
              More settings
            </Typography>
            <div className={styles.actions}>
              <Button
                className={styles.delete}
                variant="contained"
                color="primary"
                onClick={handleOpenDelete}
              >
                Delete course permanently
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Close settings  
              </Button>
            </div>
          </div>
          </ClickAwayListener>
        </div>
      </Slide>
    </Modal>
  )
}

const useDeletePanelStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    background: theme.palette.background.paper,
    width: 610,
    height: 200,
    padding: 30,
    borderRadius: 20,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
    "& button": {
      fontWeight: "bold",
    }
  },
  delete: {
    color: "red",
  }
}))

interface DeletePanelProps {
  open: boolean,
  handleClose: MouseEventHandler,
  id: string
}

const DeletePanel: React.FC<DeletePanelProps> = ({
  open,
  handleClose,
  id
}) => {
  const styles = useDeletePanelStyles();

  const handleDeleteCourse = async () => {
    // await deleteCourse(id);
    return;
  }

  return (
    <Modal
      open={open}
      BackdropComponent={Backdrop}
      className={styles.modal}
    >
      <Slide 
        in={open}
        direction="down"
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <Typography variant="h4" color="initial">
              Are you sure you want to delete this course permanently?
            </Typography>
            <div className={styles.actions}>
              <Button
                className={styles.delete}
                variant="contained"
                color="primary"
                onClick={handleDeleteCourse}
              >
                Yes, delete the course
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </Slide>
    </Modal>
  )
}

export default CourseConfig;