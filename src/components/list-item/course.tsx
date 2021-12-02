import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography'



interface CourseItemProps {
  name: string,
  lecturers: Array<string>,
  numStudents: number,
}

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    padding: 36,
    boxShadow: "0px 6px 4px rgba(49, 133, 252, 0.24)",
    borderRadius: 15,
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

const CourseItem: React.FC<CourseItemProps> = ({
  name,
  lecturers,
  numStudents,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography style={{ fontWeight: "bold" }} variant="h4" color="initial">
          {name}
        </Typography>
        <div className={styles.divider} />
        <Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">
          {`Lecturers: ${lecturers.length === 0 ? "none" : lecturers.join(", ")}`}
        </Typography>
        <Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">
          Number of students: {numStudents}
        </Typography>
      </div>
    </div>
  )
}

export default CourseItem;