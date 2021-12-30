import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import authReducer, { AuthProps } from "./auth";
import alertReducer, { AlertProps } from "./alert";

export type Action <D> = {
  type: string,
  data: D,
}

export interface RootStateProps {
  auth: AuthProps,
  alert: AlertProps
}

const createRootReducer = (history: any) => combineReducers({
  // Reducers here
  auth: authReducer,
  alert: alertReducer,
  router: connectRouter(history),
});

export default createRootReducer;