import {
  Alert,
  Avatar,
  Button,
  Container,
  FormControl,
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

    setErrors(newErrors);
    
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
      newErrors.login = "Login error";
      setErrors(newErrors);      
      return
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
        <form onSubmit={handleSubmit}>
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
            autoFocus
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
            Bejelentkezés
          </Button>
          {errors.login && 
          <Alert severity="error">{errors.login}</Alert>
          }

        </form>
      </Container>
    </>
  );
};
