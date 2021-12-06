import axios from 'axios';
import { Course } from '../screens/course-config';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  timeout: 2000,
});

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

export interface getCoursePayload {
  id: string,
}

export interface getCourseResponse {
  course: Course,
}

export const getCourse = async (payload: getCoursePayload) => {
  // return await request.get('/course', payload);
  const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await wait(1000);
  return {
    course: {
      id: payload.id,
      name: "CS161 - Good ol' days",
      semester: 1,
      academicYear: "2019",
      studentList: [
        {
          id: 1,
          name: "Dảk",
          status: "approved",
        },
        {
          id: 2,
          name: "Bủh",
          status: "approved",
        },
        {
          id: 3,
          name: "Lmao",
          status: "pending",
        }
      ],
      lecturerList: [
        {
          id: 1,
          name: "Adudakwa",
        }
      ]
    }
  }
}