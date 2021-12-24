import { Checkbox, IconButton, Typography, makeStyles, Collapse, ClickAwayListener } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { ChangeEventHandler, ReactNode, useState } from 'react';


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

interface StudentItemProps {
  name: string,
  id?: string,
  status?: number,
  checked: boolean,
  onChange: ChangeEventHandler,
  options?: ReactNode,
  showOptions?: boolean,
}

const StudentItem: React.FC<StudentItemProps> = ({
  name,
  id = "",
  status = -1,
  checked,
  onChange,
  options = <></>,
  showOptions = true,
}) => {

  const styles = useStyles();

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div>
        <Checkbox
          checked={checked}
          className={styles.checkbox}
          color="secondary"
          onChange={onChange}
        />
      </div>
      <div className={styles.content}>
        <Typography style={{ color: "#3A3A3A", width: 300, marginRight: 20 }} variant="body1" color="initial">
          {name}
        </Typography>
        {
          status >= 0 ? (
            <Typography style={{ color: status === 0 ? "#F7CB15" : "#00E3AA" }} variant="body1">
              {status === 0 ? "Pending" : "Approved"}
            </Typography>
          ) : (
            <Typography style={{ color: "#3A3A3A" }} variant="body1">
              {id}
            </Typography>
          )
        }
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

export default StudentItem;