from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/hello")
def hello_world():
    return jsonify("hello")