import { Action } from ".";

const defaultAuth = {
  token: "",
  username: "",
}

export interface AuthProps {
  token: string,
  username: string,
  type?: number,
}

export const AUTH_ACTION_TYPES = {
  save: "@@auth/SAVE",
  clear: "@@auth/CLEAR",
}

export interface AuthActionData {
  token: string,
  username: string,
  type: number,
}

export const saveAuth = (token?: string, username?: string, type?: number) => ({
  type: AUTH_ACTION_TYPES.save,
  data: {
    token: token || defaultAuth.token,
    username: username || defaultAuth.username,
    type: type,
  },
});

export const clearAuth = () => ({
  type: AUTH_ACTION_TYPES.clear,
  data: {},
})

const authReducer = (auth: AuthProps = defaultAuth, action: Action<AuthActionData>) => {

  console.log(action);

  switch (action.type) {
    case AUTH_ACTION_TYPES.save: {
      const { token, username, type } = action.data;
      auth.token = token;
      auth.username = username;
      auth.type = type;
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