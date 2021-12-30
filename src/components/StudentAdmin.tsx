import { Button, CircularProgress, ClickAwayListener, Collapse, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { createStudentAccount, getAllStudents } from '../utils/api';
import { csvToStudentList } from '../utils/helpers';
import { Student } from '../utils/types';
import StudentItem from './list-item/student';
import { addAlert } from '../reducers/alert';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    background: theme.palette.background.paper,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: 30,
    alignItems: "center",
    padding: 40,
  },
  toolContainer: {
		position: "relative",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
	actionContainer: {
		position: "absolute",
		top: 0,
		right: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	actionContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",

		"& button": {
			fontWeight: "bold",
			textTransform: "none",
			"& span": {
				justifyContent: "flex-end",
			}
		}
	},
  listContainer: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    rowGap: 25,
  }
}))

interface ConnectedStudentAdminProps {
}

interface StudentAdminStateProps {

}

interface StudentAdminDispatchProps {
  addAlert: typeof addAlert,
}

interface StudentAdminProps extends ConnectedStudentAdminProps, StudentAdminStateProps, StudentAdminDispatchProps {}

const StudentAdmin: React.FC<StudentAdminProps> = ({
  addAlert,
}) => {
  const styles = useStyles();

  const [studentList, setStudentList] = useState<Student[]>([]);
  const [shownList, setShownList] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTimeout, setSearchTimeout] = useState<number>(0);
	const [openAction, setOpenAction] = useState<boolean>(false);

  const searchHandler = (text: string) => (value: Student): boolean => {
    return value.student_name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  }

  const handleSearch: ChangeEventHandler = (event: ChangeEvent) => {
    const searchText = (event.target as HTMLInputElement).value;
    if (searchTimeout)
      clearTimeout(searchTimeout);
    setSearchTimeout(window.setTimeout(() => setShownList(studentList.filter(searchHandler(searchText))), 500));
  }

  const _getStudents = useCallback(async () => {
    setLoading(true);

    const res = await getAllStudents();
    if (res.status === "OK") {
      setStudentList(res.students);
      setShownList(res.students);
    }
    else {
      addAlert("error", "Error occurred while getting student list.");
    }

    setLoading(false);
  }, [addAlert]);

  useEffect(() => {
    _getStudents();
  }, [_getStudents])

  const handleClickAction: MouseEventHandler = () => {
		setOpenAction(prevState => !prevState);
  }

  const handleUpload: FormEventHandler = async (event: FormEvent) => {
    const files = (event.target as HTMLInputElement).files;
    if (files === null || files.length === 0) {
      addAlert("error", "File not found.");
      return;
    }
    const text = await files[0].text();
    const parsed = csvToStudentList(text);
    if (typeof parsed === "string") {
      addAlert("error", parsed);
      return
    }
    
    const payload = parsed.map(student => ({
      username: student.student_id,
      password: student.password,
      classId: student.class_id,
      name: student.student_name,
      type: 2, // student
    }));

    const res = await createStudentAccount({ body: payload });
    if (res.status === "OK" && res.badRequests.length === 0 && res.duplicates.length === 0) {
      addAlert("success", `Create ${res.successful.length} student accounts successfully!`);
    }
    else {
      addAlert("error", `Only created ${res.successful.length} student accounts, ${res.badRequests.length} have invalid data and ${res.duplicates.length} accounts already exist`, 5000);
    }
    setOpenAction(false);

    _getStudents();
  }

  return (
    <section className={styles.container}>
      <div className={styles.content}>
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
					<ClickAwayListener onClickAway={() => setOpenAction(false)}>
						<div className={styles.actionContainer}>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleClickAction}
								style={{ 
									fontWeight: "bold", 
									borderRadius: 10, 
								}}
							>
								Action
								<KeyboardArrowDown 
									style={{ 
										transform: `rotate(${openAction ? "180" : "0"}deg)`,
										transition: "transform .2s ease-in-out",
									}} 
								/>
							</Button>
							<Collapse in={openAction}>
									<div className={styles.actionContent}>
										<Button
											variant="contained"
											color="primary"
                      component="label"
                      style={{ textTransform: "none" }}
										>
											Import via csv
                      <input
                        type="file"
                        onInput={handleUpload}
                        hidden
                      />
										</Button>
										{/* <Button
											variant="contained"
											color="primary"
											onClick={() => setOpenManualAdd(true)}
										>
											Add manually
										</Button> */}
									</div>
							</Collapse>
						</div>
					</ClickAwayListener>
        </div>
        <div className={styles.listContainer}>
          {
            loading ? (
              <CircularProgress color="secondary" />
            ) : shownList.map((student, ind) => (
              <StudentItem
                key={ind}
                name={student.student_name}
                id={student.student_id}
                showChecked={false}
                options={(
									<div className={styles.actionContent}>
										<Button
											variant="contained"
											color="primary"
										>
											More details
										</Button>
									</div>
								)}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

const ConnectedStudentAdmin: React.FC<ConnectedStudentAdminProps> = connect(null, { addAlert })(StudentAdmin);

export default ConnectedStudentAdmin;