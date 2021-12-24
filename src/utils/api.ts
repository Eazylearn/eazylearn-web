import axios from 'axios';
import { Course, Lecturer, Student } from './types';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  timeout: 2000,
});

instance.interceptors.response.use(
  (res) => res.data,
  (err) => err.response.data,
);

const request = {
  get: async (url: string, params: any = {}) => {
    try {
      const parsedParams = Object.keys(params)
        .map((k) => ({ k, v: params[k] }))
        .reduce(
          (cur, val, ind) =>
            cur + (ind === 0 ? "?" : "&") + val.k + "=" + val.v,
          ""
        );
      return await instance.get(url + parsedParams, {
        headers: {
          authorization: window.localStorage.getItem("access_token")
            ? `Bearer ${window.localStorage.getItem("access_token")}`
            : "",
        },
      });
    } catch (err: any) {
      console.error(err);
      return err.response ? err.response.data : err;
    }
  },
  post: async (url: string, data: any) => {
    try {
      return await instance.post(url, data, {
        headers: {
          authorization: window.localStorage.getItem("access_token")
            ? `Bearer ${window.localStorage.getItem("access_token")}`
            : "",
        },
      });
    } catch (err: any) {
      console.error(err);
      return err.response ? err.response.data : err;
    }
  },

  postForm: async (url: string, data: any) => {
    try {
      return await instance.post(url, data, {
        headers: {
          authorization: window.localStorage.getItem("access_token")
            ? `Bearer ${window.localStorage.getItem("access_token")}`
            : "",
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err: any) {
      console.error(err);
      return err.response ? err.response.data : err;
    }
  },
  put: async (url: string, data: any) => {
    try {
      return await instance.put(url, data, {
        headers: {
          authorization: window.localStorage.getItem("access_token")
            ? `Bearer ${window.localStorage.getItem("access_token")}`
            : "",
        },
      });
    } catch (err: any) {
      console.error(err);
      return err.response ? err.response.data : err;
    }
  },
  delete: async (url: string, params: any = {}, data: any = {}) => {
    try {
      const parsedParams = Object.keys(params)
        .map((k) => ({ k, v: params[k] }))
        .reduce(
          (cur, val, ind) =>
            cur + (ind === 0 ? "?" : "&") + val.k + "=" + val.v,
          ""
        );
      return await instance.delete(url + parsedParams, {
        headers: {
          authorization: window.localStorage.getItem("access_token")
            ? `Bearer ${window.localStorage.getItem("access_token")}`
            : "",
        },
        data,
      });
    } catch (err: any) {
      console.error(err);
      return err.response ? err.response.data : err;
    }
  },
};

/**
 * Export apis here
 * For example
 * export const getSth = async () => return await request.get("/sth");
 */

// ========AUTH=========

export interface loginPayload {
  username: string,
  password: string
}

export const login = async (payload: loginPayload) => {
  return await request.post('/account/login', payload);
}

// ========COURSE==========

export interface getCourseResponse {
  status: string,
  course: Course,
}

export const getCourse = async (id: string): Promise<getCourseResponse> => {
  const res = await request.get('/course', { id });
  return res;
};

interface getAllCoursesResponse {
  status: string,
  courses: Array<Course>,
  maxPage: number
}

export const getAllCourses = async (query: string = "", page: number = 0): Promise<getAllCoursesResponse> => {
  return await request.get('/course/search', { query, page });
}

interface DeleteCourseResponse {
  status: string,
  message: string,
}

export const deleteCourse = async (id: string): Promise<DeleteCourseResponse> => {
  return await request.delete('/course', { id });
}

interface UpdateCourseRequest {
  id?: string,
  name?: string,
  academicYear?: string,
  semester?: number,
}

interface UpdateCourseResponse {
  status: string,
  message: any,
}

export const updateCourse = async (id: string, payload: UpdateCourseRequest): Promise<UpdateCourseResponse> => {
  return await request.put(`/course?id=${id}`, payload);
}

interface CreateCourseRequest extends UpdateCourseRequest {}

interface CreateCourseResponse {
  status: string,
  message: Course,
}

export const createCourse = async (payload: CreateCourseRequest): Promise<CreateCourseResponse> => {
  const res = await request.post('/course', payload);
  res.message.lecturers = [];
  res.message.students = [];
  return (res as CreateCourseResponse);
}

interface RemoveStudentRequest {
  body: Array<{
    studentID: string,
    courseID: string,
  }>
}

interface RemoveStudentResponse {
  status: string,
  message: any,
}

export const removeStudents = async (payload: RemoveStudentRequest): Promise<RemoveStudentResponse> => {
  return await request.delete('/course/remove/student', {}, payload);
}

interface AssignStudentsRequest {
  body: Array<{
    studentID: string,
    courseID: string,
  }>
}

interface AssignStudentsResponse {
  status: string,
  message: any,
}

export const assignStudents = async (payload: AssignStudentsRequest): Promise<AssignStudentsResponse> => {
  return await request.post('/course/assign/student', payload);
}

// ========LECTURERS=========

interface GetAllLecturersResponse {
  status: string,
  lecturers: Lecturer[],
}

export const getAllLecturers = async (): Promise<GetAllLecturersResponse> => {
  return await request.get('/lecturer');
}

// ===========STUDENTS=========

interface GetAllStudentsResponse {
  status: string,
  students: Student[],
}

export const getAllStudents = async (): Promise<GetAllStudentsResponse> => {
  return await request.get('/student');
}

interface ApproveStudentsRequest {
  body: Array<{
    studentID: string,
    courseID: string,
  }>
}

interface ApproveStudentsResponse {
  status: string,
  message: any,
}

export const approveStudents = async (payload: ApproveStudentsRequest): Promise<ApproveStudentsResponse> => {
  return await request.put('/student/approve', payload);
}