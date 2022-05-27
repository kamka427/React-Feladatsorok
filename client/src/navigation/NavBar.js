import { Button, Container, Link, Stack, Tab, Tabs } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../state/authSlice";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const NavBar = ({ isDark, setTheme }) => {
  const user = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(
    ["/feladatbank", "/feladatsoraim", "/szerkesztett"].includes(window.location.pathname) ? window.location.pathname : false
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const resetTab = () => {
    setActiveTab(false);
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 2,
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
                  value="/szerkesztett"
                  component={RouterLink}
                  to="/szerkesztett"
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
                  sx={{
                    color: "primary.main",
                  }}
                  onClick={resetTab}
                >
                  Bejelentkezés
                </Button>

                <Button
                  label="Regisztráció"
                  component={RouterLink}
                  to="/regisztracio"
                  sx={{
                    color: "secondary.main",
                  }}
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
                sx={{
                  color: "error.main",
                }}
              >
                Kijelentkezés
              </Button>
            )}
            {user && (
              <Button component={RouterLink} to="/profil" color="inherit"
              onClick={
                resetTab
              }>
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
        </Box>
      </Container>
    </>
  );
};
