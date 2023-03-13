import React, { FormEventHandler, useState } from "react";
import {
  Recipe,
  createRecipe,
  Step,
  Ingredient,
  Equipment,
} from "../RecipeManagerClient";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoginState } from "../LoginState";

const theme = createTheme();

/*
"ingredients": [
    {name, description, amount, unit}
]
"equipment": [
    {name, description}
]
"steps": [
    {name, description}
]

*/

interface DynamicFormProps<T> {
  index: number;
  state: T[];
  setStateProperty: (index: number, property: string) => (event: any) => void;
}

interface DynamicProps<T> {
  title: string;
  initialCount: number;
  Component: React.FC<DynamicFormProps<T>>;
  state: T[];
  setState: React.Dispatch<React.SetStateAction<T[]>>;
  createNew: () => T;
}

function Dynamic<T>({
  title,
  initialCount,
  Component,
  state,
  setState,
  createNew,
}: DynamicProps<T>) {
  const [number, setNumber] = useState<number>(initialCount);

  const setStateProperty = (targetIndex: number, targetProperty: string) => {
    return (event: any) => {
      const eventValue = event.target.value;
      console.log(eventValue);
      setState((prevState: T[]) => {
        return prevState.map((stateValue, index) => {
          if (index != targetIndex) return stateValue;
          else {
            console.log({ ...stateValue, [targetProperty]: eventValue });
            return { ...stateValue, [targetProperty]: eventValue };
          }
        });
      });
    };
  };

  console.log(state);
  return (
    <>
      <p>{title}</p>
      <button
        type="button"
        onClick={() => setState((oldState) => [...oldState, createNew()])}
      >
        +
      </button>
      {state.map((val, index) => {
        return (
          <Component
            key={["step", index].join("_")}
            index={index}
            setStateProperty={setStateProperty}
            state={state}
          />
        );
      })}
    </>
  );
}

const IngredientFormComponent = ({
  index,
  state,
  setStateProperty,
}: DynamicFormProps<Ingredient>) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="ingredient_name"
          name="ingredient_name"
          label="Ingredient name"
          value={state[index].name}
          onChange={setStateProperty(index, "name")}
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="ingredient_description"
          name="ingredient_description"
          label="Description"
          value={state[index].description}
          onChange={setStateProperty(index, "description")}
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="ingredient_amount"
          name="ingredient_amount"
          label="Amount"
          value={state[index].amount}
          onChange={setStateProperty(index, "amount")}
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="ingredient_unit"
          name="ingredient_unit"
          label="Unit"
          value={state[index].unit}
          onChange={setStateProperty(index, "unit")}
          fullWidth
          variant="standard"
        />
      </Grid>
    </>
  );
};

const EquipmentFormComponent = ({
  index,
  state,
  setStateProperty,
}: DynamicFormProps<Equipment>) => {
  return (
    <>
      <label>
        Name{" "}
        <input
          type="text"
          name="equipment_name"
          value={state[index].name}
          onChange={setStateProperty(index, "name")}
        ></input>
      </label>
      <label>
        Description{" "}
        <input
          type="text"
          name="equipment_description"
          value={state[index].description}
          onChange={setStateProperty(index, "description")}
        ></input>
      </label>
    </>
  );
};

const StepFormComponent = ({
  index,
  state,
  setStateProperty,
}: DynamicFormProps<Step>) => {
  return (
    <>
      <label>Name </label>
      <input
        key={"title" + index}
        type="text"
        name="step_name"
        value={state[index].title}
        onChange={setStateProperty(index, "title")}
      ></input>

      <label>Description </label>
      <input
        key={"description" + index}
        type="text"
        name="step_description"
        value={state[index].description}
        onChange={setStateProperty(index, "description")}
      ></input>
    </>
  );
};

export default function CreateRecipe() {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([
    { name: "", description: "", amount: 0, unit: "" },
  ]);
  const [steps, setSteps] = React.useState<Step[]>([
    { title: "", description: "" },
  ]);
  const [equipment, setEquipment] = React.useState<Equipment[]>([
    { name: "", description: "" },
  ]);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [loginState, setLoginState] = useLoginState();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newRecipe: Recipe = {
      title,
      description,
      steps,
      ingredients,
      equipment,
      creator: -1, // overwritten by backend
      recipe_id: -1, // overwritten by backend
    };
    loginState && loginState != "" && createRecipe(newRecipe, loginState);
  };
  if (loginState == "") return <Navigate to="/" />;
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Create recipe
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Create your recipe
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Recipe Info
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>
                Recipe Title
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                ></input>
              </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>
                Recipe Description
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></input>
              </label>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Enter Ingredients
              </Typography>
            </Grid>
            {
              <Dynamic
                title="Ingredients"
                initialCount={1}
                Component={IngredientFormComponent}
                state={ingredients}
                setState={setIngredients}
                createNew={() => {
                  return { name: "", description: "", amount: 0, unit: "" };
                }}
              />
            }
            <Typography variant="h6" gutterBottom>
              Enter Equipment
            </Typography>
            {
              <Dynamic
                title="Equipment"
                initialCount={1}
                Component={EquipmentFormComponent}
                state={equipment}
                setState={setEquipment}
                createNew={() => {
                  return { name: "", description: "" };
                }}
              />
            }
            <Typography variant="h6" gutterBottom>
              Enter Steps
            </Typography>
            {
              <Dynamic
                title="Step"
                initialCount={1}
                Component={StepFormComponent}
                state={steps}
                setState={setSteps}
                createNew={() => {
                  return { title: "", description: "" };
                }}
              />
            }
            <button>Create Recipe</button>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
