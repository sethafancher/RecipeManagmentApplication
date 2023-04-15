import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useLoginState } from "../LoginState";
import RecipePreview from "../recipe/RecipePreview";
import Header from "../Header";
import { deleteRecipe, getMyRecipes, Recipe } from "../RecipeManagerClient";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();

function Home() {
  const [loginState, setLoginState] = useLoginState();
  const [recipesState, setRecipesState] = useState<Recipe[]>();
  useEffect(() => {
    console.log(loginState);
    loginState &&
      getMyRecipes(loginState).then((recipes) => {
        setRecipesState(recipes);
      });
  }, [loginState]);
  if (loginState == "") {
    return <Navigate to="/" />;
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Recipes
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Create new recipes and
              share them with the world!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button href="/createrecipe" variant="contained">
                Create New Recipe
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {recipesState &&
              recipesState.map((recipe, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <FoodBankIcon />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {recipe.title}
                      </Typography>
                      <Typography>{recipe.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button href={"/recipe/" + recipe.recipe_id} variant="outlined" size="small">
                        View
                      </Button>
                      <Button 
                        onClick={() => {if (loginState) {deleteRecipe(loginState, recipe.recipe_id)}}}
                        href="/home"
                        size="small" 
                        variant="outlined"
                        color="error"
                        style={{ marginLeft: "auto "}}
                        startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default Home;
