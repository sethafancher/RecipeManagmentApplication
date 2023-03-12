import { getMyRecipes, Recipe } from "../RecipeManagerClient";
import React, { useEffect, useState } from "react";
import { useLoginState } from "../LoginState";
import { Navigate } from "react-router-dom";

const RecipePreview: React.FC<{recipe: Recipe}> = ({ recipe }) => {
    return <>
        <p>{recipe.title}</p>
        <p>{recipe.description}</p>
        <a href={"/recipe/" + recipe.recipe_id}>View</a>
    </>;
}

export default RecipePreview;