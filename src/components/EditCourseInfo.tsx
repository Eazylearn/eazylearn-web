import { makeStyles, Typography, Button, Modal, Backdrop, Slide, Select, MenuItem, CircularProgress } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { updateCourse } from '../utils/api';
import Input from './Input';

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 500,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
    alignItems: "center",
    padding: "30px 40px",
    background: theme.palette.background.paper,
  },
  header: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  buttons: {
    display: "inline-flex",
    columnGap: 10,
    alignItems: "center",
    "& button": {
      width: 100,
      borderRadius: 10,
      textTransform: "none",
    }
  },
  input: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  select: {
    width: 150,
    borderRadius: 20,
  }
}));

interface EditCourseInfoProps {
  open: boolean,
  id: string,
  handleClose: () => void,
  academicYear: string,
  semester: number,
  setYear: (value: string) => void,
  setSem: (value: number) => void,
}

const EditCourseInfo: React.FC<EditCourseInfoProps> = ({
  open,
  id,
  handleClose,
  academicYear,
  semester,
  setYear,
  setSem,
}) => {
  const styles = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [year, _setYear] = useState<string>(academicYear);
  const [sem, _setSem] = useState<number>(semester);

  useEffect(() => _setYear(academicYear), [academicYear]);
  useEffect(() => _setSem(semester), [semester]);

  const handleSetYear = (e: ChangeEvent) => {
    _setYear((e.target as HTMLInputElement).value);
  }

  const handleSetSem = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    _setSem(parseInt((e.target as HTMLInputElement).value));
  }

  const handleSave = async () => {
    const payload = {
      academicYear: year,
      semester: sem,
    };

    setLoading(true);

    const res = await updateCourse(id, payload);
    if (res.status === "OK") {
      setYear(year);
      setSem(sem);
    }

    setLoading(false);
    handleClose();
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
          <div className={styles.header}>
            <Typography style={{ fontWeight: "bold" }} variant="h6" color="initial">
              Edit course info
            </Typography>
            <div className={styles.buttons}>
              <Button
                variant="text"
                onClick={handleClose}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSave}
              >
                {
                  loading ? (
                    <CircularProgress style={{ fill: "white" }} size="2rem" />
                  ) : "Apply"
                }
              </Button>
            </div>
          </div>
          <div className={styles.input}>
            <Typography variant="body1" color="initial">
              Academic year
            </Typography>
            <Input
              style={{ width: 150 }}
              title="Academic year"
              id="academicYear"
              value={year}
              onChange={handleSetYear}
            />
          </div>
          <div className={styles.input}>
            <Typography variant="body1" color="initial">
              Semester
            </Typography>
            <Select
              className={styles.select}
              title="Semester"
              id="semester"
              value={sem}
              onChange={handleSetSem}
              variant="outlined"
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </div>
        </section>
      </Slide>
    </Modal>
  )
}

export default EditCourseInfo;