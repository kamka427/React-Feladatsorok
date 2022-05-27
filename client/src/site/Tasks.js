import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Container,
  Grid,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useGetTasksWithPaginateQuery } from "../state/tasksApiSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../state/authSlice";
import { usePagination } from "../navigation/usePagination";

export const Tasks = () => {
  const user = useSelector(selectLoggedInUser);
  const [expanded, setExpanded] = useState(false);
  const { currentPage, handlePageChange, calculateLastPage } = usePagination();

  const { isLoading, data } = useGetTasksWithPaginateQuery(currentPage);

  if (isLoading) return <LinearProgress />;

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tasks = data.data.map((task) => (
    <Grid item xs={6} key={task.id}>
      <Card>
        <Box sx={{ display: "flex" }}>
          <Accordion
            variant="outlined"
            expanded={expanded === task.id}
            onChange={handlePanelChange(task.id)}
            sx={{
              flex: 1,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" gap={4} alignItems="center">
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {task.description.slice(0, 8)}...
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1"> {task.description}</Typography>
            </AccordionDetails>
          </Accordion>
          {user && <Button color="primary">Kiválasztás</Button>}
        </Box>
      </Card>
    </Grid>
  ));

  return (
    <Container>
      <Box marginTop={2}>
        <Typography variant="h5">Feladatbank</Typography>
        <Grid container spacing={2} marginY={1}>
          {tasks}
        </Grid>
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
      </Box>
    </Container>
  );
};
