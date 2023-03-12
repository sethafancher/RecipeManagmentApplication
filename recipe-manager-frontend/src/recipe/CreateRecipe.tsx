import React, { FormEventHandler, useState } from "react";
import { Recipe, createRecipe } from "../RecipeManagerClient"

const Dynamic = ({ title, initialCount, Component }: {title: string, initialCount: number, Component: React.FC}) => {
    const [number, setNumber] = useState<number>(initialCount);

    const renderDynamic = () => {
        const components = [];
        for (let i = 0; i < number; ++i) {
            components.push(<Component key={i}/>);
        }
        return components;
    }

    return <>
        <p>{title}</p>
        <button type="button" onClick={() => setNumber(old => old + 1)}>+</button>
        { renderDynamic() }
    </>
}

export default function CreateRecipe() {
    const Ingredient = () => {
        return <>
        <label>Name <input type="text" name="ingredient_name"></input></label>
        <label>Description <input type="text" name="ingredient_description"></input></label>
        <label>Amount <input type="number" name="ingredient_amount"></input></label>
        <label>Unit <input type="text" name="ingredient_unit"></input></label>
        </>;
    }
    const Equipment = () => {
        return <>
        <label>Name <input type="text" name="equipment_name"></input></label>
        <label>Description <input type="text" name="equipment_description"></input></label>
        </>;
    }
    const Step = () => {
        return <>
        <label>Name <input type="text" name="step_name"></input></label>
        <label>Description <input type="text" name="step_description"></input></label>
        </>;
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        console.log(new FormData(event.target as HTMLFormElement))
        event.preventDefault();
    }

    return <>
        <form onSubmit={handleSubmit}>
            <label>Recipe Title<input type="text" name="title"></input></label>
            <label>Recipe Description<input type="text" name="description"></input></label>
            {<Dynamic title="Ingredients" initialCount={1} Component={Ingredient} />}
            {<Dynamic title="Equipment" initialCount={1} Component={Equipment} />}
            {<Dynamic title="Step" initialCount={1} Component={Step} />}
            <button type="submit" value="Submit">Create Recipe</button>
        </form>
    </>
}