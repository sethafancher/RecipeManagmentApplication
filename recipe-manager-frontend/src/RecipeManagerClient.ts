import axios, { AxiosRequestConfig } from "axios";

type UserToken = string;

export interface Step {
  title: string;
  instructions: string;
}

export interface Ingredient {
  name: string;
  description: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  recipeId: number;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  userId: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface CreateUserRequest {
  user: User;
  password: string;
}

const baseUrl = "http://localhost:3000";

const getAuth = (token: UserToken): AxiosRequestConfig<Recipe> => {
  return {
    headers: {
      Authorization: token,
    },
  };
};

const getRecipe = async (recipeId: number): Promise<Recipe> => {
  return await axios.get(`${baseUrl}/api/recipe/${recipeId}`);
};

const getMyRecipes = async (token: UserToken): Promise<Recipe[]> => {
  return await axios.get(`${baseUrl}/api/recipes/mine`, getAuth(token));
};

const createRecipe = async (recipe: Recipe, token: UserToken) => {
  await axios.post(`${baseUrl}/api/recipe`, recipe, getAuth(token));
};

const login = async (request: LoginRequest): Promise<UserToken> => {
  return ((await axios.post(`${baseUrl}/api/login`, request)) as LoginResponse)
    .token;
};

const createUser = async (request: CreateUserRequest): Promise<UserToken> => {
  return await axios.post(`${baseUrl}/api/user/create`, request);
};

export { getRecipe, getMyRecipes, createRecipe, login, createUser };
