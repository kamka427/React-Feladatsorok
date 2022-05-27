import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../state/authSlice";
import { Link as RouterLink } from "react-router-dom";
import { useGetTasklistsQuery } from "../state/tasksApiSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Profile = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const { isLoading, data } = useGetTasklistsQuery();
  return (
    <Container maxWidth="xs">
      <Stack marginTop={3}>
          <Card variant="outlined">
            <Stack paddingY={3} gap={2} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: "secondary.main",
                }}
              >
                <AccountCircleIcon />
              </Avatar>
              <Typography variant="h5">Profil</Typography>
              <Stack >
                <Typography variant="h6">Név: {user.fullname}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    "Feladatsorok száma: " + data.total
                  )}
                </Typography>
              </Stack>
                <Button
                  label="Kijelentkezés"
                  component={RouterLink}
                  to="/"
                  onClick={() => {
                    dispatch(logout());
                  }}
                  color="error"
                  variant="outlined"
                >
                  Kijelentkezés
                </Button>
            </Stack>
          </Card>
        </Stack>
    </Container>
  );
};
