import React from "react";
import { useParams } from "react-router-dom";

function ViewRecipe() {
  let { recipeId } = useParams();
  return <>{recipeId}</>;
}

export default ViewRecipe;
