import pytest
from conftest import client

def test_get_recipe_DNE(client):
    response = client.get("/api/recipe/5")
    assert response.status == '404 NOT FOUND'

def test_post_recipe_EXISTS(client):
    response = client.post("/api/recipe", data = {

    })
    assert response.status == '409 CONFLICT'