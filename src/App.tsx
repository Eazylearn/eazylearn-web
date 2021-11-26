import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import HomeScreen from "./screens/HomeScreen";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFF",
      contrastText: "#3A3A3A",
    },
    secondary: {
      main: "#3185FC",
      dark: "#034FB9",
      contrastText: "#FFF",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HomeScreen />
      </div>
    </ThemeProvider>
  );
}

export default App;
