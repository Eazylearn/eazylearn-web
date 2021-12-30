import { InputAdornment, makeStyles, TextField, Typography, Button, Modal, Backdrop, Slide, CircularProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { assignLecturers, getAllLecturers } from '../utils/api';
import { CourseLecturer } from '../utils/types';
import LecturerItem from './list-item/lecturer';
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
}));interface ConnectedAddLecturerProps {
  open: boolean,
  handleClose: () => void,
  exclude: string[],
  courseID: string,
  reload: () => void,
}

interface AddLecturerStateProps {

}

interface AddLecturerDispatchProps {
  addAlert: typeof addAlert,
}

interface AddLecturerProps extends ConnectedAddLecturerProps, AddLecturerStateProps, AddLecturerDispatchProps {}

interface CheckLecturer extends CourseLecturer {
  checked: boolean
}

const AddLecturer: React.FC<AddLecturerProps> = ({
  open,
  handleClose,
  exclude = [],
  courseID,
  reload,
  addAlert,
}) => {
  const styles = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [lecturerList, setLecturerList] = useState<CourseLecturer[]>([]);
  const [shownList, setShownList] = useState<CheckLecturer[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<number>(0);
  const [, setSeed] = useState<number>(0);

  const forceUpdate = () => setSeed(Math.random());

  useEffect(() => {
    const _getLecturers = async () => {
      setLoading(true);

      const res = await getAllLecturers();
      if (res.status === "OK") {
        setLecturerList(res.lecturers
          .filter(l => exclude.indexOf(l.lecturer_id) === -1)
          .map(l => ({ ...l, status: 0 }))
        );
        setShownList(res.lecturers
          .filter(l => exclude.indexOf(l.lecturer_id) === -1)
          .map(l => ({ ...l, checked: false, status: 0 }))
        );
      }
      else {
        addAlert("error", "Error occurred while getting lecturer list.");
      }

      setLoading(false);
    }

    _getLecturers();
  }, [exclude, addAlert])

  const searchHandler = (text: string) => (lecturer: CourseLecturer): boolean => {
    return lecturer.lecturer_name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  }

  const handleSearch: ChangeEventHandler = (event: ChangeEvent) => {
		const searchText = (event.target as HTMLInputElement).value;
    if (searchTimeout)
      clearTimeout(searchTimeout);
    setSearchTimeout(window.setTimeout(() => {
      setShownList(lecturerList
        .filter(searchHandler(searchText))
        .map(l => ({ ...l, checked: false }))
      );
    }, 500));
  }

  const handleAdd: MouseEventHandler = async () => {
    const payload = shownList.filter(s => s.checked).map(s => ({
      lecturerID: s.lecturer_id,
      courseID,
    }));

    const res = await assignLecturers({ body: payload });
    if (res.status === "OK") {
      reload()
      handleClose();
      addAlert("success", "Add lecturers to course successfully!");
    }
    else {
      addAlert("error", "Error occurred while adding lecturers to course.");
    }
  }

  const handleCheckLecturer = (id: string): ChangeEventHandler => (event: ChangeEvent): void => {
    const pos = shownList.findIndex(s => s.lecturer_id === id);
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
            Add lecturers manually from database
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
                .map((lecturer, ind: number) => (
                <LecturerItem
                  key={ind}
                  name={lecturer.lecturer_name}
                  checked={lecturer.checked}
                  onChange={handleCheckLecturer(lecturer.lecturer_id)}
                  showChecked
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

const ConnectedAddLecturer: React.FC<ConnectedAddLecturerProps> = connect(null, { addAlert })(AddLecturer);

export default ConnectedAddLecturer;