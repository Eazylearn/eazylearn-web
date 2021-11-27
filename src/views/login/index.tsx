import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useState } from 'react';
import {
  makeStyles,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInputProps
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  loginContainer: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(116.83deg, #4A93FA -12.24%, #99F9FF 108.01%)",
    position: "relative",
  },
  content: {
    width: "100%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formContainer: {
    width: 400,
    height: 500,
    marginRight: 30,
    background: theme.palette.background.paper,
    borderRadius: 30,
    boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.15)",
  },
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
  const styles = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeUsername: ChangeEventHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  }

  const handleChangePassword: ChangeEventHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  const toggleShowPassword: MouseEventHandler = () => {
    setShowPassword(prevValue => !prevValue);
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <section className={styles.intro}>
          <Typography style={{ fontWeight: "bold" }} variant="h1" color="secondary">
            TESTING<br></br>
            MADE EASY
          </Typography>
          <span>
            <Typography style={{ fontWeight: "bold" }} variant="h2" component="span" color="secondary">WITH</Typography>
            <Typography style={{ marginLeft: 10, fontWeight: "bold" }} variant="h2" component="span" color="primary">EAZYLEARN</Typography>
          </span>
        </section>
        <section className={styles.formContainer}>
          <form className={styles.form}>
            <Typography style={{ fontWeight: "bold" }} variant="h4" color="primary">LOGIN</Typography>
            <Input
              title="Username"
              id="username"
              value={username}
              placeholder="Input your username here"
              onChange={(e: ChangeEvent) => handleChangeUsername(e)}
            />
            <Input
              title="Password"
              id="password"
              value={password}
              placeholder="Input your password here"
              onChange={(e: ChangeEvent) => handleChangePassword(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      { showPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </section>
      </div>
    </div>
  )
}

const useInputStyles = makeStyles(theme => ({
  formControl: {
    width: "80%",
    "& fieldset": {
      borderRadius: 20,
    }
  }
}))

interface InputProps {
  title: string,
  id: string,
  value: string,
  placeholder: string,
  onChange: ChangeEventHandler,
  InputProps?: OutlinedInputProps,
}

const Input: React.FC<InputProps> = ({
  title,
  id,
  value,
  placeholder,
  onChange,
  InputProps,
}) => {
  const styles = useInputStyles();

  return (
    <FormControl className={styles.formControl}>
      <TextField
        id={id}
        label={title}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type="text"
        variant="outlined"
        color="primary"
        InputProps={InputProps}
      />
    </FormControl>
  )
}

export default Login