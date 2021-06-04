import { NextFunction, Request, Response, Router } from "express";
import { getRecipeRepository, Recipe } from "../models/recipeModel";

export const router: Router = Router();

// add recipe
router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repository = await getRecipeRepository();
        const recipe = new Recipe();

        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.ingredientsId = req.body.ingredientsId;
        recipe.ownerId = req.body.ownerId;
        recipe.cookTime = req.body.cookTime;
        recipe.dateCreated = req.body.dateCreated;

        const result = await repository.save(recipe);
        res.send(result);
    } catch (err) {
        return next(err);
    }
});

// get all recipes for a given user
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
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

        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.ingredientsId = req.body.ingredientsId;
        recipe.ownerId = req.body.ownerId;
        recipe.cookTime = req.body.cookTime;
        recipe.dateCreated = req.body.dateCreated;

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
