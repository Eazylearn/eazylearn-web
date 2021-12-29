import { Action } from ".";

const defaultAuth = {
  token: "",
  username: "",
}

export interface AuthProps {
  token: string,
  username: string,
}

export const AUTH_ACTION_TYPES = {
  save: "@@auth/SAVE",
  clear: "@@auth/CLEAR",
}

export interface AuthActiondData {
  token: string,
  username: string,
}

export const saveAuth = (token: string, username: string) => ({
  type: AUTH_ACTION_TYPES.save,
  data: {
    token,
    username,
  },
});

export const clearAuth = () => ({
  type: AUTH_ACTION_TYPES.clear,
  data: {},
})

const authReducer = (auth = defaultAuth, action: Action<AuthActiondData>) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.save: {
      const { token, username } = action.data;
      auth.token = token;
      auth.username = username;
      return auth;
    }
    case AUTH_ACTION_TYPES.clear: {
      return defaultAuth;
    }
    default: {
      return defaultAuth;
    }
  }
}

export default authReducer;