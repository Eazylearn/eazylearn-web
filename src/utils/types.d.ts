export interface Course {
  course_id: string
  course_name: string,
  academic_year: string,
  semester: number,
  students: Array<CourseStudent>,
  lecturers: Array<CourseLecturer>,
}

export interface Student {
  account_id: string,
  student_id: string,
  student_name: string,
  class_id: string,
}

export interface CourseStudent extends Student {
  status: number,
}

export interface Lecturer {
  account_id: string,
  lecturer_id: string,
  lecturer_name: string,
}

export interface CourseLecturer extends Lecturer {
}