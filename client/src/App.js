import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { NavBar } from "./navigation/NavBar";
import { Login } from "./auth/Login";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { Register } from "./auth/Register";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const MainPage = () => {
  return (
    <>
      <h1>Main Page</h1>
    </>
  );
};
function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleThemeHandler = () => {
    setIsDark(!isDark);
  };
  const theme = isDark ? darkTheme : lightTheme;
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <NavBar isDark={isDark} setTheme={toggleThemeHandler} />
          <Routes>
            <Route path="/regisztracio" element={<Register />}></Route>
            <Route path="/bejelentkezes" element={<Login />}></Route>
            <Route path="/" element={<MainPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
