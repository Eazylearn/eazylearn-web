import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';

import './App.css';
import store from './store';
import theme from './utils/theme';
import history from './utils/history';
// Import views
import HomeScreen from './screens/HomeScreen';
import Login from './screens/login';
import ForgotPassword from './screens/forgot-password';
import CourseConfig from './screens/course-config';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/course/:id" component={CourseConfig} />
            <Route path="*">
              <Redirect to="/"/>
            </Route>
          </Switch>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
