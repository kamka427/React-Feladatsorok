import { Container, Stack, Typography } from "@mui/material";
export const Home = () => (
  <Container>
    <Stack spacing={1} marginTop={2}>
      <Typography variant="h5">Főoldal</Typography>
      <Typography variant="h6">Információ</Typography>
      <Typography variant="body1">
        Az oldal segítségével egyszerűen tud feladatsorokat összeállítani órai
        munka vagy dolgozatiratás céljából. Regisztráció, illetve bejelentkezés
        után, a feladatbankból feladatokat válogatva, új feladatsorokat hozhat
        létre, illetve meglévőket módosíthat. A feladatbankon keresztül a
        feladatok eltávolítása is lehetséges a szerkesztett feladatsorból. A
        profil fülön megtekintheti adatait. A hold ikonra kattintva
        változtathatja az oldal témáját.
      </Typography>
    </Stack>
  </Container>
);
