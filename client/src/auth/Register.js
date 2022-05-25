import {
    Avatar,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const Register = () => {
  return (
    <>
      <Container maxWidth="xs"
        
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <VpnKeyIcon />
          </Avatar>

          <Typography variant="h5">Regisztráció</Typography>
          <FormControl fullWidth>
          <TextField
              margin="normal"
              id="name"
              label="Teljes név"
              variant="standard"
              required
              autoFocus
            ></TextField>
            <TextField
              margin="normal"
              id="email"
              label="Email cím"
              type="email"
              variant="standard"
              required
              autoComplete="email"
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

            <Button
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Regisztráció
            </Button>
          </FormControl>
      </Container>
    </>
  );
};
