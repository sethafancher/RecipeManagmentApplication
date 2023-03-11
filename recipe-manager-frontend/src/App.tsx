import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import SignIn from "./pages/SignIn";
import ViewRecipe from "./pages/ViewRecipe";
import { getRecipe } from "./RecipeManagerClient";
import "./App.css";

function App() {
  console.log(getRecipe(1));
  console.log(getRecipe(2));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/recipe/:recipeId" element={<ViewRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
