import { NextFunction, Request, Response, Router } from "express";
import { getIngredientRepository, Ingredient } from "../models/ingredientModel";

export const router: Router = Router();

// get all instructions with a given recipeId, ordered by order field
router.get(
    "/:recipeId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const repository = await getIngredientRepository();
            const instructions = await repository.find({
                recipeId: req.params.recipeId,
            });
            res.send(instructions);
        } catch (err) {
            return next(err);
        }
    }
);

// insert ingredient(s) to database given an ingredient(s) json
export async function insertIngredients(ingredients, recipeId) {
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
