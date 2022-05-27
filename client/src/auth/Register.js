import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
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
    <>
      <Container>
        <Box
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <VpnKeyIcon />
          </Avatar>

          <Typography variant="h5">Regisztráció</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              id="name"
              name="name"
              label="Teljes név"
              variant="standard"
              error={errors.name !== undefined}
              helperText={errors.name}
              value={data.name}
              onChange={handleChange}
              autoFocus
              fullWidth
            ></TextField>
            <TextField
              margin="normal"
              id="email"
              name="username"
              label="Email cím"
              type="email"
              variant="standard"
              autoComplete="email"
              error={errors.username !== undefined}
              helperText={errors.username}
              value={data.username}
              onChange={handleChange}
              fullWidth
            ></TextField>
            <TextField
              margin="normal"
              id="password"
              name="password"
              label="Jelszó"
              type="password"
              variant="standard"
              autoComplete="current-password"
              error={errors.password !== undefined}
              helperText={errors.password}
              value={data.password}
              onChange={handleChange}
              fullWidth
            ></TextField>

            <Button type="submit" sx={{ mt: 3, mb: 2 }} fullWidth>
              Regisztráció
            </Button>

            {errors.register && (
              <Alert severity="error">{errors.register}</Alert>
            )}
          </form>
        </Box>
      </Container>
    </>
  );
};
