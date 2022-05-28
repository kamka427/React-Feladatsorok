import { Button, Container, Divider, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../state/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { selectTasklist } from "../state/tasklistSlice";

export const NavBar = ({ isDark, setTheme }) => {
  const user = useSelector(selectLoggedInUser);
  const tasklist = useSelector(selectTasklist);

  const dispatch = useDispatch();

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" paddingY={1}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Link
            variant="h6"
            component={RouterLink}
            to="/"
            color="inherit"
            underline="none"
            marginRight={1}
          >
            React feladatsorok
          </Link>
          <Button
            label="Feladatbank"
            value="/feladatbank"
            component={RouterLink}
            to="/feladatbank"
            color="inherit"
          >
            Feladatbank
          </Button>
          {user && (
            <Button
              label="Feladatsoraim"
              value="/feladatsoraim"
              component={RouterLink}
              to="/feladatsoraim"
              color="inherit"
            >
              Feladatsoraim
            </Button>
          )}
          {user && tasklist && (
            <Button
              label="Szerkesztett feladatsor"
              value="/szerkesztes"
              component={RouterLink}
              to="/szerkesztes"
              color="inherit"
            >
              Szerkesztett feladatsor
            </Button>
          )}
        </Stack>
        <Stack direction="row">
          {!user && (
            <>
              <Button
                label="Bejelentkezés"
                component={RouterLink}
                to="/bejelentkezes"
              >
                Bejelentkezés
              </Button>

              <Button
                label="Regisztráció"
                component={RouterLink}
                to="/regisztracio"
                color="secondary"
              >
                Regisztráció
              </Button>
            </>
          )}
          {user && (
            <>
              <Button
                label="Kijelentkezés"
                component={RouterLink}
                to="/"
                onClick={() => {
                  dispatch(logout());
                }}
                color="error"
              >
                Kijelentkezés
              </Button>

              <Button component={RouterLink} to="/profil" color="inherit">
                <AccountCircleIcon />
              </Button>
            </>
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
      <Divider />
    </Container>
  );
};
