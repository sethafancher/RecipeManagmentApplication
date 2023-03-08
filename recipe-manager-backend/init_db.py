import sqlite3

connection = sqlite3.connect('database.db')

with open('sql/schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO User (user_id, first_name, last_name, username, password)" +
            "VALUES (1, 'Seth', 'Fancher', 'sfancher', 'password');")
cur.execute("INSERT INTO Recipe (recipe_id, title, creator, description)" +
            "VALUES (1, 'Chicken', 1, 'My chicken recipe');")

connection.commit()
connection.close()