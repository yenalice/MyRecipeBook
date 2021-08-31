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

// insert instruction(s) to database given an ingredient(s) json
export async function insertInstructions(instructions, recipeId) {
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
