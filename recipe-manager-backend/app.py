from flask import Flask, jsonify, request
import sqlite3
import json

app = Flask(__name__)

def get_db_connection():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    return connection

def get_rec(connection, recipe_id):
    recipe = connection.execute(
        'SELECT DISTINCT R.recipe_id, R.title, R.creator, R.description ' +
        'FROM Recipe R WHERE R.recipe_id = ?;', (recipe_id,)
    ).fetchall()
    recipe_ingredients = connection.execute(
        'SELECT DISTINCT ' +
        'I.name, I.description, I.amount, I.unit '+
        'FROM Recipe R, Recipe_Ingredient I WHERE R.recipe_id = ? ' +
        'AND R.recipe_id = I.recipe_id;', (recipe_id,)
    ).fetchall()
    recipe_equipment = connection.execute(
        'SELECT DISTINCT ' + 
        'E.name, E.description ' +
        'FROM Recipe R, Recipe_Equipment E WHERE R.recipe_id = ? ' +
        'AND R.recipe_id = E.recipe_id;', (recipe_id,)
    ).fetchall()
    recipe_steps = connection.execute(
        'SELECT DISTINCT ' +
        'S.title, S.description ' +
        'FROM Recipe R, Recipe_Step S WHERE R.recipe_id = ? ' +
        'AND R.recipe_id = S.recipe_id;', (recipe_id,)
    ).fetchall()
    recipe = [dict(i) for i in recipe][0]
    recipe_ingredients = [dict(i) for i in recipe_ingredients]
    recipe_equipment = [dict(i) for i in recipe_equipment]
    recipe_steps = [dict(i) for i in recipe_steps]
    complete_recipe = {
        "recipe_id": recipe["recipe_id"],
        "title": recipe["title"],
        "creator": recipe["creator"],
        "description": recipe["description"],
        "ingredients": [dict(i) for i in recipe_ingredients],
        "equipment": [dict(i) for i in recipe_equipment],
        "steps": [dict(i) for i in recipe_steps]
    }
    return complete_recipe

# GET route for /api/recipe/<recipe_id>
@app.route("/api/recipe/<recipe_id>")
def get_recipe(recipe_id):
    connection = get_db_connection()
    recipe = get_rec(connection, recipe_id)
    connection.commit()
    connection.close()
    return recipe

# GET route for /api/recipes/mine
@app.route("/api/recipes/mine")
def get_user_recipes():
    user_id = 1 # mock user
    connection = get_db_connection()
    recipes = connection.execute(
        'SELECT DISTINCT R.recipe_id ' +
        'FROM Recipe R WHERE R.creator = ?;', (user_id,)
    ).fetchall()
    complete_recipes = []
    for r in recipes:
        complete_recipes.append(get_rec(connection, r["recipe_id"]))
    connection.commit()
    connection.close()
    return jsonify(complete_recipes)

# POST route for /api/recipe
@app.route("/api/recipe")
def create_recipe():
    return {}

# POST route for /api/login
@app.route("/api/login")
def login():
    return {}

# POST route for /api/user/create
@app.route("/api/user/create")
def create_user():
    return {}