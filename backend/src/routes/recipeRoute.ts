import { NextFunction, Request, Response, Router } from "express";
import { getRecipeRepository, Recipe } from "../models/recipeModel";
import { getNutrientRepository, Nutrient } from "../models/nutritientModel";

export const router: Router = Router();

// call to spoonacular api to fill database
router.post(
    "/spoonacular",
    async (req: Request, res: Response, next: NextFunction) => {
        const axios = require("axios").default;
        const apiPath =
            "https://api.spoonacular.com/recipes/complexSearch?apiKey=98d7ccdaa03c4462afb26c5ce21a4ee8";
        axios
            .get(apiPath)
            .then(async (response) => {
                const recipeRepo = await getRecipeRepository();
                const r = response.data.results;
                let recipeList: Recipe[] = [];

                // main info
                for (let i = 0; i < r.length; i++) {
                    let recipe = new Recipe();
                    recipe.title = r[i].title;
                    recipe.summary = r[i].summary;
                    //recipe.ownerId = r[i].ownerId;
                    recipe.cookTime = r[i].readyInMinutes;
                    //recipe.rating = r[i].rating;
                    recipe.imageUrl = r[i].image;
                    //recipe.ingredientsId = r[i].ingredients;

                    // store each nutrient
                    const resNutrient = res.nutrition.nutrients;
                    insertNutrients(resNutrient);

                    recipeList.push(recipe);
                }
                const result = await recipeRepo.save(recipeList);
                res.send(result);
            })
            .catch((error) => {
                return next(error);
            });
    }
);

// add recipe
router.post("", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repository = await getRecipeRepository();
        const recipe = new Recipe();
        recipe.title = req.body.title;
        recipe.summary = req.body.summary;
        // recipe.ownerId = req.body.ownerId;
        // recipe.cookTime = req.body.cookTime;
        // recipe.rating = req.body.rating;
        recipe.imageUrl = req.body.image; // change to imageUrl
        // recipe.ingredientsId = req.body.ingredients;

        // TODO: nutrition info

        const result = await repository.save(recipe);
        res.send(result);
    } catch (err) {
        return next(err);
    }
});

// get all recipes for a given user
router.get("", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repository = await getRecipeRepository();
        const allRecipes = await repository.find();
        res.send(allRecipes);
    } catch (err) {
        return next(err);
    }
});

// get recipe by id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repository = await getRecipeRepository();
        const recipe = await repository.find({ id: req.params.id });
        res.send(recipe);
    } catch (err) {
        return next(err);
    }
});

// edit recipe
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repository = await getRecipeRepository();
        let recipe: Recipe = await repository.findOne({ id: req.params.id });

        recipe.title = req.body.title;
        recipe.summary = req.body.summary;
        // recipe.ownerId = req.body.ownerId;
        // recipe.cookTime = req.body.cookTime;
        // recipe.rating = req.body.rating;
        recipe.imageUrl = req.body.imageUrl;
        // recipe.ingredientsId = req.body.ingredients;

        // TODO: nutrition info

        const result = await repository.save(recipe);
        res.send(result);
    } catch (err) {
        return next(err);
    }
});

// delete recipe
router.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const repository = await getRecipeRepository();
            const result = await repository.delete(req.params.id);
            res.send(result);
        } catch (err) {
            return next(err);
        }
    }
);

// insert nutrient(s) to database given a nutrients json
async function insertNutrients(resNutrient) {
    const nutrientRepo = await getNutrientRepository();
    let nutrientList: Nutrient[] = [];
    for (let i = 0; i < resNutrient.length; i++) {
        let nutrient = new Nutrient();
        nutrient.name = resNutrient.name;
        nutrient.amount = resNutrient.amount;
        nutrient.unit = resNutrient.unit;
        nutrient.percentOfDailyNeeds = resNutrient.percentOfDailyNeeds;

        nutrientList.push(nutrient);
    }
    nutrientRepo.save(nutrientList);
}

// insert ingredient(s) to database given an ingredient(s) json
async function insertIngredients(resIngredients) {}
