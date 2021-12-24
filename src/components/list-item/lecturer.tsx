import { IconButton, Typography, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

interface LecturerItemProps {
  name: string,
  action?: any,
}

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: 60,
    boxShadow: "0px 3px 3px rgba(49, 133, 252, 0.24)",
    borderRadius: 20,
    display: "grid",
    gridTemplateColumns: "1fr 50px",
    border: "2px solid",
    borderColor: "transparent",
    transition: "border-color .2s ease-in-out",
    "&:hover": {
      borderColor: theme.palette.secondary.main,
    }
  },
  content: {
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: 40,
  },
  action: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
}))

const LecturerItem: React.FC<LecturerItemProps> = ({
  name,
  action = null,
}) => {

  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography style={{ color: "#3A3A3A", width: 200, marginRight: 20 }} variant="body1" color="initial">
          {name}
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

export default LecturerItem;