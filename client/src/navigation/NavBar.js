import {
  Avatar,
  Button,
  Container,
  Divider,
  Link,
  Tab,
  Tabs,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../state/authSlice";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const NavBar = ({ isDark, setTheme }) => {
  const currentRoute = window.location.pathname;
  const [currentTab, setCurrentTab] = useState(
    currentRoute !== "/" ? currentRoute : false
  );
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

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
          py: 1,
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
        
        <Box
        sx={{
          display: "flex",
          gap: 2,
        }}>
      <Tabs value={currentTab} onChange={handleChange}>
        <Tab
          label="Feladatbank"
          value="/feladatbank"
          component={RouterLink}
          to="/feladatbank"
        />
        {user && (
          <Tab
            label="Feladatsoraim"
            value="/feladatsoraim"
            component={RouterLink}
            to="/feladatsoraim"
          />
        )}
        {user && (
          <Tab
            label="Szerkesztett feladatsor"
            value="/szerkesztett"
            component={RouterLink}
            to="/szerkesztett"
          />
        )}
      </Tabs>
          {!user && (
            <Button component={RouterLink} to="/bejelentkezes" >
              Bejelentkezés
            </Button>
          )}
          {!user && (
            <Button component={RouterLink} to="/regisztracio" color="secondary">
              Regisztráció
            </Button>
          )}
          {user && (
            <Button onClick={() => dispatch(logout())} color="error" >
              Kijelentkezés
            </Button>
          )}
          {user && (
            <Button component={RouterLink} to="/profil" color="primary">
              <AccountCircleIcon />
            </Button>
          )}
          <Button
            value={isDark}
            selected={isDark}
            onClick={setTheme}
            color="warning"
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </Button>
        </Box>
      </Container>
      <Divider />
    </>
  );
};
