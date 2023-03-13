import sqlite3

connection = sqlite3.connect('database.db')

with open('sql/schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO User (user_id, first_name, last_name, username, password)" +
            "VALUES (1, 'Seth', 'Fancher', 'sfancher', 'password');")

cur.execute("INSERT INTO Recipe (title, creator, description)" +
            "VALUES ('Chicken', 1, 'My chicken recipe');")
cur.execute("INSERT INTO Recipe (title, creator, description)" +
            "VALUES ('Steak', 1, 'My steak recipe');")

cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (1, 1, 'Sauce', 'Red sauce', 4, 'cups');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (2, 1, 'Seasoning', 'Montreal chicken', 2, 'dashes');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (1, 2, 'Sauce', 'White sauce', 3, 'cups');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (2, 2, 'Seasoning', 'Montreal steak', 6, 'dashes');")

cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (1, 1, 'Prepare chicken', 'This is the first step');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (2, 1, 'Cook chicken', 'This is the second step');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (1, 2, 'Prepare steak', 'This is the first step');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (2, 2, 'Cook steak', 'This is the second step');")

cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name, description)" +
            "VALUES (1, 1, 'Plate', 'This is a plate');")
cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name, description)" +
            "VALUES (2, 1, 'Knife', 'This is a knife');")
cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name, description)" +
            "VALUES (1, 2, 'Bowl', 'This is a bowl');")
cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name, description)" +
            "VALUES (2, 2, 'Fork', 'This is a fork');")


connection.commit()
connection.close()