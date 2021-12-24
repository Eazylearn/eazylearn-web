import { Button, makeStyles, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { useState } from 'react';
import EditCourseInfo from '../../components/EditCourseInfo';

const useCourseInfoStyle = makeStyles(theme => ({
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
  courseInfo: {
    width: "100%",
  },
  infoLine: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}))

interface CourseInfoProps {
  id: string,
  academicYear: string,
  semester: number,
  setYear: (value: string) => void,
  setSem: (value: number) => void,
}

const CourseInfo: React.FC<CourseInfoProps> = ({
  id,
  academicYear = "",
  semester = 0,
  setYear,
  setSem,
}) => {
  const styles = useCourseInfoStyle();

	const [editCourseInfo, setEditCourseInfo] = useState<boolean>(false);

  return (
    <section className={styles.container}>
      <EditCourseInfo
        id={id}
        open={editCourseInfo}
        handleClose={() => setEditCourseInfo(false)}
        academicYear={academicYear}
        semester={semester}
        setYear={setYear}
        setSem={setSem}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <Typography style={{ fontWeight: "bold", width: "100%" }} variant="h5" color="initial">
            Course information
          </Typography>
          <Button
            className={styles.addButton}
            onClick={() => setEditCourseInfo(true)}
          >
            <Edit />
          </Button>
        </div>
        <div className={styles.courseInfo}>
          <div className={styles.infoLine}>
            <Typography variant="body1" color="initial">
              Academic year
            </Typography>
            <Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">
              {`${academicYear} - ${parseInt(academicYear) + 1}`}
            </Typography>
          </div>
          <div className={styles.infoLine}>
            <Typography variant="body1" color="initial">
              Semester
            </Typography>
            <Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">
              {semester}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseInfo;