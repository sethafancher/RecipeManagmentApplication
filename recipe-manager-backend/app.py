from flask import Flask
import sqlite3
import json

app = Flask(__name__)

def get_db_connection():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    return connection

# Example GET route for /recipe/<recipe_id>
@app.route("/api/recipe/<recipe_id>")
def get_recipe(recipe_id):
    connection = get_db_connection()
    test_recipe = connection.execute('SELECT * FROM Recipe WHERE recipe_id = ?', (recipe_id,)).fetchall()
    connection.close()
    return json.dumps([dict(i) for i in test_recipe])