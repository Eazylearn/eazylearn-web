import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';

import './App.css';
import store from './store';
import theme from './utils/theme';
import history from './utils/history';
import { saveAuth } from './reducers/auth';
import { getAccountInfo } from './utils/api';
// Import views
import HomeScreen from './screens/home-screen';
import Login from './screens/login';
import ForgotPassword from './screens/forgot-password';
import CourseConfig from './screens/course-config';
// import Test from './screens/test';
import AlertContainer from './components/alert';
import { getDataFromToken } from './utils/helpers';

function App() {

  useEffect(() => {
    const _getAccountInfo = async () => {
      const token: string | null = window.localStorage.getItem('access_token');
      if (token === null || token.split('.').length !== 3) {
        window.localStorage.removeItem('access_token');
        return store.dispatch(saveAuth());
      }

      const userInfo: any = getDataFromToken(token);
      if (!userInfo.hasOwnProperty('account_id') || !userInfo.hasOwnProperty('type')) {
        window.localStorage.removeItem('access_token');
        return store.dispatch(saveAuth());
      }

      const username: string = userInfo.account_id;
      const type: number = userInfo.type;
      const res = await getAccountInfo(username);
      if (res.status === "OK") {
        return store.dispatch(saveAuth(token, username, type));
      }
    }

    _getAccountInfo();
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/course/:id" component={CourseConfig} />
            {/* <Route path="/test" component={Test} /> */}
            <Route path="*">
              <Redirect to="/"/>
            </Route>
          </Switch>
          <AlertContainer />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
