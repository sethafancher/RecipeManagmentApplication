PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Recipe_Ingredient;
DROP TABLE IF EXISTS Recipe_Equipment;
DROP TABLE IF EXISTS Recipe_Step;

CREATE TABLE User (
    user_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE Recipe (
    recipe_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    creator INTEGER NOT NULL,
    description TEXT,
    FOREIGN KEY (creator) REFERENCES User(user_id)
);

CREATE TABLE Recipe_Ingredient (
    ingredient_id INTEGER,
    recipe_id INTEGER,
    name TEXT NOT NULL,
    description TEXT,
    amount REAL NOT NULL,
    unit TEXT,
    PRIMARY KEY (ingredient_id, recipe_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE
);

CREATE TABLE Recipe_Equipment (
    equipment_id INTEGER,
    recipe_id INTEGER,
    name TEXT NOT NULL,
    description  TEXT,
    PRIMARY KEY (equipment_id, recipe_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE
);

CREATE TABLE Recipe_Step (
    step_id INTEGER,
    recipe_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (step_id, recipe_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE
);