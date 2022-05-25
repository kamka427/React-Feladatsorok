import {
  Alert,
  Avatar,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../state/tasksApiSlice";
import { login } from "../state/authSlice";

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

    setErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      return;
    }

    try {
      await authRegister({
        email: username,
        password: password,
        fullname : name,
      }).unwrap();
      navigate("/bejelentkezes", { replace: true });
    } catch (err) {
      newErrors.register = "Registration error";
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
          rror={errors.name !== undefined}
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

        {errors.register && 
          <Alert severity="error">{errors.register}</Alert>
          }
      </form>
      </Container>
    </>
  );
};
