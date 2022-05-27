import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  Divider,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetTaskslistsWithPaginateQuery } from "../state/tasksApiSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { usePagination } from "../navigation/usePagination";

export const Tasklists = () => {
  const { currentPage, handlePageChange, calculateLastPage } = usePagination();
  const { isLoading, data } = useGetTaskslistsWithPaginateQuery(currentPage);
  const [expanded, setExpanded] = useState(false);
  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  const tasklists = data.data.map((tasklist) => (
    <Card>
      <Box sx={{ display: "flex" }}>
        <Accordion
          variant="outlined"
          key={tasklist.id}
          expanded={expanded === tasklist.id}
          onChange={handlePanelChange(tasklist.id)}
          sx={{
            flex: 1,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack
              direction="row"
              gap={4}
              divider={<Divider orientation="vertical" flexItem />}
              alignItems="center"
            >
              <Typography variant="h6">{tasklist.title}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {tasklist.status}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {tasklist.description}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                K: {tasklist.createdAt}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                M: {tasklist.updatedAt}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{tasklist.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Button color="primary">Szerkeszt</Button>
      </Box>
    </Card>
  ));

  return (
    <>
      <Container>
        <Stack marginTop={2} gap={2}>
          <Typography variant="h5">Feladatsoraim</Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Stack
                spacing={4}
                direction="row"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography>Cím</Typography>
                <Typography>Státusz</Typography>
                <Typography>Leírás</Typography>
                <Typography>Létrehozás</Typography>
                <Typography>Utolsó módosítás</Typography>
              </Stack>
            </Box>
            <Button color="primary" variant="outlined">Új feladatsor</Button>
          </Box>
          <Stack gap={2}>{tasklists}</Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 3,
          }}
        >
          <Pagination
            count={calculateLastPage(data)}
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </>
  );
};
