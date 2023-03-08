import React from "react";
import logo from "./logo.svg";
import SignIn from "./SignIn";
import { getRecipe } from "./RecipeManagerClient";
import "./App.css";

function App() {
  console.log(getRecipe(1));
  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
