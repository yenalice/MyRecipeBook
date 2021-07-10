import { NextFunction, Request, Response, Router } from "express";
import {
    getInstructionRepository,
    Instruction,
} from "../models/instructionModel";

export const router: Router = Router();

// get all instructions with a given recipeId, ordered by order field
router.get(
    "/:recipeId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const repository = await getInstructionRepository();
            const instructions = await repository.find({
                order: { order: "ASC" },
                where: { recipeId: req.params.recipeId },
            });
            res.send(instructions);
        } catch (err) {
            return next(err);
        }
    }
);
