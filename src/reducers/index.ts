import { combineReducers } from "redux";
import authReducer, { AuthProps } from "./auth";

export type Action <D> = {
  type: string,
  data?: Partial<D>
}

export interface RootStateProps {
  auth: AuthProps,
}

const createRootReducer = () => combineReducers({
  // Reducers here
  auth: authReducer,
});

export default createRootReducer;