import { combineReducers } from "redux";
import authReducer, { AuthProps } from "./auth";
import { connectRouter } from 'connected-react-router';

export type Action <D> = {
  type: string,
  data: D,
}

export interface RootStateProps {
  auth: AuthProps,
}

const createRootReducer = (history: any) => combineReducers({
  // Reducers here
  auth: authReducer,
  router: connectRouter(history),
});

export default createRootReducer;