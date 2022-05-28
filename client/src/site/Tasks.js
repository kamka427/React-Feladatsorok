import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useGetTasksWithPaginateQuery } from "../state/tasksApiSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../state/authSlice";
import { usePagination } from "../navigation/usePagination";
import { addTask, removeTask, selectTasklist } from "../state/tasklistSlice";

export const Tasks = () => {
  const user = useSelector(selectLoggedInUser);
  const [expanded, setExpanded] = useState(false);
  const { currentPage, handlePageChange, calculateLastPage } = usePagination();
  const storedTasklist = useSelector(selectTasklist);

  const includedTaskIds =
    storedTasklist && storedTasklist.tasks.map((task) => task.id);

  const { isLoading, data } = useGetTasksWithPaginateQuery(currentPage);

  const dispatch = useDispatch();

  if (isLoading) return <LinearProgress />;

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tasks = data.data.map((task) => (
    <Grid item xs={6} key={task.id}>
      <Card>
        <Stack direction="row">
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            variant="outlined"
            expanded={expanded === task.id}
            onChange={handlePanelChange(task.id)}
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
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description.slice(0, 8)}...
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Feladatleírás: {task.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {user && (!storedTasklist || !includedTaskIds.includes(task.id)) && (
            <Button color="primary" onClick={() => dispatch(addTask(task))}>
              Kiválasztás
            </Button>
          )}
          {user && storedTasklist && includedTaskIds.includes(task.id) && (
            <Button
              color="secondary"
              onClick={() => dispatch(removeTask(task))}
            >
              Kiválasztva
            </Button>
          )}
        </Stack>
      </Card>
    </Grid>
  ));

  return (
    <Container>
      <Stack marginTop={2}>
        <Typography variant="h5">Feladatbank</Typography>
        <Grid container spacing={2} marginY={1}>
          {tasks}
        </Grid>
        <Stack alignItems="center" marginTop={3}>
          <Pagination
            count={calculateLastPage(data)}
            onChange={handlePageChange}
          />
        </Stack>
      </Stack>
    </Container>
  );
};
