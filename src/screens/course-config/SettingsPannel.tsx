import { Backdrop, Button, CircularProgress, ClickAwayListener, makeStyles, Modal, Slide, Typography } from '@material-ui/core';
import React, { MouseEventHandler, useState } from 'react';
import { connect } from 'react-redux';
import { deleteCourse } from '../../utils/api';
import history from '../../utils/history';
import { addAlert } from '../../reducers/alert';

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
            <ConnectedDeletePanel
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
    width: 650,
    height: 150,
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

interface ConnectedDeletePanelProps {
  open: boolean,
  handleClose: MouseEventHandler,
  id: string
}

interface DeletePanelStateProps {

}

interface DeletePanelDispatchProps {
  addAlert: (type: "success" | "error", message: string) => void,
}

interface DeletePanelProps extends ConnectedDeletePanelProps, DeletePanelStateProps, DeletePanelDispatchProps {}

const DeletePanel: React.FC<DeletePanelProps> = ({
  open,
  handleClose,
  id,
  addAlert,
}) => {
  const styles = useDeletePanelStyles();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteCourse = async () => {
    setLoading(true);
    const res = await deleteCourse(id);
    setLoading(false);

    if (res.status === "OK") {
      addAlert("success", "Delete course successfully!");
      history.push('/');
    }
    else {
      addAlert("error", "Error occured while deleting course.");
    }
    
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
                {
                  loading ? (
                    <CircularProgress color="secondary" size="2rem" />
                  ) : "Yes, delete the course"
                }
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

const ConnectedDeletePanel: React.FC<ConnectedDeletePanelProps> = connect(null, { addAlert })(DeletePanel);

export default SettingsPanel;