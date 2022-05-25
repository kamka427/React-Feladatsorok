import {
  Button,
  Container,
  Divider,
  Link,
  Tab,
  Tabs,

} from "@mui/material";
import {Link as RouterLink } from "react-router-dom";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

export const NavBar = ({ isDark, setTheme }) => {

  const currentRoute = window.location.pathname;
  const [currentTab, setCurrentTab] = useState(currentRoute !== "/" ? currentRoute : false);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const resetTab = () => {
    setCurrentTab(false);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          variant="h6"
          value
          component={RouterLink}
          onClick={resetTab}
          to="/"
          color="inherit"
          underline="none"
        >
          React feladatsorok
        </Link>

        <Tabs value={currentTab} onChange={handleChange}>
          <Tab
            label="Feladatbank"
            value="/feladatbank"
            component={RouterLink}
            to="/feladatbank"
          />
          <Tab
            label="Bejelentkezés"
            value="/bejelentkezes"
            component={RouterLink}
            to="/bejelentkezes"
          />
          <Tab
            label="Regisztráció"
            value="/regisztracio"
            component={RouterLink}
            to="/regisztracio"
          />
          <Tab
            label="Kijelentkezés"
            value="/kijelentkezes"
            component={RouterLink}
            to="/kijelentkezes"
          />
        </Tabs>
        <Button value={isDark} selected={isDark} onClick={setTheme}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>
      </Container>
      <Divider />
    </>
  );
};
