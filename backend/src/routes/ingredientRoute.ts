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
