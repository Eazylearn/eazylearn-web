import { Button, CircularProgress, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { getAllStudents } from '../utils/api';
import { Student } from '../utils/types';
import StudentItem from './list-item/student';


const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    background: theme.palette.background.paper,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: 30,
    alignItems: "center",
    padding: 40,
  },
  toolContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  listContainer: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    rowGap: 25,
  }
}))

interface StudentAdminProps {

}

const StudentAdmin: React.FC<StudentAdminProps> = () => {
  const styles = useStyles();

  const [studentList, setStudentList] = useState<Student[]>([]);
  const [shownList, setShownList] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTimeout, setSearchTimeout] = useState<number>(0);

  const searchHandler = (text: string) => (value: Student): boolean => {
    return value.student_name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  }

  const handleSearch: ChangeEventHandler = (event: ChangeEvent) => {
    const searchText = (event.target as HTMLInputElement).value;
    if (searchTimeout)
      clearTimeout(searchTimeout);
    setSearchTimeout(window.setTimeout(() => setShownList(studentList.filter(searchHandler(searchText))), 500));
  }

  useEffect(() => {
    const _getStudents = async () => {
      setLoading(true);

      const res = await getAllStudents();
      console.log('res', res);
      if (res.status === "OK") {
        setStudentList(res.students);
        setShownList(res.students);
      }
      else {
        // alert error message
      }

      setLoading(false);
    }

    _getStudents();
  }, [])

  const handleClickAction: MouseEventHandler = () => {

  }

  const handleCheckStudent = (id: string): ChangeEventHandler => (event: ChangeEvent): void => {
    // do sth
  }

  return (
    <section className={styles.container}>
      <div className={styles.content}>
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickAction}
            style={{ fontWeight: "bold", borderRadius: 10 }}
          >
            Action <KeyboardArrowDown />
          </Button>
        </div>
        <div className={styles.listContainer}>
          {
            loading ? (
              <CircularProgress color="secondary" />
            ) : shownList.map((student, ind) => (
              <StudentItem
                key={ind}
                name={student.student_name}
                id={student.student_id}
                status=""
                checked={false}
                onChange={handleCheckStudent(student.student_id)}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default StudentAdmin;