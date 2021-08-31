import { NextFunction, Request, Response, Router } from "express";
import { getFavoriteRepository, Favorite } from "../models/favoriteModel";
import { getRecipeRepository } from "../models/recipeModel";
export const router: Router = Router();

// get all recipes that are favorited for a user
router.get(
    "/:userId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const favoriteRepo = await getFavoriteRepository(); // TODO: join between favorites & recipe
            const favorites = await favoriteRepo.find({
                where: { userId: req.params.userId },
                relations: ["recipeId"],
            });
            const favoriteRecipes = favorites.map((x) => x.recipeId);
            res.send(favoriteRecipes);
        } catch (err) {
            return next(err);
        }
    }
);

// add favorite
router.post(
    "/:userId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const favoriteRepo = await getFavoriteRepository();
            const favorite = new Favorite();
            favorite.recipeId = req.query.recipe;
            favorite.userId = req.params.userId;
            const result = await favoriteRepo.save(favorite);
            res.send({ result });
        } catch (err) {
            return next(err);
        }
    }
);

// remove favorite
router.delete(
    "/:userId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const favoriteRepo = await getFavoriteRepository();
            const userId = req.params.userId;
            const recipeId = req.query.recipe;
            const favorite = await favoriteRepo.find({
                where: { userId: userId, recipeId: recipeId },
            });
            const result = await favoriteRepo.remove(favorite);
            res.send(result);
        } catch (err) {
            return next(err);
        }
    }
);
