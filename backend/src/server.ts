import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { router as userRouter } from "./routes/userRoute";
import { router as recipeRouter } from "./routes/recipeRoute";
import { router as ingredientRouter } from "./routes/ingredientRoute";

const app = express().use(cors()).use(bodyParser.json());
