import { InputAdornment, makeStyles, TextField, Typography, Button, Modal, Backdrop, Slide } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 960,
    height: 630,
    maxHeight: "90vh",
    maxWidth: "90vw",
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "27px 40px 40px 40px",
    background: theme.palette.background.paper,
  },
  header: {
    width: "100%",
    textAlign: "left",
    fontWeight: "bold",
  },
	toolContainer: {
		position: "relative",
		display: "flex",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		margin: "30px 0px",
	},
	searchBar: {
		width: 400,
		"& > div": {
			height: 42,
		},
		"& fieldset": {
			borderRadius: 20,
			boxShadow: "0px 3px 3px rgba(49, 133, 252, 0.24)",
		},
		"& *": {
			fontWeight: "bold",
		}
	},
  buttons: {
    display: "inline-flex",
    alignItems: "center",
    columnGap: 10,

    "& button": {
      boxShadow: "0px 3px 3px rgba(49, 133, 252, 0.24)",
      borderRadius: 10,
      fontWeight: "bold",
      textTransform: "none",
    },
  },
	listContainer: {
		width: "100%",
	},
}));

interface AddStudentProps {
  open: boolean,
  handleClose: () => void,
}

const AddStudent: React.FC<AddStudentProps> = ({
  open,
  handleClose
}) => {
  const styles = useStyles();

  const handleSearch: ChangeEventHandler = (event: ChangeEvent) => {

  }

  const handleAdd: MouseEventHandler = () => {

  }

  return (
    <Modal
      BackdropComponent={Backdrop}
      open={open}
      className={styles.modal}
    >
      <Slide
        direction="up"
        in={open}
      >

        <section className={styles.container}>
          <Typography className={styles.header} variant="h4" color="initial">
            Add students manually from database
          </Typography>
          <div className={styles.toolContainer}>
            <TextField
              variant="outlined"
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
              placeholder="Search"
              className={styles.searchBar}
            />
            <div className={styles.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAdd}
              >
                Add to course
              </Button>
            </div>
          </div>
          <div className={styles.listContainer}>

          </div>
        </section>
      </Slide>
    </Modal>
  )
}

export default AddStudent;