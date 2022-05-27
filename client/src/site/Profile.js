import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
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
    <Container>
      <Stack marginTop={2} gap={2}>
        <Typography variant="h5">Profil</Typography>
        <Box
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card variant="outlined">
            <Box paddingY={3} paddingX={6}>
              <Stack gap={4} alignItems="center">
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <AccountCircleIcon />
                </Avatar>
                <Stack gap={2}>
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
                  <Button
                    label="Kijelentkezés"
                    component={RouterLink}
                    to="/"
                    onClick={() => {
                      dispatch(logout());
                    }}
                    sx={{
                      color: "error.main",
                    }}
                  >
                    Kijelentkezés
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
};
