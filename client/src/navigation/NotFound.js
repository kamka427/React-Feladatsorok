import { Alert, Box } from "@mui/material";
import { Container } from "@mui/system";

export const NotFound = () => (
  <Container maxWidth="xs">
    <Box marginTop={3}>
      <Alert variant="outlined" color="error">
        404 - Az oldal nem található
      </Alert>
    </Box>
  </Container>
);
