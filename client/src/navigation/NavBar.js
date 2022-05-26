import {
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
          }}
        >
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
            {!user && (
              <Tab
                label="Bejelentkezés"
                value="/bejelentkezes"
                component={RouterLink}
                to="/bejelentkezes"
                sx={{
                  color: "primary.main",
                }}
              />
            )}
            {!user && (
              <Tab
                label="Regisztráció"
                value="/regisztracio"
                component={RouterLink}
                to="/regisztracio"
                sx={{
                  color: "secondary.main",
                }}
              />
            )}
            {user && (
              <Tab
                label="Kijelentkezés"
                value="/kijelentkezes"
                component={RouterLink}
                to="/"
                onClick={() => dispatch(logout())}
                sx={{
                  color: "error.main",
                }}
              >
                Kijelentkezés
              </Tab>
            )}
          </Tabs>
          {user && (
            <Button component={RouterLink} to="/profil" color="inherit">
              <AccountCircleIcon />
            </Button>
          )}
          <Button
            value={isDark}
            selected={isDark}
            onClick={setTheme}
            color="inherit"
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </Button>
        </Box>
      </Container>
    </>
  );
};
