import sqlite3

connection = sqlite3.connect('database.db')

with open('sql/schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO User (user_id, first_name, last_name, username, password)" +
            "VALUES (1, 'Seth', 'Fancher', 'sfancher', 'password');")

cur.execute("INSERT INTO Recipe (title, creator, description)" +
            "VALUES ('Montreal Chicken', 1, 'A deliciously moist chicken breast recipe');")
cur.execute("INSERT INTO Recipe (title, creator, description)" +
            "VALUES ('New York Strip Steak', 1, 'The perfect way to cook a New York Strip steak');")

cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (1, 1, 'chicken breast', '', 2, 'lbs');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (2, 1, 'Montreal Chicken seasoning', '', 1, 'cup');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (3, 1, 'salted butter', 'Montreal chicken', 2, 'tbsp');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (1, 2, 'New York Strip steak', '', 12, 'oz');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (2, 2, 'salt', '', 6, 'dashes');")
cur.execute("INSERT INTO Recipe_Ingredient (ingredient_id, recipe_id, name, description, amount, unit)" +
            "VALUES (3, 2, 'pepper', '', 4, 'dashes');")

cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (1, 1, 'Rinse chicken', 'Rinse the chicken breasts, making sure that they are patted dry afterwards');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (2, 1, 'Prepare chicken', 'Place the chicken on the baking sheet, and add the seasoning and butter');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (3, 1, 'Bake chicken', 'Bake the chicken in a conventional oven for 20 minutes at 425 degrees F, then eat!');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (1, 2, 'Season steak', 'Liberally season both sides of the steak with salt and pepper');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (2, 2, 'Sear steak', 'Sear the steak on a cast iron pan for 3 minutes on each side');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (3, 2, 'Bake steak', 'Bake the steak in a conventional oven for 6 minutes at 500 degrees F');")
cur.execute("INSERT INTO Recipe_Step (step_id, recipe_id, title, description)" +
            "VALUES (4, 2, 'Cover steak', 'Cover the steak with aluminum foil for 5 minutes, then eat!');")

cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name, description)" +
            "VALUES (1, 1, 'Baking sheet', '');")
cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name, description)" +
            "VALUES (1, 2, 'Cast iron pan', '');")
cur.execute("INSERT INTO Recipe_Equipment (equipment_id, recipe_id, name, description)" +
            "VALUES (2, 2, 'Aluminum foil', '');")


connection.commit()
connection.close()