import sqlite3

connection = sqlite3.connect('database.db')

with open('sql/schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO User (user_id, first_name, last_name, username, password)" +
            "VALUES (1, 'Seth', 'Fancher', 'sfancher', 'password');")

cur.execute("INSERT INTO Recipe (recipe_id, title, creator, description)" +
            "VALUES (1, 'Chicken', 1, 'My chicken recipe');")
cur.execute("INSERT INTO Recipe (recipe_id, title, creator, description)" +
            "VALUES (2, 'Steak', 1, 'My steak recipe');")

cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (1, 1, 'Sauce', 'Red sauce', 4, 'cups');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (2, 1, 'Seasoning', 'Montreal chicken', 2, 'dashes');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (1, 2, 'Sauce', 'White sauce', 3, 'cups');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (2, 2, 'Seasoning', 'Montreal steak', 6, 'dashes');")

cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title)" +
            "VALUES (1, 1, 'Prepare chicken');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title)" +
            "VALUES (2, 1, 'Cook chicken');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title)" +
            "VALUES (1, 2, 'Prepare steak');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title)" +
            "VALUES (2, 2, 'Cook steak');")

cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name)" +
            "VALUES (1, 1, 'Plate');")
cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name)" +
            "VALUES (2, 1, 'Knife');")
cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name)" +
            "VALUES (1, 2, 'Bowl');")
cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name)" +
            "VALUES (2, 2, 'Fork');")


connection.commit()
connection.close()