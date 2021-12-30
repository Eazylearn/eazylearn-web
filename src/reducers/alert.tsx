import { Action } from '.'
import store from '../store';
import { alertDuration } from '../utils/consts';

export type AlertProps = Array<{
  type: "success" | "error",
  message: string,
  duration: number,
}>

const defaultAlert: AlertProps = [];

export const ALERT_ACTION_TYPES = {
  add: "@@alert/ADD",
  pop: "@@alert/POP",
}

export interface AlertActionData {
  type: "success" | "error",
  message: string,
  duration?: number,
}

export const addAlert = (type: "success" | "error", message: string, duration?: number) => ({
  type: ALERT_ACTION_TYPES.add,
  data: {
    type,
    message,
    duration,
  }
})

export const popAlert = () => ({
  type: ALERT_ACTION_TYPES.pop,
})

const alertReducer = (alert: AlertProps = defaultAlert, action: Action<AlertActionData>) => {
  switch (action.type) {
    case ALERT_ACTION_TYPES.add: {
      const { type, message, duration = alertDuration } = action.data;
      alert = [...alert, { type, message, duration }];
      window.setTimeout(() => store.dispatch(popAlert()), duration);
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