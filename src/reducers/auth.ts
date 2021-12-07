import { Action } from ".";

const defaultAuth = {
  token: "",
}

export interface AuthProps {
  token: string,
}

export const AUTH_ACTION_TYPES = {
  save: "@@auth/SAVE",
  clear: "@@auth/CLEAR",
}

export interface AuthActiondData {
  token: string,
}

export const saveAuth = (token: string) => ({
  type: AUTH_ACTION_TYPES.save,
  data: {
    token,
  },
});

export const clearAuth = () => ({
  type: AUTH_ACTION_TYPES.clear,
})

const authReducer = (auth = defaultAuth, action: Action<AuthActiondData>) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.save: {
      const token = action.data?.token;
      if (token === undefined) {
        return defaultAuth;
      }
      auth.token = token;
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