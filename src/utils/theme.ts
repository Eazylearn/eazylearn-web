import { createTheme } from "@material-ui/core/styles";

const white = "#FFFFFF";
const blue = "#3185FC";
const blueDark = "#034FB9";
const yellow = "#F7CB15";
const black = "#3A3A3A";
const grey = "#838181";

const theme = createTheme({
  palette: {
    primary: {
      main: white,
      contrastText: black,
    },
    secondary: {
      main: blue,
      dark: blueDark,
      contrastText: white,
    },
    background: {
      default: white,
      paper: white,
    }
  },
  typography: {
    fontFamily: 'Raleway',
    h1: {
      fontSize: "48px",
      fontWeight: 800,
      letterSpacing: "0.04em",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "0 0",
        color: blue,
      },
      colorPrimary: {
        backgroundColor: "transparent",
        color: blue,
      }
    },
    MuiTab: {
      root: {
        fontWeight: 'bold',
        fontSize: 24,
        letterSpacing: 1.5 * 0.01,
        textTransform: 'capitalize',
      },
      textColorInherit: {
        color: black,
        opacity: 1,
        '&.Mui-selected': {
          color: blue,
        },
      },
      
    },
  }
});

export default theme;