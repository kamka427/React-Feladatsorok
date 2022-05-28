import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
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
  selectModifiedValues,
  selectTasklist,
  updateTasklist,
} from "../state/tasklistSlice";
import { Fragment, useState } from "react";
import {
  useCreateTasklistMutation,
  useModifyTasklistMutation,
} from "../state/tasksApiSlice";

export const Modify = () => {
  const dispatch = useDispatch();
  const storedTasklist = useSelector(selectTasklist);
  const storedModifiedValues = useSelector(selectModifiedValues);

  const [editedTasklist, setEditedTasklist] = useState(storedTasklist);
  const [modifiedValues, setModifiedValues] = useState(storedModifiedValues);
  const [errors, setErrors] = useState({});

  const [tasklistCreate] = useCreateTasklistMutation();
  const [tasklistModify] = useModifyTasklistMutation();

  const handleChange = (e) => {
    setEditedTasklist({
      ...editedTasklist,
      [e.target.name]: e.target.value,
    });
    setModifiedValues({
      ...modifiedValues,
      [e.target.name]: e.target.value,
    });
    dispatch(
      updateTasklist({
        tasklist: editedTasklist,
        modifiedValues: modifiedValues,
      })
    );
  };
  const handleTaskChange = (e, id) => {
    setEditedTasklist({
      ...editedTasklist,
      tasks: editedTasklist.tasks.map((task) => {
        return task.id === id
          ? { ...task, [e.target.name]: e.target.value }
          : task;
      }),
    });
    setModifiedValues({
      ...modifiedValues,
      tasks: modifiedValues.tasks.map((task) => {
        return task.id === id
          ? { ...task, [e.target.name]: e.target.value }
          : task;
      }),
    });
    dispatch(
      updateTasklist({
        tasklist: editedTasklist,
        modifiedValues: modifiedValues,
      })
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (editedTasklist.title === "") {
      newErrors.title = "Nem adott meg címet";
    }
    if (editedTasklist.status === "") {
      newErrors.status = "Nem adott meg státuszt";
    }

    editedTasklist.tasks.forEach((task) => {
      if (task.points === "" || !task.points)
        newErrors[task.id] = "Nem adott meg pontszámot";
    });

    setErrors({ ...newErrors });

    if (Object.values(newErrors).length > 0) {
      return;
    }

    if (!editedTasklist.id) {
      try {
        console.log(editedTasklist);
        const res = await tasklistCreate(editedTasklist).unwrap();
        console.log(res);
        dispatch(deleteTasklist());
      } catch (err) {
        newErrors.create = "Hiba történt a mentés során";
        setErrors({ ...newErrors });
      }
      return;
    }

    try {
      console.log(modifiedValues);
      const res = await tasklistModify({
        ...modifiedValues,
        id: editedTasklist.id,
      }).unwrap();
      console.log(res);
      dispatch(deleteTasklist());
    } catch (err) {
      newErrors.create = "Hiba történt a módosítás során";
      setErrors({ ...newErrors });
    }
  };

  const handleDeleteTasklist = () => {
    dispatch(deleteTasklist());
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
          value={task.notes || ""}
          fullWidth
          onChange={(e) => handleTaskChange(e, task.id)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Feladat pontszáma"
          name="points"
          type="number"
          value={task.points || ""}
          error={errors[task.id] !== undefined}
          helperText={errors[task.id]}
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
                error={errors.title !== undefined}
                helperText={errors.title}
                fullWidth
                value={editedTasklist.title || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={errors.status !== undefined}>
                <InputLabel id="status">Státusz</InputLabel>
                <Select
                  label="Státusz"
                  name="status"
                  labelId="status"
                  defaultValue="draft"
                  value={editedTasklist.status || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
                <FormHelperText>{errors.status}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Leírás"
                name="description"
                value={editedTasklist.description || ""}
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
                onClick={handleDeleteTasklist}
              >
                Szerkesztés lezárása
              </Button>
            </Grid>
          </Grid>
        </form>
        {errors.create && (
          <Alert variant="outlined" severity="error">
            {errors.create}
          </Alert>
        )}
      </Stack>
    </Container>
  );
};
