import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { Button, Collapse, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core";
import { CourseStudent } from '../../utils/types';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import StudentItem from '../../components/list-item/student';
import AddStudent from '../../components/AddStudent';

const useStudentListStyle = makeStyles(theme => ({
	container: {
		width: "100%",
		background: theme.palette.background.paper,
		boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
		borderRadius: 20,
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: 40,
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
	listContainer: {
		width: "100%",
	},
	actionContainer: {
		zIndex: 1,
		position: "absolute",
		top: 42,
		right: 0,
	},
	actionContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",

		"& button": {
			fontWeight: "bold",
			textTransform: "none",
		}
	}
}))

interface StudentListProps {
	studentList: Array<CourseStudent>,
}

const StudentList: React.FC<StudentListProps> = ({
	studentList,
}) => {
	const styles = useStudentListStyle();
	const [list, setList] = useState(studentList);
	const [searchTimeout, setSearchTimeout] = useState<number>(0);
	const [openAction, setOpenAction] = useState<boolean>(false);
	const [openManualAdd, setOpenManualAdd] = useState<boolean>(false);

	const handleClickAction: MouseEventHandler = () => {
		setOpenAction(prevState => !prevState);
	}

	const handleCheckStudent = (id: string): ChangeEventHandler => (event: ChangeEvent): void => {
		// do sth
	}

	const searchHandler = (text: string) => (student: CourseStudent): boolean => {
		return student.student_name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
	}

	const handleSearch: ChangeEventHandler = (event: ChangeEvent): void => {
		const searchText = (event.target as HTMLInputElement).value;
		if (searchTimeout)
			clearTimeout(searchTimeout);
		setSearchTimeout(window.setTimeout(() => setList(studentList.filter(searchHandler(searchText))), 500));
	}

	return (
		<section className={styles.container}>
			<AddStudent
				open={openManualAdd}
				handleClose={() => setOpenManualAdd(false)}
			/>
			<div className={styles.content}>
				<Typography style={{ fontWeight: "bold", width: "100%" }} variant="h5" color="initial">
					Students
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
					<Button
						variant="contained"
						color="secondary"
						onClick={handleClickAction}
						style={{ fontWeight: "bold", borderRadius: 10 }}
					>
						Action
						<KeyboardArrowDown 
							style={{ 
								transform: `rotate(${openAction ? "180" : "0"}deg)`,
								transition: "transform .2s ease-in-out",
							}} 
						/>
					</Button>
					<div className={styles.actionContainer}>
						<Collapse in={openAction}>
							<div className={styles.actionContent}>
								<Button variant="contained" color="primary">
									Import via csv
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={() => setOpenManualAdd(true)}
								>
									Add manually
								</Button>
							</div>
						</Collapse>
					</div>
				</div>
				<div className={styles.listContainer}>
					{
						list.map((student: CourseStudent, ind) => (
							<StudentItem
								key={ind}
								name={student.student_name}
								status={student.status}
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

export default StudentList;