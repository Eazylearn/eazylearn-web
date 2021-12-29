import { Action } from '.'
import store from '../store';
import { alertDuration } from '../utils/consts';

export type AlertProps = Array<{
  type: "success" | "error",
  message: string,
}>

const defaultAlert: AlertProps = [];

export const ALERT_ACTION_TYPES = {
  add: "@@alert/ADD",
  pop: "@@alert/POP",
}

export interface AlertActionData {
  type: "success" | "error",
  message: string,
}

export const addAlert = (type: "success" | "error", message: string) => ({
  type: ALERT_ACTION_TYPES.add,
  data: {
    type,
    message,
  }
})

export const popAlert = () => ({
  type: ALERT_ACTION_TYPES.pop,
})

const alertReducer = (alert: AlertProps = defaultAlert, action: Action<AlertActionData>) => {
  switch (action.type) {
    case ALERT_ACTION_TYPES.add: {
      const { type, message } = action.data;

      console.log('add', type, message);

      alert = [...alert, { type, message }];
      window.setTimeout(() => store.dispatch(popAlert()), alertDuration);
      return alert;
    }
    case ALERT_ACTION_TYPES.pop: {
      alert = [...alert.slice(1)];
      return alert;
    }
    default: {
      return defaultAlert;
    }
  }
}

export default alertReducer;