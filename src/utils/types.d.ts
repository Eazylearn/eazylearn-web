export interface Course {
  id: string
  name: string,
  academicYear: string,
  semester: number,
  studentList: Array<CourseStudent>,
  lecturerList: Array<CourseLecturer>,
}

export interface CourseStudent {
  id: number
  name: string,
  status: string,
}

export interface CourseLecturer {
  id: number,
  name: string,
}