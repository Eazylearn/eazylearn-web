import { createBrowserHistory, History, LocationState } from 'history';

const history: History<LocationState> = createBrowserHistory<LocationState>();

export default history;