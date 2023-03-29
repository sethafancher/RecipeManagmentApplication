import pytest
from conftest import client

def test_post_login_DNE(client):
    response = client.post("/api/login", data = {

    })
    assert response.status == '403 FORBIDDEN'

def test_post_user_EXISTS(client):
    response = client.post("/api/user/create", data = {

    })
    assert response.status == '409 CONFLICT'