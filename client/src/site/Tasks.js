import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useGetTasksWithPaginateQuery } from "../state/tasksApiSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../state/authSlice";

export const Tasks = () => {
  const user = useSelector(selectLoggedInUser);
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data } = useGetTasksWithPaginateQuery(currentPage);
  if (isLoading) return <LinearProgress />;
  const maxPage = data.total / data.limit;

  const handlePrevPage = () => {
    currentPage > 0 && setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    currentPage + 1 < maxPage && setCurrentPage(currentPage + 1);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tasks = data.data.map((task) => (
    <Box
      key={task.id}
      sx={{
        display: "flex",
        gap: 2,
        my: 2,
        alignItems: "start",
      }}
    >
      <Accordion
        sx={{
          flex: 1,
        }}
        expanded={expanded === task.id}
        onChange={handleChange(task.id)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            {task.title}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {task.description.slice(0, 8)}...
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{task.description}</Typography>
        </AccordionDetails>
      </Accordion>
      {user && (
        <Button variant="contained" color="primary">
          Kiválasztás
        </Button>
      )}
    </Box>
  ));

  return (
    <Container>
      <Typography variant="h5">Feladatbank</Typography>
      {tasks}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={handlePrevPage} color="secondary">
          Hátra
        </Button>
        <Typography>
          {currentPage + 1}/{maxPage}. oldal
        </Typography>
        <Button onClick={handleNextPage}>Előre</Button>
      </Box>
    </Container>
  );
};
