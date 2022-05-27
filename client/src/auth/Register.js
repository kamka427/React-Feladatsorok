import {
  Alert,
  Avatar,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../state/tasksApiSlice";

export const Register = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [authRegister] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username, password } = data;
    const newErrors = {};

    if (name === "") {
      newErrors.name = "Name is required";
    }
    if (username === "") {
      newErrors.username = "Username is required";
    }
    if (password === "") {
      newErrors.password = "Password is required";
    }

    setErrors({ ...newErrors });

    if (Object.values(newErrors).length > 0) {
      return;
    }

    try {
      await authRegister({
        email: username,
        password: password,
        fullname: name,
      }).unwrap();
      navigate("/bejelentkezes", { replace: true });
    } catch (err) {
      newErrors.register = "Regisztrációs hiba";
      setErrors({ ...newErrors });
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Stack marginTop={3}>
        <Card variant="outlined">
          <Stack gap={2} alignItems="center" paddingTop={3}>
            <Avatar
              sx={{
                bgcolor: "secondary.main",
              }}
            >
              <VpnKeyIcon />
            </Avatar>
            <Typography variant="h5">Regisztráció</Typography>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack gap={3} paddingY={3} paddingX={3}>
              <TextField
                id="name"
                name="name"
                label="Teljes név"
                error={errors.name !== undefined}
                helperText={errors.name}
                value={data.name}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                id="email"
                name="username"
                label="Email cím"
                type="email"
                autoComplete="email"
                error={errors.username !== undefined}
                helperText={errors.username}
                value={data.username}
                onChange={handleChange}
              />
              <TextField
                id="password"
                name="password"
                label="Jelszó"
                type="password"
                autoComplete="current-password"
                error={errors.password !== undefined}
                helperText={errors.password}
                value={data.password}
                onChange={handleChange}
              />

              <Button type="submit" variant="outlined" fullWidth>
                Regisztráció
              </Button>

              {errors.register && (
                <Alert variant="outlined" severity="error">{errors.register}</Alert>
              )}
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
};
