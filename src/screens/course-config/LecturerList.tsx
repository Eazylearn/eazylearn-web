import { Button, makeStyles, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import AddLecturer from '../../components/AddLecturer';
import LecturerItem from '../../components/list-item/lecturer';
import { removeLecturers } from '../../utils/api';
import { CourseLecturer } from '../../utils/types';
import { connect } from 'react-redux';
import { addAlert } from '../../reducers/alert';

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
}))

interface ConnectedLecturerListProps {
  reload: () => void,
  lecturerList: Array<CourseLecturer>,
  courseID: string,
}

interface LecturerListStateProps {

}

interface LecturerListDispatchProps {
  addAlert: typeof addAlert,
}

interface LecturerListProps extends ConnectedLecturerListProps, LecturerListStateProps, LecturerListDispatchProps {}

const LecturerList: React.FC<LecturerListProps> = ({
  reload,
  lecturerList,
  courseID,
  addAlert
}) => {
  const styles = useLecturerListStyle();

	const [openManualAdd, setOpenManualAdd] = useState<boolean>(false);

  const handleRemove = async (id: string) => {
		const payload = [{
			lecturerID: id,
			courseID,
		}]

		const res = await removeLecturers({ body: payload });
		if (res.status === "OK") {
			reload()
			addAlert("success", "Remove lecturers successfully!");
		}
		else {
			addAlert("error", "Error occurred while removing students.");
		}
  }

  return (
    <section className={styles.container}>
      <AddLecturer
        open={openManualAdd}
        handleClose={() => setOpenManualAdd(false)}
        exclude={lecturerList.map(l => l.lecturer_id)}
        courseID={courseID}
        reload={reload}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <Typography style={{ fontWeight: "bold", width: "100%" }} variant="h5" color="initial">
            Lecturers
          </Typography>
          <Button
            className={styles.addButton}
            color="secondary"
            variant="contained"
            onClick={() => setOpenManualAdd(true)}
          >
            <Add />
          </Button>
        </div>
        <div className={styles.listContainer}>
          {
            lecturerList.map((lecturer, ind) => (
              <LecturerItem
                key={ind}
                name={lecturer.lecturer_name}
                options={(
									<div className={styles.actionContent}>
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleRemove(lecturer.lecturer_id)}
										>
											Remove from course
										</Button>
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

const ConnectedLecturerList: React.FC<ConnectedLecturerListProps> = connect(null, { addAlert })(LecturerList);

export default ConnectedLecturerList;