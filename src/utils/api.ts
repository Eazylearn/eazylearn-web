import axios from 'axios';
import { Course, CourseStudent } from './types';

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
  delete: async (url: string, params: any = {}) => {
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

export interface loginPayload {
  username: string,
  password: string
}

export const login = async (payload: loginPayload) => {
  return await request.post('/account/login', payload);
}

export interface getCourseResponse {
  status: string,
  course: Course,
}

export const getCourse = async (id: string): Promise<getCourseResponse> => {
  return await request.get('/course', { id });
};

interface getAllCoursesResponse {
  status: string,
  courses: Array<Course>,
  maxPage: number
}

/**
 * 
 * @param query query string
 * @param page current page number
 * @returns 
 */

export const getAllCourses = async (query: string = "", page: number = 0): Promise<getAllCoursesResponse> => {
  return await request.get('/course/search', { query, page });
}

export const getAllLecturers = async () => {
  const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  await wait(1000);
  return {
    status: "OK",
    lecturers: [
      {
        lecturer_id: "1",
        account_id: "1",
        lecturer_name: "Fujiwara Chika",
      },
      {
        lecturer_id: "1",
        account_id: "1",
        lecturer_name: "Hanekawa Tsubasa",
      },
      {
        lecturer_id: "1",
        account_id: "1",
        lecturer_name: "Sakurajima Mai",
      }
    ]
  }
}

interface getAllStudentsResponse {
  status: string,
  student: Array<CourseStudent>,
}

export const getAllStudents = async (): Promise<getAllStudentsResponse> => {
  const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  await wait(1000);
  return {
    status: "OK",
    student: [
      {
        student_id: "1",
        account_id: "1",
        class_id: "19CTT2",
        student_name: "Dảk",
        status: "approved",
      },
      {
        student_id: "2",
        account_id: "2",
        class_id: "19CTT2",
        student_name: "Bủh",
        status: "approved",
      },
      {
        student_id: "3",
        account_id: "3",
        class_id: "19CTT2",
        student_name: "Lmao",
        status: "approved",
      }
    ]
  }
}
interface DeleteCourseResponse {
  status: string,
  message: string,
}

export const deleteCourse = async (id: string): Promise<DeleteCourseResponse> => {
  return await request.delete('/course', { id });
}

interface UpdateCourseRequest {
  id: string,
  name: string,
  academicYear: string,
  semester: number,
}

interface UpdateCourseResponse {
  status: string,
  message: any,
}

export const updateCourse = async (id: string = "", payload: UpdateCourseRequest): Promise<UpdateCourseResponse> => {
  return await request.put(`/course?id=${id}`, payload);
}