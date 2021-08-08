import { NextFunction, Request, Response, Router } from "express";
import { getRecipeRepository, Recipe } from "../models/recipeModel";
import { getNutrientRepository, Nutrient } from "../models/nutrientModel";
import { getIngredientRepository, Ingredient } from "../models/ingredientModel";
import {
    getInstructionRepository,
    Instruction,
} from "../models/instructionModel";

export const router: Router = Router();

// call to spoonacular api to fill database
// TODO: put api key in dotenv
router.post(
    "/spoonacular",
    async (req: Request, res: Response, next: NextFunction) => {
        const axios = require("axios").default;
        const apiPath =
            "https://api.spoonacular.com/recipes/complexSearch?apiKey=98d7ccdaa03c4462afb26c5ce21a4ee8&addRecipeNutrition=true&instructionsRequired=true";
        axios
            .get(apiPath)
            .then(async (response) => {
                const recipesRes = response.data.results;
                const recipeRepo = await getRecipeRepository();
                const nutrientRepo = await getNutrientRepository();
                const ingredientRepo = await getIngredientRepository();
                const instructionRepo = await getInstructionRepository();

                let recipeList: Recipe[] = [];
                let nutrientList: Nutrient[] = [];
                let ingredientList: Ingredient[] = [];
                let instructionList: Instruction[] = [];

                // main info
                for (let i = 0; i < recipesRes.length; i++) {
                    let recipe = new Recipe();
                    recipe.title = recipesRes[i].title;
                    recipe.summary = recipesRes[i].summary;
                    //recipe.ownerId = r[i].ownerId;
                    recipe.cookTime = recipesRes[i].readyInMinutes;
                    //recipe.rating = r[i].rating;
                    recipe.imageUrl = recipesRes[i].image;
                    const insertedRecipe = await recipeRepo.save(recipe);
                    recipeList.push(insertedRecipe);

                    // store each nutrient
                    const nutrientsRes = recipesRes[i].nutrition.nutrients;
                    for (let k = 0; k < nutrientsRes.length; k++) {
                        let nutrient = new Nutrient();
                        nutrient.recipeId = insertedRecipe.recipeId;
                        nutrient.name = nutrientsRes[k].name;
                        nutrient.amount = nutrientsRes[k].amount.toFixed(2);
                        nutrient.unit = nutrientsRes[k].unit;
                        nutrient.percentOfDailyNeeds =
                            nutrientsRes[k].percentOfDailyNeeds;

                        nutrientList.push(await nutrientRepo.save(nutrient));
                    }

                    // store each ingredient
                    const ingredientsRes = recipesRes[i].nutrition.ingredients;
                    for (let j = 0; j < ingredientsRes.length; j++) {
                        let ingredient = new Ingredient();
                        ingredient.recipeId = insertedRecipe.recipeId;
                        ingredient.name = ingredientsRes[j].name;
                        ingredient.amount = ingredientsRes[j].amount;
                        ingredient.unit = ingredientsRes[j].unit;

                        ingredientList.push(
                            await ingredientRepo.save(ingredient)
                        );
                    }

                    // TODO
                    // figure out why using the @OneToMany on recipeModel primary key was throwing that error for entity Recipe#recipeId
                    // figure out how to make it so i don't have to keep refreshing summary varchar length

                    // store each instruction (in order)
                    const instructionsRes =
                        recipesRes[i].analyzedInstructions[0].steps;
                    for (let l = 0; l < instructionsRes.length; l++) {
                        let instruction = new Instruction();
                        instruction.recipeId = insertedRecipe.recipeId;
                        instruction.step = instructionsRes[l].step;
                        instruction.order = instructionsRes[l].number;

                        instructionList.push(
                            await instructionRepo.save(instruction)
                        );
                    }
                }
                res.send({
                    recipes: recipeList,
                    nutrients: nutrientList,
                    ingredients: ingredientList,
                    instructions: instructionList,
                });
            })
            .catch((error) => {
                return next(error);
            });
    }
);

// add recipe
router.post("", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // insert recipe
        const recipeRepository = await getRecipeRepository();
        const recipe = new Recipe();
        recipe.title = req.body.title;
        recipe.summary = req.body.summary;
        // recipe.ownerId = req.body.ownerId;
        recipe.cookTime = req.body.cookTime;
        // recipe.rating = req.body.rating;
        recipe.imageUrl = req.body.imageUrl; // change to imageUrl
        const newRecipe = await recipeRepository.save(recipe);

        // insert ingredients
        const ingredients = insertIngredients(
            req.body.ingredients,
            newRecipe.recipeId
        );

        // insert instructions
        const instructions = insertInstructions(
            req.body.instructions,
            newRecipe.recipeId
        );

        res.send({
            recipe: newRecipe,
            ingredients: ingredients,
            instructions: instructions,
        });
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
router.get(
    "/:recipeId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const repository = await getRecipeRepository();
            const recipe = await repository.find({
                recipeId: req.params.recipeId,
            });
            res.send(recipe);
        } catch (err) {
            return next(err);
        }
    }
);

// edit recipe
router.put(
    "/:recipeId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const repository = await getRecipeRepository();
            let recipe: Recipe = await repository.findOne({
                recipeId: req.params.recipeId,
            });

            recipe.title = req.body.title;
            recipe.summary = req.body.summary;
            // recipe.ownerId = req.body.ownerId;
            recipe.cookTime = req.body.cookTime;
            // recipe.rating = req.body.rating;
            recipe.imageUrl = req.body.imageUrl;
            // recipe.ingredientsId = req.body.ingredients;

            // TODO: nutrition info

            const result = await repository.save(recipe);
            res.send(result);
        } catch (err) {
            return next(err);
        }
    }
);

// delete recipe
router.delete(
    "/:recipeId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const recipeId = req.params.recipeId;

            // delete related ingredients
            const ingredientRepo = await getIngredientRepository();
            const ingredients = await ingredientRepo.find({
                recipeId,
            });
            await ingredientRepo.remove(ingredients);

            // delete related nutrients
            const nutrientRepo = await getNutrientRepository();
            const nutrients = await nutrientRepo.find({
                recipeId,
            });
            await nutrientRepo.remove(nutrients);

            // delete related instructions
            const instructionRepo = await getInstructionRepository();
            const instructions = await instructionRepo.find({
                recipeId,
            });
            await instructionRepo.remove(instructions);

            // delete recipe
            const recipeRepo = await getRecipeRepository();
            const result = await recipeRepo.delete(recipeId);
            res.send(result);
        } catch (err) {
            return next(err);
        }
    }
);

// insert nutrient(s) to database given a nutrients json
async function insertNutrients(nutrients, recipeId) {
    const nutrientsRepo = await getNutrientRepository();
    let nutrientList: Nutrient[] = [];
    for (let i = 0; i < nutrients.length; i++) {
        let nutrient = new Nutrient();
        nutrient.recipeId = recipeId;
        nutrient.name = nutrients[i].name;
        nutrient.amount = nutrients[i].amount;
        nutrient.unit = nutrients[i].unit;
        nutrient.percentOfDailyNeeds = nutrients[i].percentOfDailyNeeds;

        nutrientList.push(nutrient);
    }
    nutrientsRepo.save(nutrientList);
}

// insert ingredient(s) to database given an ingredient(s) json
async function insertIngredients(ingredients, recipeId) {
    const ingredientsRepo = await getIngredientRepository();
    const ingredientList: Ingredient[] = [];

    for (let i = 0; i < ingredients.length; i++) {
        let ingredient = new Ingredient();
        ingredient.recipeId = recipeId;
        ingredient.name = ingredients[i].name;
        ingredient.amount = ingredients[i].amount;
        ingredient.unit = ingredients[i].unit;
        ingredientList.push(ingredient);
    }
    const result = ingredientsRepo.save(ingredientList);
    return result;
}

// insert instruction(s) to database given an ingredient(s) json
async function insertInstructions(instructions, recipeId) {
    const instructionRepo = await getInstructionRepository();
    const instructionList: Instruction[] = [];

    for (let i = 0; i < instructions.length; i++) {
        let instruction = new Instruction();
        instruction.recipeId = recipeId;
        instruction.step = instructions[i].step;
        instruction.order = instructions[i].order;
        instructionList.push(instruction);
    }
    instructionRepo.save(instructionList);
}
