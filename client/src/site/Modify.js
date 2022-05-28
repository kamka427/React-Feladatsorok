import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTasklist,
  selectTasklist,
  setTasklist,
} from "../state/tasklistSlice";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { useGetTasklistByIdQuery } from "../state/tasksApiSlice";

export const Modify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedTasklist = useSelector(selectTasklist);

  const [editedTasklist, setEditedTasklist] = useState(storedTasklist);

  const { isLoading, data } = useGetTasklistByIdQuery(storedTasklist.id);

  if (isLoading) {
    return <LinearProgress />;
  }

  const handleChange = (e) => {
    setEditedTasklist({
      ...editedTasklist,
      [e.target.name]: e.target.value,
    });
    dispatch(setTasklist(editedTasklist));
  };

  const handleTaskChange = (e, id) => {
    setEditedTasklist({
      ...editedTasklist,
      tasks: editedTasklist.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            [e.target.name]: e.target.value,
          };
        }
        return task;
      }),
    });
    dispatch(setTasklist(editedTasklist));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      title: editedTitle,
      status: editedStatus,
      description: editedDescription,
      tasks: editedTasks,
    } = editedTasklist;

    const {
      title: serverTitle,
      status: serverStatus,
      description: serverDescription,
      tasks: serverTasks,
    } = data;

    const modifiedValues = {};
    const modifiedTasks = [];

    modifiedValues.id = data.id;

    if (editedTitle !== serverTitle) {
      modifiedValues.title = editedTitle;
    }

    if (editedStatus !== serverStatus) {
      modifiedValues.status = editedStatus;
    }

    if (editedDescription !== serverDescription) {
      modifiedValues.description = editedDescription;
    }

    console.log(editedTasks);

    const taskIdsOnServer = serverTasks.map((task) => task.id);

    editedTasks.forEach((task, i) => {
      if (!taskIdsOnServer.includes(task.id)) {
        const newTask = {
          id: task.id,
          title: task.title,
          description: task.description,
        };
        if (task.notes) {
          newTask.notes = task.notes;
        }
        if (parseInt(task.points) && !isNaN(parseInt(task.points))) {
          newTask.points = parseInt(task.points);
        }
        modifiedTasks.push(newTask);
      } else {
        const modified = {};
        const changed =
          serverTasks[i] &&
          (task.notes !== serverTasks[i].notes ||
            (parseInt(task.points) !== serverTasks[i].points &&
              !isNaN(parseInt(task.points))));
        if (changed) {
          if (task.notes !== serverTasks[i].notes) {
            modified.notes = task.notes;
          }
          if (
            parseInt(task.points) !== serverTasks[i].points &&
            !isNaN(parseInt(task.points))
          ) {
            modified.points = parseInt(task.points);
          }
          modified.id = task.id;
          modifiedTasks.push(modified);
        }
      }
    });

    modifiedValues.tasks = modifiedTasks;

    console.log(modifiedValues);
  };

  const sumPoints = editedTasklist.tasks.reduce((acc, task) => {
    return acc + parseInt(task.points) || 0;
  }, 0);

  const tasks = editedTasklist.tasks.map((task) => (
    <Fragment key={task.id}>
      <Grid item xs={6}>
        <TextField
          label="Feladat címe"
          name="title"
          value={task.title}
          disabled
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Feladat leírása"
          name="description"
          disabled
          value={task.description}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Feladat megjegyzése"
          name="notes"
          value={task.notes}
          fullWidth
          onChange={(e) => handleTaskChange(e, task.id)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Feladat pontszáma"
          name="points"
          type="number"
          value={task.points}
          fullWidth
          onChange={(e) => handleTaskChange(e, task.id)}
        />
      </Grid>
    </Fragment>
  ));

  return (
    <Container>
      <Stack marginTop={2} gap={2}>
        <Typography variant="h5">Szerkesztés</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Cím"
                name="title"
                fullWidth
                value={editedTasklist.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="status">Státusz</InputLabel>
                <Select
                  label="Státusz"
                  name="status"
                  labelId="status"
                  defaultValue="draft"
                  value={editedTasklist.status}
                  onChange={handleChange}
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Leírás"
                name="description"
                value={editedTasklist.description}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Összpontszám"
                disabled
                value={sumPoints}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Létrehozás dátuma"
                disabled
                value={editedTasklist.createdAt}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Utolsó módosítás dátuma"
                disabled
                value={editedTasklist.updatedAt}
                fullWidth
              />
            </Grid>
            {tasks}
            <Grid item xs={6}>
              <Button variant="outlined" type="submit" fullWidth>
                Mentés
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                color="error"
                onClick={() => {
                  navigate("/feladatsoraim", { replace: true });
                  dispatch(deleteTasklist());
                }}
              >
                Szerkesztés lezárása
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Container>
  );
};
