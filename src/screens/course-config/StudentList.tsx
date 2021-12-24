import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Button, Checkbox, ClickAwayListener, Collapse, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core";
import { CourseStudent } from '../../utils/types';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import StudentItem from '../../components/list-item/student';
import AddStudent from '../../components/AddStudent';
import { approveStudents, removeStudents } from '../../utils/api';

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
	},
	listContainer: {
		width: "100%",
	},
	actionContainer: {
		zIndex: 1,
		position: "absolute",
		top: 0,
		right: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	actionContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",

		"& button": {
			fontWeight: "bold",
			textTransform: "none",
			"& span": {
				justifyContent: "flex-end",
			}
		}
	},
	checkActionContainer: {
		width: "100%",
		display: "inline-flex",
		justifyContent: "space-between",
		alignItems: "center",
		margin: "10px 0px",
	},
	checkBoxContainer: {
		paddingLeft: 6,
		display: "inline-flex",
		rowGap: 10,
		alignItems: "center"
	},
	checkActionButton: {
		textTransform: "none",
		fontWeight: "bold",
		borderRadius: 30,
	},
}))

export interface CheckStudent extends CourseStudent {
	checked: boolean,
}

interface StudentListProps {
	reload: () => void,
	studentList: Array<CourseStudent>,
	courseID: string
}

