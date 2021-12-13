import { Checkbox, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEventHandler } from 'react';

interface StudentItemProps {
  name: string,
  status: string,
  checked: boolean,
  onChange: ChangeEventHandler,
  action?: any,
}

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: 60,
    boxShadow: "0px 3px 3px rgba(49, 133, 252, 0.24)",
    borderRadius: 20,
    display: "grid",
    gridTemplateColumns: "50px 1fr 50px",
    border: "2px solid",
    borderColor: "transparent",
    "&:hover": {
      borderColor: theme.palette.secondary.main,
    }
  },
  checkbox: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  content: {
    display: "inline-flex",
    alignItems: "center",
  },
  action: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
}))

const StudentItem: React.FC<StudentItemProps> = ({
  name,
  status,
  checked,
  onChange,
  action = null,
}) => {

  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div>
        <Checkbox
          className={styles.checkbox}
          color="secondary"
          onChange={onChange}
        />
      </div>
      <div className={styles.content}>
        <Typography style={{ fontWeight: "bold", width: 300, marginRight: 20 }} variant="body1" color="initial">
          {name}
        </Typography>
        <Typography style={{ fontWeight: "bold", color: status === "pending" ? "#F7CB15" : "#00E3AA" }} variant="body1">
          {status === "pending" ? "Pending" : "Approved"}
        </Typography>
      </div>
      <div>
        <IconButton
          className={styles.action}
          onClick={action}>
          <Delete />
        </IconButton>
      </div>
    </div>
  )
}

export default StudentItem;