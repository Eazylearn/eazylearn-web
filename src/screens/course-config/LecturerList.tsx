import { Button, makeStyles, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import AddLecturer from '../../components/AddLecturer';
import LecturerItem from '../../components/list-item/lecturer';
import { CourseLecturer } from '../../utils/types';

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

	const [openManualAdd, setOpenManualAdd] = useState<boolean>(false);

  return (
    <section className={styles.container}>
      <AddLecturer
        open={openManualAdd}
        handleClose={() => setOpenManualAdd(false)}
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
            // onClick={() => setOpenManualAdd(true)} TODO
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
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default LecturerList;