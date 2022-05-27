import { Button, Container, Link, Stack, Tab, Tabs } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../state/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const NavBar = ({ isDark, setTheme }) => {
  const user = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(
    ["/feladatbank", "/feladatsoraim", "/szerkesztes"].includes(
      window.location.pathname
    )
      ? window.location.pathname
      : false
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const resetTab = () => {
    setActiveTab(false);
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={2}>
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
          <Tabs value={activeTab} onChange={handleTabChange}>
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
                value="/szerkesztes"
                component={RouterLink}
                to="/szerkesztes"
              />
            )}
          </Tabs>
        </Stack>
        <Stack direction="row">
          {!user && (
            <>
              <Button
                label="Bejelentkezés"
                component={RouterLink}
                to="/bejelentkezes"
                onClick={resetTab}
              >
                Bejelentkezés
              </Button>

              <Button
                label="Regisztráció"
                component={RouterLink}
                to="/regisztracio"
               color="secondary"
                onClick={resetTab}
              >
                Regisztráció
              </Button>
            </>
          )}
          {user && (
            <Button
              label="Kijelentkezés"
              component={RouterLink}
              to="/"
              onClick={() => {
                dispatch(logout());
                resetTab();
              }}
              color="error"
            >
              Kijelentkezés
            </Button>
          )}
          {user && (
            <Button
              component={RouterLink}
              to="/profil"
              color="inherit"
              onClick={resetTab}
            >
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
        </Stack>
      </Stack>
    </Container>
  );
};
