import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { NavBar } from "./navigation/NavBar";
import { Login } from "./auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./auth/Register";
import { Home } from "./site/Home";
import { Tasks } from "./site/Tasks";
import { Tasklists } from "./site/Tasklists";
import { RequireAuth } from "./auth/RequireAuth";
import { Profile } from "./site/Profile";
import { Modify } from "./site/Modify";

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

function App() {
  const [isDark, setIsDark] = useState(true);
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
            <Route path="*" element={<Home />} />
            <Route path="/regisztracio" element={<Register />} />
            <Route path="/bejelentkezes" element={<Login />} />
            <Route path="/feladatbank" element={<Tasks />} />
            <Route
              path="/feladatsoraim"
              element={<RequireAuth component={<Tasklists />} />}
            />
            <Route
              path="/szerkesztes"
              element={<RequireAuth component={<Modify />} />}
            />

            <Route
              path="/profil"
              element={<RequireAuth component={<Profile />} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