const StudentList: React.FC<StudentListProps> = ({
	reload,
	studentList,
	courseID,
}) => {
	const styles = useStudentListStyle();
	const [searchTimeout, setSearchTimeout] = useState<number>(0);
	const [openAction, setOpenAction] = useState<boolean>(false);
	const [openManualAdd, setOpenManualAdd] = useState<boolean>(false);
	const [pendingStudents, setPendingStudents] = useState<CheckStudent[]>([]);
	const [approvedStudents, setApprovedStudents] = useState<CheckStudent[]>([]);

	const [, setSeed] = useState<number>(0);

	const forceUpdate = () => setSeed(Math.random());

	const handleClickAction: MouseEventHandler = () => {
		setOpenAction(prevState => !prevState);
	}

	const handleCheckStudent = (id: string): ChangeEventHandler => (event: ChangeEvent): void => {
		const posPending = pendingStudents.findIndex(s => s.student_id === id);
		const posApproved = approvedStudents.findIndex(s => s.student_id === id);
		if (posPending !== -1) {
			pendingStudents[posPending].checked = (event.target as HTMLInputElement).checked;
		}
		else if (posApproved !== -1) {
			approvedStudents[posApproved].checked = (event.target as HTMLInputElement).checked;
		}

		// For the greater cause
		forceUpdate();
	}

	const handleCheckAll = (status: "approved" | "pending"): ChangeEventHandler => (event: ChangeEvent) => {
		if (status === "approved") {
			setApprovedStudents(prevState => prevState.map(s => ({ ...s, checked: (event.target as HTMLInputElement).checked })));
		}
		else {
			setPendingStudents(prevState => prevState.map(s => ({ ...s, checked: (event.target as HTMLInputElement).checked })));
		}
	}

	const searchHandler = (text: string) => (student: CourseStudent): boolean => {
		return student.student_name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
	}

	const handleApprove = async (students: CheckStudent[]) => {
		const payload = students.map(s => ({
			studentID: s.student_id,
			courseID,
		}));

		const res = await approveStudents({ body: payload });
		if (res.status === "OK") {
			reload()
		}
		else {
			// failed
		}
	}

	const handleRemove = async (student: CheckStudent) => {
		const payload = [{
			studentID: student.student_id,
			courseID,
		}]

		const res = await removeStudents({ body: payload });
		if (res.status === "OK") {
			reload()
		}
		else {
			//failed
		}
	}

	const handleSearch: ChangeEventHandler = (event: ChangeEvent): void => {
		const searchText = (event.target as HTMLInputElement).value;
		if (searchTimeout)
			clearTimeout(searchTimeout);
		setSearchTimeout(window.setTimeout(() => {
			const newList = studentList.filter(searchHandler(searchText));
			setPendingStudents(newList
				.filter(s => s.status === 0)
				.map(s => ({ ...s, checked: false }))
			);
			setApprovedStudents(newList
				.filter(s => s.status === 1)
				.map(s => ({ ...s, checked: false }))
			);
		}, 500));
	}

	useEffect(() => {
		setPendingStudents(studentList
			.filter(s => s.status === 0)
			.map(s => ({ ...s, checked: false }))
		);
		setApprovedStudents(studentList
			.filter(s => s.status === 1)
			.map(s => ({ ...s, checked: false }))
		);
	}, [studentList]);

	return (
		<section className={styles.container}>
			<AddStudent
				open={openManualAdd}
				handleClose={() => setOpenManualAdd(false)}
				exclude={studentList.map(s => s.student_id)}
				courseID={courseID}
				reload={reload}
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
					<ClickAwayListener onClickAway={() => setOpenAction(false)}>
						<div className={styles.actionContainer}>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleClickAction}
								style={{ 
									fontWeight: "bold", 
									borderRadius: 10, 
								}}
							>
								Action
								<KeyboardArrowDown 
									style={{ 
										transform: `rotate(${openAction ? "180" : "0"}deg)`,
										transition: "transform .2s ease-in-out",
									}} 
								/>
							</Button>
							<Collapse in={openAction}>
									<div className={styles.actionContent}>
										<Button
											variant="contained"
											color="primary"
											// onClick={} TODO
										>
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
					</ClickAwayListener>
				</div>
				<div className={styles.listContainer}>
					<Typography style={{ fontWeight: "bold" }} variant="h6" color="initial">
						Pending requests
					</Typography>
					<div className={styles.checkActionContainer}>
						<div className={styles.checkBoxContainer}>
							<Checkbox
								checked={
									pendingStudents.length > 0 && 
									pendingStudents.reduce((cur: boolean, s) => cur && s.checked, true)
								}
								color="secondary"
								onChange={handleCheckAll("pending")}
							/>
							<Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">
								Select all
							</Typography>
						</div>
						<Button
							className={styles.checkActionButton}
							variant="contained"
							color="primary"
							disabled={pendingStudents.length === 0}
							onClick={() => handleApprove(pendingStudents)}
						>
							Approve all
						</Button>
						<Button
							className={styles.checkActionButton}
							variant="contained"
							color="primary"
							disabled={pendingStudents.filter(s => s.checked).length === 0}
							onClick={() => handleApprove(pendingStudents.filter(s => s.checked))}
						>
							Approve selected
						</Button>
						<Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">
							Count: {pendingStudents.length}
						</Typography>
					</div>
					{
						pendingStudents.map((student: CheckStudent, ind) => (
							<StudentItem
								key={ind}
								name={student.student_name}
								status={student.status}
								checked={student.checked}
								onChange={handleCheckStudent(student.student_id)}
								options={(
									<div className={styles.actionContent}>
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleApprove([student])}
										>
											Approve
										</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleRemove(student)}
										>
											Remove from course
										</Button>
										<Button
											variant="contained"
											color="primary"
										>
											More details
										</Button>
									</div>
								)}
							/>
						))
					}
				</div>
				<div style={{ marginTop: 30 }} className={styles.listContainer}>
					<Typography style={{ fontWeight: "bold" }} variant="h6" color="initial">
						Enrolling students
					</Typography>
					<div className={styles.checkActionContainer}>
						<div className={styles.checkBoxContainer}>
							<Checkbox
								checked={
									approvedStudents.length > 0 && 
									approvedStudents.reduce((cur: boolean, s) => cur && s.checked, true)
								}
								color="secondary"
								onChange={handleCheckAll("approved")}
							/>
							<Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">
								Select all
							</Typography>
						</div>
						<Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">
							Count: {approvedStudents.length}
						</Typography>
					</div>
					{
						approvedStudents.map((student: CheckStudent, ind) => (
							<StudentItem
								key={ind}
								name={student.student_name}
								status={student.status}
								checked={student.checked}
								onChange={handleCheckStudent(student.student_id)}
								options={(
									<div className={styles.actionContent}>
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleRemove(student)}
										>
											Remove from course
										</Button>
										<Button
											variant="contained"
											color="primary"
										>
											More details
										</Button>
									</div>
								)}
							/>
						))
					}
				</div>
			</div>
		</section>
	)
}

export default StudentList;