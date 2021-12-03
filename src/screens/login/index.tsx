import
React,
{
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useState
}
from 'react';
import {
  makeStyles,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInputProps,
  Button,
  Link,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { loginPayload, login } from '../../utils/api';

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
  formContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 55,
  },
  submit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 24,
  },
  button: {
    width: 250,
    height: 45,
    borderRadius: 20,
    textDecoration: "none",
    fontWeight: "bold",
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
    e.preventDefault();
    const payload: loginPayload = {
      username,
      password,
    }

    const res = await login(payload);
    console.log(res); //or do sth later
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <section className={styles.intro}>
          <Typography style={{ fontWeight: "bold", fontSize: 70 }} variant="h1" color="primary">
            TESTING<br></br>
            MADE EASY
          </Typography>
          <span>
            <Typography style={{ fontWeight: "bold" }} variant="h2" component="span" color="primary">WITH</Typography>
            <Typography style={{ marginLeft: 10, fontWeight: "bold" }} variant="h2" component="span" color="secondary">EAZYLEARN</Typography>
          </span>
        </section>
        <section className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Typography style={{ fontWeight: "bold" }} variant="h4" color="secondary">LOGIN</Typography>
            <div className={styles.formContent}>
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
                type={showPassword ? "text" : "password"}
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
            </div>
            <div className={styles.submit}>
              <Button
                className={styles.button}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Submit
              </Button>
              <Link href="/forgot-password" color="secondary">
                Forgot password?
              </Link>
            </div>
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
    },
    "& *": {
      fontWeight: "bold",
    }
  }
}))

interface InputProps {
  title: string,
  id: string,
  value: string,
  placeholder: string,
  onChange: ChangeEventHandler,
  type?: string,
  InputProps?: OutlinedInputProps,
}

const Input: React.FC<InputProps> = ({
  title,
  id,
  value,
  placeholder,
  onChange,
  type = "text",
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
        type={type}
        variant="outlined"
        color="secondary"
        InputProps={InputProps}
      />
    </FormControl>
  )
}

export default Login