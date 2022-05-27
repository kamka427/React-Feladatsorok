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
import { Fragment, useState } from "react";
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

  const summary = (tasklist) => (
    <Stack
      direction="row"
      gap={4}
      divider={<Divider orientation="vertical" flexItem />}
      alignItems="center"
    >
      <Typography variant="h6">{tasklist.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {tasklist.status}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {tasklist.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        L: {tasklist.createdAt}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        M: {tasklist.updatedAt}
      </Typography>
    </Stack>
  );

  const details = (tasklist) => (
    <Stack>
      <Typography variant="h6">{tasklist.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        Státusz: {tasklist.status}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Leírás: {tasklist.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Létrehozva: {tasklist.createdAt}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Utoljára módosítva: {tasklist.updatedAt}
      </Typography>
      <Typography variant="body2" color="text.secondary"></Typography>
      <Typography variant="body2" color="text.secondary">
        Pontok összesítve:
        {tasklist.tasks.reduce((acc, task) => acc + task.points, 0)}
      </Typography>
    </Stack>
  );

  const tasks = (tasklist) =>
    tasklist.tasks.map((task) => (
      <Stack key={task.id}>
        <Typography variant="body1">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Feladatleírás: {task.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Megjegyzés: {task.notes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pontszám: {task.points}
        </Typography>
      </Stack>
    ));

  const tasklists = data.data.map((tasklist) => (
    <Card key={tasklist.id}>
      <Box sx={{ display: "flex" }}>
        <Accordion
          variant="outlined"
          expanded={expanded === tasklist.id}
          onChange={handlePanelChange(tasklist.id)}
          sx={{
            flex: 1,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {summary(tasklist)}
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={4}>
              {details(tasklist)}
              <Box>
                <Typography variant="h6">Feladatok</Typography>
                <Stack
                  direction="row"
                  spacing={4}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  {tasks(tasklist)}
                </Stack>
              </Box>
            </Stack>
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
                marginLeft={2}
              >
                <Typography variant="overline">Cím</Typography>
                <Typography variant="overline">Státusz</Typography>
                <Typography variant="overline">Leírás</Typography>
                <Typography variant="overline">Létrehozás</Typography>
                <Typography variant="overline">Utolsó módosítás</Typography>
              </Stack>
            </Box>
            <Button color="primary" variant="outlined">
              Új feladatsor
            </Button>
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
