import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import ViewRecipe from "./pages/ViewRecipe";
import CreateRecipe from "./recipe/CreateRecipe";
import { getRecipe } from "./RecipeManagerClient";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/recipe/:recipeId" element={<ViewRecipe />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
