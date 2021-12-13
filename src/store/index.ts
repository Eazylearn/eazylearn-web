import { applyMiddleware, compose, createStore } from "redux";
import createRootReducer from "../reducers";
import history from "../utils/history";
import { routerMiddleware } from 'connected-react-router';

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
    )
  )
);

export default store;