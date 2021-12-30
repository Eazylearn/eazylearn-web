import { IconButton, Typography, makeStyles, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, ChangeEventHandler } from 'react';

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
  checkbox: {

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

interface LecturerItemProps {
  name: string,
  checked?: boolean,
  action?: () => void,
  onChange?: ChangeEventHandler,
  showChecked?: boolean,
  showAction?: boolean,
}

const LecturerItem: React.FC<LecturerItemProps> = ({
  name,
  action = null,
  checked = false,
  onChange = null,
  showChecked = false,
  showAction = true,
}) => {

  const styles = useStyles();

  const handleAction = () => {
    if (action)
      action();

    return;
  }

  const handleChange: ChangeEventHandler = (event: ChangeEvent) => {
    if (onChange)
      onChange(event);

    return;
  }

  return (
    <div style={{ gridTemplateColumns: showChecked ? "50px 1fr 50px" : "1fr 50px" }} className={styles.container}>
      {
        showChecked && (
          <Checkbox
            checked={checked}
            className={styles.checkbox}
            color="secondary"
            onChange={handleChange}
          />
        )
      }
      <div className={styles.content}>
        <Typography style={{ color: "#3A3A3A", width: 200, marginRight: 20 }} variant="body1" color="initial">
          {name}
        </Typography>
      </div>
      {
        showAction && (
          <div>
            <IconButton
              className={styles.action}
              onClick={handleAction}
            >
              <Delete />
            </IconButton>
          </div>
        )
      }
    </div>
  )
}

export default LecturerItem;