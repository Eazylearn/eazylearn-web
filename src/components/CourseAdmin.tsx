import { KeyboardArrowDown, Search } from '@material-ui/icons';
import { InputAdornment, TextField, Button, makeStyles, CircularProgress } from '@material-ui/core';
import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { getAllCourses } from '../utils/api';
import { Course } from '../utils/types';
import CourseItem from './list-item/course';
import { Navigate } from 'react-router';

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
    "& *": {
      fontWeight: "bold",
    }
  },
  listContainer: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    rowGap: 25,
  }
}));

interface CourseAdminProps {

}

const CourseAdmin: React.FC<CourseAdminProps> = () => {
  const styles = useStyles();

  const [courseList, setCourseList] = useState< Array<Course> >([]);
  const [shownList, setShownList] = useState< Array<Course> >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTimeout, setSearchTimeout] = useState<number>(0);

  const searchHandler = (text: string) => (value: Course): boolean => {
    return value.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  }

  const handleSearch: ChangeEventHandler = (event: ChangeEvent) => {
    const searchText = (event.target as HTMLInputElement).value;
    if (searchTimeout)
      clearTimeout(searchTimeout);
    setSearchTimeout(window.setTimeout(() => setShownList(courseList.filter(searchHandler(searchText))), 500));
  }

  const handleClickAction: MouseEventHandler = () => {

  }

  useEffect(() => {
    const _getCourses = async () => {
      setLoading(true);
      const res = await getAllCourses();
      if (res.status === "OK") {
        setCourseList(res.courses);
        setShownList(res.courses);
      }
      else {
        // alert error message
      }

      setLoading(false);
    }

    _getCourses();
  }, [])

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
            ) : shownList.map((course, ind) => (
              <CourseItem
                name={course?.name || ""}
                lecturers={course?.lecturerList.map(l => l.name) || []}
                numStudents={course?.studentList.length || 0}
                onClick={() => window.location.href=`/course/${course.id}`}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default CourseAdmin;