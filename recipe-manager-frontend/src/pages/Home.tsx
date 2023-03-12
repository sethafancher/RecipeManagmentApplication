import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useLoginState } from "../LoginState";
import CreateRecipe from "../recipe/CreateRecipe";
import RecipePreview from "../recipe/RecipePreview";
import { getMyRecipes, Recipe } from "../RecipeManagerClient";

function Home() {
  const [loginState, setLoginState] = useLoginState();
  const [recipesState, setRecipesState] = useState<Recipe[]>();
  useEffect(() => {
    console.log(loginState);
      loginState && getMyRecipes(loginState).then(recipes => {
          setRecipesState(recipes);
      })
  }, [loginState]);
  if (loginState == "") {
      return <Navigate to="/"/>
  }

  return <>
        <CreateRecipe />
        {recipesState && recipesState.map(recipe => 
            <RecipePreview recipe={recipe} />
        )}
      </>;
}

export default Home;
