import { Backdrop, Button, ClickAwayListener, makeStyles, Modal, Slide, Typography } from '@material-ui/core';
import React, { MouseEventHandler, useState } from 'react';

const useSettingsPanelStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    background: theme.palette.background.paper,
    width: 400,
    height: 220,
    padding: 30,
    borderRadius: 20,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 15,
    "& button": {
      width: 300,
      fontWeight: "bold",
    }
  },
  delete: {
    color: "red",
  }
}))

interface SettingsPanelProps {
  open: boolean,
  handleClose: () => void,
  id: string
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  open,
  handleClose,
  id,
}) => {
  const styles = useSettingsPanelStyles();

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleCloseDelete: MouseEventHandler = () => {
    setOpenDelete(false);
  }

  return (
    <Modal
      className={styles.modal}
      open={open}
      BackdropComponent={Backdrop}
    >
      <Slide 
        in={open}
        direction="down"
      >
      <div className={styles.container}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.content}>
            <DeletePanel
              open={openDelete}
              handleClose={handleCloseDelete}
              id={id}
            />
            <Typography variant="h5" color="initial">
              More settings
            </Typography>
            <div className={styles.actions}>
              <Button
                className={styles.delete}
                variant="contained"
                color="primary"
                onClick={() => setOpenDelete(true)}
              >
                Delete course permanently
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Close settings  
              </Button>
            </div>
          </div>
          </ClickAwayListener>
        </div>
      </Slide>
    </Modal>
  )
}

const useDeletePanelStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    background: theme.palette.background.paper,
    width: 630,
    height: 170,
    padding: 15,
    borderRadius: 20,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
    "& button": {
      fontWeight: "bold",
    }
  },
  delete: {
    color: "red",
  }
}))

interface DeletePanelProps {
  open: boolean,
  handleClose: MouseEventHandler,
  id: string
}

const DeletePanel: React.FC<DeletePanelProps> = ({
  open,
  handleClose,
  id
}) => {
  const styles = useDeletePanelStyles();

  const handleDeleteCourse = async () => {
    // await deleteCourse(id);
    return;
  }

  return (
    <Modal
      open={open}
      BackdropComponent={Backdrop}
      className={styles.modal}
    >
      <Slide 
        in={open}
        direction="down"
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <Typography variant="h5" color="initial">
              Are you sure you want to delete this course permanently?
            </Typography>
            <div className={styles.actions}>
              <Button
                className={styles.delete}
                variant="contained"
                color="primary"
                onClick={handleDeleteCourse}
              >
                Yes, delete the course
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </Slide>
    </Modal>
  )
}

export default SettingsPanel;