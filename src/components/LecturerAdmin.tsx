import { Button, CircularProgress, ClickAwayListener, Collapse, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { createLecturerAccount, getAllLecturers } from '../utils/api';
import { csvToLecturerList } from '../utils/helpers';
import { CourseLecturer } from '../utils/types';
import LecturerItem from './list-item/lecturer';
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

interface ConnectedLecturerAdminProps {
}

interface LecturerAdminStateProps {

}

interface LecturerAdminDispatchProps {
  addAlert: typeof addAlert,
}

interface LecturerAdminProps extends ConnectedLecturerAdminProps, LecturerAdminStateProps, LecturerAdminDispatchProps {}

const LecturerAdmin: React.FC<LecturerAdminProps> = ({
  addAlert,
}) => {
  const styles = useStyles();

  const [lecturerList, setLecturerList] = useState< Array<CourseLecturer> >([]);
  const [shownList, setShownList] = useState< Array<CourseLecturer> >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTimeout, setSearchTimeout] = useState<number>(0);
	const [openAction, setOpenAction] = useState<boolean>(false);

  const searchHandler = (text: string) => (value: CourseLecturer): boolean => {
    return value.lecturer_name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  }

  const handleSearch: ChangeEventHandler = (event: ChangeEvent) => {
    const searchText = (event.target as HTMLInputElement).value;
    if (searchTimeout)
      clearTimeout(searchTimeout);
    setSearchTimeout(window.setTimeout(() => setShownList(lecturerList.filter(searchHandler(searchText))), 500));
  }

  const _getLecturers = useCallback(async () => {
    setLoading(true);

    const res = await getAllLecturers();
    if (res.status === "OK") {
      setLecturerList(res.lecturers);
      setShownList(res.lecturers);
    }
    else {
      addAlert("error", "Error occurred while getting lecturer list.");
    }

    setLoading(false);
  }, [addAlert]);

  useEffect(() => {
    _getLecturers();
  }, [_getLecturers])

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
    const parsed = csvToLecturerList(text);
    if (typeof parsed === "string") {
      addAlert("error", parsed);
      return
    }

    console.log(parsed);
    
    const payload = parsed.map(lecturer => ({
      username: lecturer.lecturer_id,
      password: lecturer.password,
      name: lecturer.lecturer_name,
      type: 1, // lecturer
    }));

    const res = await createLecturerAccount({ body: payload });
    if (res.status === "OK" && res.badRequests.length === 0 && res.duplicates.length === 0) {
      addAlert("success", `Create ${res.successful.length} lecturer accounts successfully!`);
    }
    else {
      addAlert("error", `Only created ${res.successful.length} lecturer accounts, ${res.badRequests.length} have invalid data and ${res.duplicates.length} accounts already exist`, 5000);
    }
    setOpenAction(false);

    _getLecturers();
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
            ) : shownList.map((lecturer, ind) => (
              <LecturerItem
                key={ind}
                name={lecturer?.lecturer_name || ""}
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

const ConnectedLecturerAdmin: React.FC<ConnectedLecturerAdminProps> = connect(null, { addAlert })(LecturerAdmin);

export default ConnectedLecturerAdmin;