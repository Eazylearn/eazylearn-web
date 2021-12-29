import { makeStyles, Typography } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { alertDuration } from '../../utils/consts';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 300,
    animation: "$in 0.25s ease-in-out",
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px 10px",
    background: theme.palette.background.paper,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
  },
  close: {
    animation: "$out 0.25s ease-in-out",
    animationFillMode: "forwards",
  },
  "@keyframes in": {
    "0%": {
      transform: "translateX(-320px)",
    },
    "25%": {
      transform: "translateX(-182px)",
    },
    "50%": {
      transform: "translateX(-78px)",
    },
    "70%": {
      transform: "translateX(-8px)",
    },
    "80%": {
      transform: "translateX(20px)",
    },
    "90%": {
      transform: "translateX(10px)",
    },
    "100%": {
      transform: "translateX(0px)",
    },
  },
  "@keyframes out": {
    "0%": {
      transform: "translateX(0px)",
    },
    "25%": {
      transform: "translateX(10px)",
    },
    "50%": {
      transform: "translateX(20px)",
    },
    "70%": {
      transform: "translateX(-8px)",
    },
    "80%": {
      transform: "translateX(-78px)",
    },
    "90%": {
      transform: "translateX(-182px)",
    },
    "100%": {
      transform: "translateX(-320px)",
    },
  },
  content: {
    flexGrow: 1,
    wordWrap: "break-word",
    maxWidth: 228,
  },
  successIcon: {
    flexGrow: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    background: "#00E3AA",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorIcon: {
    flexGrow: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    background: "#E61212",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

interface AlertItemProps {
  type: "success" | "error",
  message: string,
}

const AlertItem: React.FC<AlertItemProps> = ({
  type,
  message,
}) => {
  const styles = useStyles();

  const [close, setClose] = useState<boolean>(false);

  useEffect(() => {
    window.setTimeout(() => setClose(true), alertDuration - 250)
  }, [])

  return (
    <div className={`${styles.container} ${close ? styles.close : ""}`}>
    {
      type === "success" ? (
        <div className={styles.successIcon}>
          <Check style={{ fill: "white" }} />
        </div>
      ) : (
        <div className={styles.errorIcon}>
          <Clear style={{ fill: "white" }} />
        </div>
      )
    }
      <Typography className={styles.content} variant="body1" color="initial">
        {message}
      </Typography>
    </div>
  )
}

export default AlertItem;