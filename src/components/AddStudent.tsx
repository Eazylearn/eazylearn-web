import { InputAdornment, makeStyles, TextField, Typography, Button, Modal, Backdrop, Slide, CircularProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { CheckStudent } from '../screens/course-config/StudentList';
import { assignStudents, getAllStudents } from '../utils/api';
import { CourseStudent } from '../utils/types';
import StudentItem from './list-item/student';
import { addAlert } from '../reducers/alert';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 960,
    height: 630,
    maxHeight: "90vh",
    maxWidth: "90vw",
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "27px 40px 40px 40px",
    background: theme.palette.background.paper,
  },
  header: {
    width: "100%",
    textAlign: "left",
    fontWeight: "bold",
  },
	toolContainer: {
		position: "relative",
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
	},
  buttons: {
    display: "inline-flex",
    alignItems: "center",
    columnGap: 10,

    "& button": {
      boxShadow: "0px 3px 3px rgba(49, 133, 252, 0.24)",
      borderRadius: 10,
      fontWeight: "bold",
      textTransform: "none",
    },
  },
	listContainer: {
		width: "100%",
	},
}));

interface ConnectedAddStudentProps {
  open: boolean,
  handleClose: () => void,
  exclude: string[],
  courseID: string,
  reload: () => void,
}

interface AddStudentStateProps {

}

interface AddStudentDispatchProps {
  addAlert: (type: "success" | "error", message: string) => void,
}

interface AddStudentProps extends ConnectedAddStudentProps, AddStudentStateProps, AddStudentDispatchProps {}

const AddStudent: React.FC<AddStudentProps> = ({
  open,
  handleClose,
  exclude = [],
  courseID,
  reload,
  addAlert,
}) => {
  const styles = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<CourseStudent[]>([]);
  const [shownList, setShownList] = useState<CheckStudent[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<number>(0);
  const [, setSeed] = useState<number>(0);

  const forceUpdate = () => setSeed(Math.random());

  useEffect(() => {
    const _getStudents = async () => {
      setLoading(true);

      const res = await getAllStudents();
      if (res.status === "OK") {
        setStudentList(res.students
          .filter(s => exclude.indexOf(s.student_id) === -1)
          .map(s => ({ ...s, status: 0 }))
        );
        setShownList(res.students
          .filter(s => exclude.indexOf(s.student_id) === -1)
          .map(s => ({ ...s, checked: false, status: 0 }))
        );
      }
      else {
        addAlert("error", "Error occured while getting student list.");
      }

      setLoading(false);
    }

    _getStudents();
  }, [exclude, addAlert])

	const searchHandler = (text: string) => (student: CourseStudent): boolean => {
		return student.student_name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
	}

  const handleSearch: ChangeEventHandler = (event: ChangeEvent) => {
		const searchText = (event.target as HTMLInputElement).value;
    if (searchTimeout)
      clearTimeout(searchTimeout);
    setSearchTimeout(window.setTimeout(() => {
      setShownList(studentList
        .filter(searchHandler(searchText))
        .map(s => ({ ...s, checked: false }))
      );
    }, 500));
  }

  const handleAdd = async () => {
    const payload = shownList.filter(s => s.checked).map(s => ({
      studentID: s.student_id,
      courseID,
    }))
    const res = await assignStudents({ body: payload });
    if (res.status === "OK") {
      reload();
      handleClose();
      addAlert("success", "Add students to course successfully!");
    }
    else {
      addAlert("error", "Error occured while adding students to course.");
    }
  }

  const handleCheckStudent = (id: string): ChangeEventHandler => (event: ChangeEvent): void => {
    const pos = shownList.findIndex(s => s.student_id === id);
    // takes the 2nd click to check, fix TODO
    shownList[pos].checked = (event.target as HTMLInputElement).checked;
    forceUpdate();
  }

  return (
    <Modal
      BackdropComponent={Backdrop}
      open={open}
      className={styles.modal}
    >
      <Slide
        direction="up"
        in={open}
      >
        <section className={styles.container}>
          <Typography className={styles.header} variant="h4" color="initial">
            Add students manually from database
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
            <div className={styles.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAdd}
              >
                Add to course
              </Button>
            </div>
          </div>
          <div className={styles.listContainer}>
            {
              loading 
              ? (<CircularProgress color="secondary" />)
              : shownList
                .map((student, ind: number) => (
                <StudentItem
                  key={ind}
                  name={student.student_name}
                  id={student.student_id}
                  checked={student.checked}
                  onChange={handleCheckStudent(student.student_id)}
                  showOptions={false}
                />
              ))
            }
          </div>
        </section>
      </Slide>
    </Modal>
  )
}

const ConnectedAddStudent: React.FC<ConnectedAddStudentProps> = connect(null, { addAlert })(AddStudent);

export default ConnectedAddStudent;