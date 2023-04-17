from flask import Flask, jsonify, request, Response
import jwt
from flask_jwt_extended import create_access_token, get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
import sqlite3
import ast

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

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
    if len([dict(i) for i in recipe]) == 0:
        return {}
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
    if recipe == {}:
        return Response("Error: Recipe id: " + recipe_id + " does not exist", status=404, mimetype='application/json')
    connection.commit()
    connection.close()
    return jsonify(recipe)

# DELETE route for /api/recipe/<recipe_id>
@app.route("/api/recipe/<recipe_id>", methods = ['DELETE'])
def delete_recipe(recipe_id):
    connection = get_db_connection()
    connection.execute(
        'DELETE FROM Recipe ' +
        'WHERE recipe_id = ?;', (recipe_id,)
    )
    connection.commit()
    connection.close()
    return Response(status=204)

# GET route for /api/recipes/mine
@app.route("/api/recipes/mine")
@jwt_required()
def get_my_recipes():
    user_id = ast.literal_eval(get_jwt_identity())
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
@app.route("/api/recipe", methods = ['POST'])
@jwt_required()
def create_recipe():
    user_id = ast.literal_eval(get_jwt_identity())
    recipe_dict = dict(request.get_json())
    seen = set()
    # check for empty recipe title
    if recipe_dict["title"] == "" or recipe_dict["title"] == " ":
         return Response("Error: Empty recipe title", status=400, mimetype='application/json')
    # check for empty steps
    if recipe_dict["steps"] == [{'title': '', 'description': ''}]:
         return Response("Error: Empty steps", status=400, mimetype='application/json')
    # check for duplicate ingredients/equipment
    for ingredient in recipe_dict["ingredients"]:
        if ingredient["name"] in seen and ingredient["name"] != "":
            return Response("Error: Duplicate ingredients", status=400, mimetype='application/json')
        else:
            seen.add(ingredient["name"])
    seen.clear()
    for equipment in recipe_dict["equipment"]:
        if equipment["name"] in seen and equipment["name"] != "":
            return Response("Error: Duplicate equipment", status=400, mimetype='application/json')
        else:
            seen.add(equipment["name"])
    connection = get_db_connection()
    recipe_id = None
    try:
        result = connection.execute("INSERT INTO Recipe (title, creator, description)" +
                            "VALUES (?, ?, ?);",
                            (recipe_dict["title"], user_id,\
                             recipe_dict["description"],))
        recipe_id = result.lastrowid
        
    except Exception as e: 
        return Response("Error: recipeId aready exists", status=409, mimetype='application/json')
    ing_count = 0
    for ingredient in recipe_dict["ingredients"]:
        connection.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
                            "VALUES (?, ?, ?, ?, ?, ?);",
                            (ing_count, recipe_id,  ingredient["name"], ingredient["description"],
                             ingredient["amount"], ingredient["unit"],))
        ing_count += 1
    eq_count = 0
    for equipment in recipe_dict["equipment"]:
        connection.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name, description)" +
                            "VALUES (?, ?, ?, ?);",
                            (eq_count, recipe_id,  equipment["name"], equipment["description"],))
        eq_count += 1
    step_count = 0
    for step in recipe_dict["steps"]:
        connection.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
                            "VALUES (?, ?, ?, ?);",
                            (step_count, recipe_id,  step["title"], step["description"],))
        step_count += 1
    recipe_dict["creator"] = user_id
    recipe_dict["recipe_id"] = recipe_id
    connection.commit()
    connection.close()
    return jsonify(recipe_dict)

# POST route for /api/login
@app.route("/api/login", methods = ['POST'])
def login():
    login_dict = dict(request.get_json())
    connection = get_db_connection()
    user_id = connection.execute(
        'SELECT DISTINCT U.user_id ' +
        'FROM User U WHERE U.username = ? AND U.password = ?;', (login_dict["username"], login_dict["password"],)
    ).fetchall()
    user_id = [dict(i) for i in user_id]
    if len(user_id) == 0:
        return Response("Error: Wrong username or password", status=403, mimetype='application/json')
    access_token = create_access_token(identity=str(user_id[0]), expires_delta=False)
    connection.commit()
    connection.close()
    return jsonify({ "token": access_token})

# POST route for /api/user/create
@app.route("/api/user/create", methods = ['POST'])
def create_user():
    user_dict = dict(request.get_json())
    user_info = user_dict["user"]
    connection = get_db_connection()
    user_id = None
    try:
        result = connection.execute("INSERT INTO User (first_name, last_name, username, password)" +
                            "VALUES (?, ?, ?, ?);",
                            (user_info["firstName"], user_info["lastName"],
                             user_info["username"],  user_dict["password"],))
        user_id = result.lastrowid
    except: 
        return Response("Error: userId or username aready exists", status=409, mimetype='application/json')
    access_token = create_access_token(identity=str(user_id))
    connection.commit()
    connection.close()
    return jsonify({ "token": access_token })