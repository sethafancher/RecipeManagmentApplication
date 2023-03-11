import Card from "@mui/material/Card";
import { Recipe } from "../RecipeManagerClient";

const Step: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <>
    <h3>{title}</h3>
    <p>{description}</p>
  </>
);

const RecipeView: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Prerequisites:</p>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
      <ul>
        {recipe.equipment.map((equipment) => (
          <li>{equipment.name}</li>
        ))}
      </ul>
      {recipe.steps.map((step) => (
        <Step title={step.title} description={step.description} />
      ))}
    </>
  );
};

export default RecipeView;
