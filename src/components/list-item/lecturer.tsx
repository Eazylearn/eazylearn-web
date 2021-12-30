import { IconButton, Typography, makeStyles, Checkbox, ClickAwayListener, Collapse } from '@material-ui/core';
import { Delete, MoreVert } from '@material-ui/icons';
import React, { ChangeEvent, ChangeEventHandler, ReactNode, useState } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    width: "100%",
    height: 60,
    boxShadow: "0px 3px 3px rgba(49, 133, 252, 0.24)",
    borderRadius: 20,
    display: "grid",
    gridTemplateColumns: "50px 1fr 50px",
    border: "2px solid",
    borderColor: "transparent",
    transition: "border-color .2s ease-in-out",
    "&:hover": {
      borderColor: theme.palette.secondary.main,
    }
  },
  checkbox: {
    gridColumn: 1,
  },
  content: {
    gridColumn: 2,
    display: "inline-flex",
    alignItems: "center",
  },
  action: {
    zIndex: 1,
  },
	optionsContainer: {
		position: "absolute",
    top: 5,
		right: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
}))

interface LecturerItemProps {
  name: string,
  checked?: boolean,
  onChange?: ChangeEventHandler,
  showChecked?: boolean,
  options?: ReactNode,
  showOptions?: boolean,
}

const LecturerItem: React.FC<LecturerItemProps> = ({
  name,
  checked = false,
  onChange,
  showChecked = false,
  options = <></>,
  showOptions = true,
}) => {

  const styles = useStyles();

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {
        showChecked && (
          <Checkbox
            checked={checked}
            className={styles.checkbox}
            color="secondary"
            onChange={onChange}
          />
        )
      }
      <div className={styles.content}>
        <Typography style={{ color: "#3A3A3A", width: 200, marginRight: 20 }} variant="body1" color="initial">
          {name}
        </Typography>
      </div>
      {
        showOptions && (
          <ClickAwayListener onClickAway={() => setOpenOptions(false)}>
            <div style={{ zIndex: openOptions ? 2 : 1 }} className={styles.optionsContainer}>
              <IconButton
                className={styles.action}
                onClick={() => setOpenOptions(true)}>
                <MoreVert />
              </IconButton>
              <Collapse in={openOptions}>
                {options}
              </Collapse>
            </div>
          </ClickAwayListener>
        )
      }
    </div>
  )
}

export default LecturerItem;