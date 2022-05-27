import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

export const Modify = () => {
  return (
    <Container>
      <Stack marginTop={2} gap={2}>
        <Typography variant="h5">Szerkesztés</Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField label="Cím" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <FormControl v fullWidth>
                <InputLabel id="status">Státusz</InputLabel>
                <Select label="Státusz" labelId="status">
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Leírás" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Összpontszám" disabled fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Létrehozás dátuma" disabled fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Utolsó módosítás dátuma" disabled fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Feladat címe" disabled fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Feladat leírása" disabled fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Feladat megjegyzése" disabled fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Feladat pontszáma" disabled fullWidth />
            </Grid>
          <Grid item xs={6}>

            <Button variant="outlined" type="submit" fullWidth>
              Mentés
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth
            color="error">
              Szerkesztés lezárása
              </Button>
          </Grid>
              </Grid>
        </form>
      </Stack>
    </Container>
  );
};
