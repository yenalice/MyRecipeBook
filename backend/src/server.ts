import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { router as userRouter } from "./routes/userRoute";
import { router as recipeRouter } from "./routes/recipeRoute";
import { router as ingredientRouter } from "./routes/ingredientRoute";

// TODO:
// do i need to set up database
// fill with data from api
// do i need .env file?
// set up nodemon
// set up JEST

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use("/user", userRouter)
    .use("/recipe", recipeRouter)
    .use("/ingredient", ingredientRouter);

app.listen(4201, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log("My Node App listening on port 4201");
});
