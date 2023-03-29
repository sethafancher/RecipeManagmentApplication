import pytest
from flask import Flask

@pytest.fixture()
def app():
    app = Flask(__name__) # Temp code that doesn't work... we need to rework our entire flask package into the Application factory pattern
    yield app

@pytest.fixture()
def client(app):
    return app.test_client()