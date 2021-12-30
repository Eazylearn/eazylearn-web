import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootStateProps } from '../../reducers';
import { AlertProps } from '../../reducers/alert';
import AlertItem from './AlertItem';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column-reverse",
    rowGap: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    maxHeight: "80vh",
    width: 320,
    padding: "20px 20px",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 10,
  },
}))

interface ConnectedAlertContainerProps {

}

interface AlertContainerStateProps {
  alert: AlertProps,
}

interface AlertContainerDispatchProps {

}

interface AlertContainerProps extends ConnectedAlertContainerProps, AlertContainerDispatchProps, AlertContainerStateProps {}

const AlertContainer: React.FC<AlertContainerProps> = ({
  alert
}) => {
  const styles = useStyles();
  
  return (
    <div className={styles.container}>
      {
        alert.map((a, ind) => (
          <AlertItem
            type={a.type}
            message={a.message}
            key={ind}
          />
        ))
      }
    </div>
  )
}

const ConnectedAlertContainer: React.FC<ConnectedAlertContainerProps> = connect((state: RootStateProps) => ({ alert: state.alert }), {})(AlertContainer);

export default ConnectedAlertContainer;