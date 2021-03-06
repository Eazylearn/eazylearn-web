import { makeStyles } from '@material-ui/core';
import React, { MouseEventHandler } from 'react';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    padding: 36,
    boxShadow: "0px 6px 4px rgba(49, 133, 252, 0.24)",
    borderRadius: 15,
    boxSizing: "border-box",
    border: "2px solid",
    borderColor: "transparent",
    transition: "border-color .2s ease-in-out",
    "&:hover": {
      borderColor: theme.palette.secondary.main,
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 5,
    width: 800,
  },
  divider: {
    height: 0,
    width: "100%",
    border: "1px solid #3185FC",
    margin: "10px 0px",
  }
}))

interface CourseItemProps {
  id: string,
  name: string,
  lecturers: Array<string>,
  numStudents: number,
  numPending: number,
  onClick: MouseEventHandler,
  disabled?: boolean
}

const CourseItem: React.FC<CourseItemProps> = ({
  id,
  name,
  lecturers,
  numStudents,
  numPending,
  onClick,
  disabled = false,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container} onClick={disabled ? undefined : onClick}>
      <div className={styles.content}>
        <Typography style={{ fontWeight: "bold" }} variant="h4" color="initial">
          {id} - {name}
        </Typography>
        <div className={styles.divider} />
        <Typography variant="body1" color="initial">
          {`Lecturers: ${lecturers.length === 0 ? "none" : lecturers.join(", ")}`}
        </Typography>
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Typography variant="body1" color="initial">
            Number of students: {numStudents}
          </Typography>
          <Typography style={{ fontWeight: "bold" }} variant="body1" color={numPending > 0 ? "error" : "secondary"}>
            Wait for approval: {numPending}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default CourseItem;