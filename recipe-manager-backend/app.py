from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/api/hello")
def hello_world():
    return jsonify("hello")

@app.route("/api/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print(f"Username: {request.form['username']}")
        print(f"Password: {request.form['password']}")
        return {
            "msg": "success"
        }