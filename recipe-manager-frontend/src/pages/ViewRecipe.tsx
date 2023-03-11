import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getRecipe, Recipe } from "../RecipeManagerClient";
import RecipeView from "../recipe/RecipeView";

function ViewRecipe() {
  let [recipeState, setRecipeState] = useState<Recipe>();
  let { recipeId } = useParams();
  useEffect(() => {
    getRecipe(+(recipeId || "")).then((recipe) => {
      console.log(recipe);
      setRecipeState(recipe);
    });
  }, []);
  if (recipeId == undefined) {
    return <Navigate to="/" />;
  }
  return <>{recipeState && <RecipeView recipe={recipeState} />}</>;
}

export default ViewRecipe;
