import React, { FormEventHandler, useState } from "react";
import {
  Recipe,
  createRecipe,
  Step,
  Ingredient,
  Equipment,
} from "../RecipeManagerClient";
import Header from "../Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
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
      <Grid item xs={12} sm={6}>
        <IconButton
          onClick={() => setState((oldState) => [...oldState, createNew()])}
          color="primary"
          aria-label="add to shopping cart"
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
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
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="equipment_name"
          name="equipment_name"
          label="Name"
          value={state[index].name}
          onChange={setStateProperty(index, "name")}
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="equipment_description"
          name="equipment_description"
          label="Description"
          value={state[index].description}
          onChange={setStateProperty(index, "description")}
          fullWidth
          variant="standard"
        />
      </Grid>
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
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="step_name"
          name="step_name"
          label="Name"
          value={state[index].title}
          onChange={setStateProperty(index, "title")}
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="step_description"
          name="sstep_description"
          label="Description"
          value={state[index].description}
          onChange={setStateProperty(index, "description")}
          fullWidth
          variant="standard"
        />
      </Grid>
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
  const navigate = useNavigate();
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [loginState, setLoginState] = useLoginState();

  const handleSubmit = () => {
    if (!title || title.length === 0) {
      // Require title
    }
    if (!description || description.length === 0) {
      // Require Description
    }
    if (!ingredients || ingredients.length === 0) {
      // Require at least one ingredient
    } else {
      for (let ingredient of ingredients) {
        if (
          ingredient.name === "" ||
          ingredient.amount === 0 ||
          ingredient.description == ""
        ) {
          // Require ingredients to be filled out
        }
      }
    }
    if (!steps || steps.length == 0) {
      // Require at least one step
    } else {
      for (let step of steps) {
        if (step.title == "" || step.description == "") {
          // Require steps to be filled out
        }
      }
    }
    // Equipment is optional
    const newRecipe: Recipe = {
      title,
      description,
      steps,
      ingredients,
      equipment,
      creator: -1, // overwritten by backend
      recipe_id: -1, // overwritten by backend
    };
    if (loginState && loginState != "") {
      createRecipe(newRecipe, loginState).then((recipe) =>
        navigate(`/recipe/${recipe.recipe_id}`)
      );
    }
  };
  if (loginState == "") return <Navigate to="/" />;
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Create your recipe
            </Typography>
            <Box m={1} pt={1}>
              <Divider />
            </Box>
            <Typography variant="h6" gutterBottom>
              Enter Recipe Info
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="recipeTitle"
                  name="title"
                  label="Recipe title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="recipeDescription"
                  name="description"
                  label="Recipe description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  fullWidth
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Box m={1} pt={1}>
              <Divider />
            </Box>
            <Typography variant="h6" gutterBottom>
              Enter Ingredients
            </Typography>
            <Grid container spacing={3}>
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
            </Grid>
            <Box m={1} pt={1}>
              <Divider />
            </Box>
            <Typography variant="h6" gutterBottom>
              Enter Equipment
            </Typography>
            <Grid container spacing={3}>
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
            </Grid>
            <Box m={1} pt={1}>
              <Divider />
            </Box>
            <Typography variant="h6" gutterBottom>
              Enter Steps
            </Typography>
            <Grid container spacing={3}>
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
            </Grid>
            <Box m={1} pt={1}>
              <Divider />
            </Box>
            <Button variant="contained" onClick={handleSubmit}>
              Create
            </Button>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
}
