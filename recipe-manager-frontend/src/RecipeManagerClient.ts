import axios, { AxiosRequestConfig } from "axios";

type UserToken = string;

export interface Step {
  title: string;
  description: string;
}

export interface Ingredient {
  name: string;
  description: string;
  amount: number;
  unit: string;
}

export interface Equipment {
  name: string;
  description: string;
}

export interface Recipe {
  recipeId: number;
  title: string;
  creator: number;
  description: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  steps: Step[];
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  userId: number;
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
      Authorization: "Bearer " + token,
    },
  };
};

const getRecipe = async (recipeId: number): Promise<Recipe> => {
  return (await axios.get<Recipe>(`${baseUrl}/api/recipe/${recipeId}`)).data;
};

// Token will arrive as a header with key "Authorization" and value "Bearer {TOKEN}"
const getMyRecipes = async (token: UserToken): Promise<Recipe[]> => {
  return (
    await axios.get<Recipe[]>(`${baseUrl}/api/recipes/mine`, getAuth(token))
  ).data;
};

// Token will arrive as a header with key "Authorization" and value "Bearer {TOKEN}"
const createRecipe = async (recipe: Recipe, token: UserToken) => {
  await axios.post(`${baseUrl}/api/recipe`, recipe, getAuth(token));
};

// Needs to return any string (a JWT would be cool) that is unique for the user's login and can be verified by the backend later
const login = async (
  username: string,
  password: string
): Promise<UserToken> => {
  let resp = await axios.post<LoginResponse>(`${baseUrl}/api/login`, {
    username,
    password,
  });
  console.log(resp);
  return (resp.data as LoginResponse).token;
};

const createUser = async (request: CreateUserRequest): Promise<UserToken> => {
  return await axios.post(`${baseUrl}/api/user/create`, request);
};

export { getRecipe, getMyRecipes, createRecipe, login, createUser };

// /home
// /recipe/{recipeId}
// /login
// /createaccount
