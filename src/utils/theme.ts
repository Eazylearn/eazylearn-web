import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3185FC",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#3185FC",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    }
  }
});

export default theme;