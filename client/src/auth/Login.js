import {
  Avatar,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const Login = () => {
  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">Bejelentkezés</Typography>
        <FormControl fullWidth>
          <TextField
            margin="normal"
            id="email"
            label="Email cím"
            type="email"
            variant="standard"
            required
            autoComplete="email"
            autoFocus
          ></TextField>
          <TextField
            margin="normal"
            id="password"
            label="Jelszó"
            type="password"
            variant="standard"
            required
            autoComplete="current-password"
          ></TextField>

          <Button type="submit" sx={{ mt: 3, mb: 2 }}>
            Bejelentkezés
          </Button>
        </FormControl>
      </Container>
    </>
  );
};
