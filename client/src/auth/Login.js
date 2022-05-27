import {
  Alert,
  Avatar,
  Button,
  Container,
  Stack,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../state/tasksApiSlice";
import { login } from "../state/authSlice";

export const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [authLogin] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = data;
    const newErrors = {};

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
      const result = await authLogin({
        strategy: "local",
        email: username,
        password: password,
      }).unwrap();
      dispatch(
        login({
          user: result.user,
          token: result.accessToken,
        })
      );
      navigate("/", { replace: true });
    } catch (err) {
      newErrors.login = "Helytelen belépési adatok";
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
    <Container>
      <Stack gap={2}>
        <Stack gap={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "secondary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Bejelentkezés</Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <Stack gap={2}>
              <TextField
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
                autoFocus
                fullWidth
              />
              <TextField
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
              />
              <Button type="submit" sx={{ marginY: 2 }} fullWidth>
                Bejelentkezés
              </Button>
              {errors.login && <Alert severity="error">{errors.login}</Alert>}
            </Stack>
          </Container>
        </form>
      </Stack>
    </Container>
  );
};
