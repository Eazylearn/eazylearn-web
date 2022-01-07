import
React,
{
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState
}
from 'react';
import {
  makeStyles,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Link,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { LoginPayload, login } from '../../utils/api';
import { connect } from 'react-redux';
import { AuthProps, saveAuth } from '../../reducers/auth';
import { addAlert } from '../../reducers/alert';
import { RootStateProps } from '../../reducers';
import history from '../../utils/history';
import Input from '../../components/Input';
import { getDataFromToken } from '../../utils/helpers';

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

interface ConnectedLoginProps {

}
interface LoginProps extends LoginStateProps, LoginDispatchProps, ConnectedLoginProps {};

interface LoginStateProps {
  auth: AuthProps,
}

interface LoginDispatchProps {
  saveAuth: typeof saveAuth,
  addAlert: typeof addAlert,
}

const Login: React.FC<LoginProps> = ({
  auth,
  saveAuth,
  addAlert,
}) => {
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
    const payload: LoginPayload = {
      username,
      password,
    }

    const res = await login(payload);
    if (res.status === "OK") {
      const userInfo = getDataFromToken(res.token);
      if (!userInfo.hasOwnProperty('type') || !(userInfo?.type === 0 || userInfo?.type === 1)) {
        addAlert("error", "This account is not authorized for this site.");
        return;
      }
      window.localStorage.setItem("access_token", res.token);
      saveAuth(res.token, username, userInfo.type);
      history.push("/");
      addAlert("success", "Log in successfully!");
    }
    else {
      addAlert("error", "Username or password is incorrect.");
    }
  }

  useEffect(() => {
    if (auth.token) {
      history.push("/");
      addAlert("error", "You have already logged in.");
    }
  }, [auth, addAlert]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <section className={styles.intro}>
          <Typography style={{ fontWeight: "bold", fontSize: 70 }} variant="h1" color="primary">
            TESTING<br></br>
            MADE EASY
          </Typography>
          <span>
            <Typography variant="h2" component="span" color="primary">
              WITH
            </Typography>
            <Typography style={{ marginLeft: 10, fontWeight: "bold" }} variant="h2" component="span" color="secondary">
              EAZYLEARN
            </Typography>
          </span>
        </section>
        <section className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Typography variant="h4" color="secondary">LOGIN</Typography>
            <div className={styles.formContent}>
              <Input
                title="Username"
                id="username"
                value={username}
                placeholder="Input your username here"
                onChange={(e: ChangeEvent) => handleChangeUsername(e)}
                formControlStyle={{ width: "80%" }}
              />
              <Input
                title="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Input your password here"
                onChange={(e: ChangeEvent) => handleChangePassword(e)}
                formControlStyle={{ width: "80%" }}
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

const ConnectedLogin: React.FC<ConnectedLoginProps> = connect((state: RootStateProps) => ({ auth: state.auth }), { saveAuth, addAlert })(Login);

export default ConnectedLogin;